# Deploy

This repo is designed to deploy as a static site. The default target is
[Cloudflare Pages](https://developers.cloudflare.com/pages/), which:

- auto-deploys every push to `main` to the production URL
- auto-deploys every PR to a unique `*.pages.dev` preview URL
- is free for our usage profile (static, low traffic)

## One-time Cloudflare Pages wiring

Must be done by someone with Cloudflare account admin access.

### 1. Create the Pages project

Option A — dashboard (easiest):

1. https://dash.cloudflare.com → Workers & Pages → Create → Pages → Connect to Git
2. Select the `akeen13/tacticalsolutions-site` GitHub repo.
3. Framework preset: **Astro**. Build command: `npm run build`. Output dir: `dist`.
4. Deploy. Cloudflare will start building and surface the preview URL on the first run.

Option B — API token + CLI (if connecting via dashboard is blocked):

1. Create an API token scoped to `Account : Cloudflare Pages : Edit` + `Account : Workers Scripts : Edit` + `User : User Details : Read`.
2. In the GitHub repo → Settings → Secrets and variables → Actions, add:
   - Secret `CLOUDFLARE_API_TOKEN` (the token above)
   - Secret `CLOUDFLARE_ACCOUNT_ID` (Cloudflare dashboard right sidebar)
   - Variable `CLOUDFLARE_PAGES_PROJECT` = the Pages project name (e.g. `tacticalsolutions-site`)
   - Variable `ASTRO_SITE` (optional) = canonical site URL, e.g. `https://tacticalsolutions.com`
3. Push to `main` or open a PR; `.github/workflows/deploy.yml` will build and deploy.

The workflow is gated on `vars.CLOUDFLARE_PAGES_PROJECT` — until that repo variable is set, the deploy workflow is a no-op, so there is no broken-workflow noise.

### 2. Attach custom domain

Once the Pages project is live:

1. Cloudflare dashboard → Pages project → Custom domains → Set up → `tacticalsolutions.com`.
2. Cloudflare shows the required CNAME target.
3. In easyDNS (the current DNS host), add:
   - `CNAME tacticalsolutions.com → <pages-target>.pages.dev` (or the bare-apex variant Cloudflare recommends)
   - Remove any existing `A 64.68.200.44` record if it conflicts
4. Keep the existing `MX mx-caprica.easydns.com` record if we still want easyDNS mail — see [Mailbox](#mailbox) below for the alternative.

Blocked until easyDNS access is confirmed — see [TACA-10](/TACA/issues/TACA-10).

## Environment variables

| Name | Scope | Purpose |
|---|---|---|
| `SHOW_DRAFTS` | build | `"true"` to include drafts in the build. CI uses this for PR/preview builds. |
| `CF_PAGES_BRANCH` | build | Auto-set by CF Pages; drafts visible on any non-`main` branch. |
| `ASTRO_SITE` | build | Canonical site URL. Overrides the default in `astro.config.mjs`. |
| `CLOUDFLARE_API_TOKEN` | repo secret | Required by `deploy.yml`. |
| `CLOUDFLARE_ACCOUNT_ID` | repo secret | Required by `deploy.yml`. |
| `CLOUDFLARE_PAGES_PROJECT` | repo variable | Gates the deploy workflow + names the project. |

## Mailbox

Separately tracked on [TACA-10](/TACA/issues/TACA-10). Approach:

- `pov@tacticalsolutions.com` forwarded via [ImprovMX](https://improvmx.com) (free tier, forwards to a real inbox).
- SPF / DKIM / DMARC records from Buttondown land in the same DNS zone.
- All DNS edits happen at easyDNS (current DNS host) — blocked on access.

## Rollback

Cloudflare Pages keeps every deploy indefinitely. To roll back:

1. Dashboard → Pages project → Deployments → find the last good deploy → **Rollback**.
2. Or revert the bad commit on `main` — a new clean deploy replaces prod in ~30s.

Never hard-reset `main` as a rollback mechanism. Revert commits preserve the trail.
