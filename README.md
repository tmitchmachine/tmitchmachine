# T Mitch Machine

Source for [tmitchmachine.com](https://tmitchmachine.com), a personal site built with Next.js (App Router), React and TypeScript.

## Run locally

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

To check a production build:

```bash
npm run build
npm start
```

## Project layout

| Path | What's there |
| --- | --- |
| `app/(home)/` | The home page |
| `app/(site)/` | Every other page: about, contact, highlights, projects, media, deals, events |
| `components/` | Shared page shell: `SiteDocument`, `SiteHeader`, `SiteScripts` |
| `lib/projects.ts` | Data for the `/projects` page: the `SITES` list and the `REPOS` list |
| `public/static/` | The theme's compiled CSS and JS, plus images |
| `scripts/` | The script that refreshes the repo list on `/projects` |

To add or edit a page, change the matching `page.tsx` under `app/`. Navigation links live in `components/SiteHeader.tsx`.

## Projects page

`lib/projects.ts` has two lists:

- **`SITES`**: edited by hand. Add sites built on other platforms (Shopify, Google Sites and so on) here.
- **`REPOS`**: generated. Don't edit it by hand, because the next update overwrites it.

### How `REPOS` updates

[`.github/workflows/update-projects.yml`](.github/workflows/update-projects.yml) runs [`scripts/update_projects.py`](scripts/update_projects.py) daily at 14:00 UTC. You can also start it from the repo's **Actions** tab with **Run workflow**. Each run:

1. Lists every repo owned by `tmitchmachine` and counts the commits on its default branch.
2. Picks a link for each repo, using the first of these it finds:
   1. a manual link in `scripts/projects_config.json`;
   2. a custom domain on the repo's Vercel project;
   3. the repo's GitHub "homepage" field;
   4. the repo's `*.vercel.app` address.
3. Rewrites `REPOS`, sorted by commit count, and commits `lib/projects.ts` if anything changed. A change to this repo's own commit count doesn't count, because otherwise every update commit would trigger another one the next day.

New repos appear automatically, **including private ones, by name**. To keep a repo off the page, add it to `exclude` in the config.

### Config: `scripts/projects_config.json`

| Key | Purpose |
| --- | --- |
| `exclude` | Repo names to leave off the page |
| `exclude_containing` | Leave off any repo whose name contains one of these strings (e.g. `secretinfo`) |
| `links` | Manual links. These win over anything detected automatically. |
| `no_link` | Repos that should never get a link, e.g. ones whose site is gone |
| `apps` | App Store and Google Play links, shown as `iOS` / `Android` tags |

### Secrets

Add these under **Settings → Secrets and variables → Actions**:

| Secret | Required | Notes |
| --- | --- | --- |
| `GH_STATS_TOKEN` | Yes | A fine-grained GitHub token with **Repository access: All repositories** and **Contents: Read-only**. Without access to private repos, the script stops and changes nothing. |
| `VERCEL_TOKEN` | No | Lets the script find live sites on Vercel. Without it, links come only from the config file and GitHub homepage fields. |

### Run it locally

Put both tokens in `.env`, which is gitignored, then run:

```bash
set -a && . ./.env && set +a
python3 scripts/update_projects.py
```

The script uses only the Python standard library. On macOS, if you get `CERTIFICATE_VERIFY_FAILED`, run it with `/usr/bin/python3`, or run **Install Certificates.command** from your python.org Python folder.

## Deployment

The site is moving to a Next.js host such as Vercel. Once it's deployed there, point the `tmitchmachine.com` and `www.tmitchmachine.com` DNS records at the new host. Both still point at Google App Engine.

## Legacy Flask app

`main.py`, `templates/`, `app.yaml`, `requirements.txt` and `database.csv` belong to the earlier Flask version, which ran on Google App Engine. Billing for that Google Cloud project was turned off in November 2026, and the files are kept only for reference. The Next.js app doesn't use them.
