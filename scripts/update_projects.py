"""Rebuild the "All Repositories" list in templates/projects from the GitHub API.

Link for each repo, first match wins:
  1. "links" in scripts/projects_config.json (manual override)
  2. A custom domain on the repo's Vercel project (only if VERCEL_TOKEN is set)
  3. The repo's GitHub "homepage" field
  4. The repo's *.vercel.app production URL (only if VERCEL_TOKEN is set)
Repos listed in "no_link" never get a link.

Env:
  GH_STATS_TOKEN  GitHub token that can read all your repos, private ones included (required)
  VERCEL_TOKEN    Vercel token, used to find live sites for repos (optional)

Usage: python scripts/update_projects.py
"""

import html
import json
import os
import re
import sys
import urllib.error
import urllib.parse
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TEMPLATE = os.path.join(ROOT, "templates", "projects")
CONFIG = os.path.join(ROOT, "scripts", "projects_config.json")
START = "<!-- REPOS:START -->"
END = "<!-- REPOS:END -->"
INDENT = "              "


def request(url, token, auth_scheme="Bearer"):
    req = urllib.request.Request(url, headers={
        "Authorization": f"{auth_scheme} {token}",
        "Accept": "application/vnd.github+json" if "github.com" in url else "application/json",
        "User-Agent": "projects-page-updater",
    })
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.loads(resp.read() or "null"), resp.headers


def github_repos(token, owner):
    repos, url = [], "https://api.github.com/user/repos?affiliation=owner&per_page=100"
    while url:
        data, headers = request(url, token)
        repos += [r for r in data if r["owner"]["login"].lower() == owner.lower()]
        match = re.search(r'<([^>]+)>;\s*rel="next"', headers.get("Link", ""))
        url = match.group(1) if match else None
    return repos


def commit_count(token, full_name):
    """Commits on the default branch: request one per page and read the last page number."""
    try:
        data, headers = request(f"https://api.github.com/repos/{full_name}/commits?per_page=1", token)
    except urllib.error.HTTPError as e:
        if e.code == 409:  # empty repository
            return 0
        raise
    match = re.search(r'[?&]page=(\d+)>;\s*rel="last"', headers.get("Link", ""))
    return int(match.group(1)) if match else len(data)


def vercel_links(token):
    """Map GitHub repo name -> (custom domain URL or None, *.vercel.app URL or None)."""
    def get(path, team_id=None, **params):
        if team_id:
            params["teamId"] = team_id
        query = urllib.parse.urlencode(params)
        return request(f"https://api.vercel.com{path}?{query}", token)[0]

    scopes = [None] + [t["id"] for t in get("/v2/teams").get("teams", [])]
    links = {}
    for team_id in scopes:
        params = {"limit": 100}
        while True:
            page = get("/v10/projects", team_id, **params)
            for project in page.get("projects", []):
                link = project.get("link") or {}
                if link.get("type") != "github" or not link.get("repo"):
                    continue
                domains = get(f"/v9/projects/{project['id']}/domains", team_id).get("domains", [])
                custom = sorted(
                    (d["name"] for d in domains
                     if d.get("verified") and not d.get("redirect") and not d["name"].endswith(".vercel.app")),
                    key=lambda name: (name.count("."), len(name)),
                )
                aliases = (project.get("targets", {}).get("production") or {}).get("alias") or []
                vercel_app = sorted((a for a in aliases if a.endswith(".vercel.app")), key=len)
                links[link["repo"]] = (
                    f"https://{custom[0]}" if custom else None,
                    f"https://{vercel_app[0]}" if vercel_app else None,
                )
            nxt = (page.get("pagination") or {}).get("next")
            if not nxt:
                break
            params["until"] = nxt
    return links


def normalize(url):
    url = (url or "").strip().rstrip("/")
    if url and not re.match(r"https?://", url):
        url = "https://" + url
    return url or None


def render(repos, config, vercel):
    lines = []
    for repo in repos:
        name = repo["name"]
        custom, vercel_app = vercel.get(name, (None, None))
        url = normalize(config.get("links", {}).get(name) or custom or repo.get("homepage") or vercel_app)
        if name in config.get("no_link", []):
            url = None
        label = html.escape(name)
        if url:
            label = f'<a href="{html.escape(url)}" target="_blank" rel="noopener">{label}</a>'
        n = repo["commits"]
        meta = f'<small>&middot; {n} commit{"" if n == 1 else "s"} &middot; {"private" if repo["private"] else "public"}</small>'
        apps = config.get("apps", {}).get(name, {})
        tags = "".join(
            f'<a class="project-tag" href="{html.escape(apps[key])}" target="_blank" rel="noopener">{text}</a>'
            for key, text in (("ios", "iOS"), ("android", "Android")) if apps.get(key)
        )
        lines.append(f"{INDENT}<li>{label} {meta}{' ' + tags if tags else ''}</li>")
    return "\n".join(lines)


def main():
    token = os.environ.get("GH_STATS_TOKEN")
    if not token:
        sys.exit("GH_STATS_TOKEN is not set")
    with open(CONFIG) as f:
        config = json.load(f)

    all_repos = github_repos(token, config["owner"])
    if not any(r["private"] for r in all_repos):
        sys.exit("GH_STATS_TOKEN can't see any private repos. Set its Repository access to "
                 "'All repositories' with read-only Contents. Page left unchanged.")

    excluded = set(config.get("exclude", []))
    containing = config.get("exclude_containing", [])
    repos = [
        r for r in all_repos
        if r["name"] not in excluded and not any(s in r["name"] for s in containing)
    ]
    for repo in repos:
        repo["commits"] = commit_count(token, repo["full_name"])
    repos.sort(key=lambda r: (-r["commits"], r["name"].lower()))

    vercel = vercel_links(os.environ["VERCEL_TOKEN"]) if os.environ.get("VERCEL_TOKEN") else {}

    with open(TEMPLATE) as f:
        page = f.read()
    if START not in page or END not in page:
        sys.exit(f"{TEMPLATE} is missing the {START} / {END} markers")
    before, rest = page.split(START, 1)
    after = rest.split(END, 1)[1]
    updated = f"{before}{START}\n{render(repos, config, vercel)}\n{INDENT}{END}{after}"

    if updated != page:
        with open(TEMPLATE, "w") as f:
            f.write(updated)
        print(f"Updated {len(repos)} repos in templates/projects")
    else:
        print("No changes")


if __name__ == "__main__":
    main()
