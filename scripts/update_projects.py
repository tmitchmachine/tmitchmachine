"""Rebuild the REPOS list in lib/projects.ts (the /projects page) from the GitHub API.

Only the `export const REPOS: Repo[] = [ ... ];` block is rewritten; SITES and the
rest of the file stay hand-edited.

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

import json
import os
import re
import sys
import urllib.error
import urllib.parse
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TARGET = os.path.join(ROOT, "lib", "projects.ts")
CONFIG = os.path.join(ROOT, "scripts", "projects_config.json")
REPOS_BLOCK = re.compile(r"(export const REPOS: Repo\[\] = \[\n)(.*?)(\n\];)", re.S)


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
    """One TypeScript object literal per repo, matching the Repo type in lib/projects.ts."""
    s = json.dumps  # JSON strings are valid TypeScript string literals
    lines = []
    for repo in repos:
        name = repo["name"]
        custom, vercel_app = vercel.get(name, (None, None))
        url = normalize(config.get("links", {}).get(name) or custom or repo.get("homepage") or vercel_app)
        if name in config.get("no_link", []):
            url = None
        fields = [f"name: {s(name)}", f"commits: {repo['commits']}", f"private: {'true' if repo['private'] else 'false'}"]
        if url:
            fields.append(f"website: {s(url)}")
        apps = config.get("apps", {}).get(name, {})
        app_links = [
            f"{{ label: {s(label)}, url: {s(apps[key])} }}"
            for key, label in (("ios", "iOS"), ("android", "Android")) if apps.get(key)
        ]
        if app_links:
            fields.append(f"apps: [{', '.join(app_links)}]")
        lines.append(f"  {{ {', '.join(fields)} }},")
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
                 "'All repositories' with read-only Contents. lib/projects.ts left unchanged.")

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

    with open(TARGET) as f:
        source = f.read()
    if not REPOS_BLOCK.search(source):
        sys.exit(f"Couldn't find `export const REPOS: Repo[] = [ ... ];` in {TARGET}")
    body = render(repos, config, vercel)
    updated = REPOS_BLOCK.sub(lambda m: m.group(1) + body + m.group(3), source, count=1)

    # Each update is a commit to this repo, which bumps this repo's own count and would
    # trigger another commit on the next run, forever. Skip runs where that's the only change.
    self_repo = os.environ.get("GITHUB_REPOSITORY", "").split("/")[-1]
    if self_repo:
        def without_self(text):
            return [l for l in text.splitlines() if f'name: {json.dumps(self_repo)},' not in l]
        if without_self(updated) == without_self(source):
            updated = source

    if updated != source:
        with open(TARGET, "w") as f:
            f.write(updated)
        print(f"Updated {len(repos)} repos in lib/projects.ts")
    else:
        print("No changes")


if __name__ == "__main__":
    main()
