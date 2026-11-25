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
3. **The apex needs a Cloudflare zone with Cloudflare nameservers.** The DNS is *not* on easyDNS — it is on Microsoft 365 / Azure DNS (`ns1–ns4.bdm.microsoftonline.com`), which cannot hold an apex CNAME. Adding the apex therefore means adding the domain as a Cloudflare zone and changing nameservers at the registrar (**Ascio** — easyDNS is only the hosting provider), then re-creating every mail record in the new zone. Apex `A 217.146.69.53` on the old host is retired by that, not repointed.
4. Subdomains are cheaper and need no zone: a plain `CNAME <sub> → <project>.pages.dev` at Azure DNS is enough.
5. Mail stays on Microsoft 365 (`MX 0 tacticalsolutions-com.mail.protection.outlook.com`), not `mx-caprica.easydns.com`. See [Mailbox](#mailbox). Do **not** add Cloudflare Email Routing — its MX would displace the M365 one and take `business@` down with it.

Full order of operations, rollback and the record baseline: the `cutover` runbook on [TACA-11](/TACA/issues/TACA-11). Current zone snapshot: `docs/dns-baseline-2026-11-25.txt`.

Blocked on Ascio registrar access and Azure DNS/M365 admin on the tenant — see [TACA-11](/TACA/issues/TACA-11).

## Environment variables

| Name | Scope | Purpose |
|---|---|---|
| `SHOW_DRAFTS` | build | `"true"` to include drafts in the build. CI uses this for PR/preview builds. |
| `CF_PAGES_BRANCH` | build | Auto-set by CF Pages; drafts visible on any non-`main` branch. |
| `ASTRO_SITE` | build | Canonical site URL. Overrides the default in `astro.config.mjs`. |
| `CLOUDFLARE_API_TOKEN` | repo secret | Required by `deploy.yml`. |
| `CLOUDFLARE_ACCOUNT_ID` | repo secret | Required by `deploy.yml`. |
| `CLOUDFLARE_PAGES_PROJECT` | repo variable | Gates the deploy workflow + names the project. |
| `PUBLIC_PLAUSIBLE_DOMAIN` | build | Optional. Overrides the `data-domain` on the analytics tag. Defaults to `tacticalsolutions.com`. |
| `PUBLIC_PLAUSIBLE_SRC` | build | Optional. Script URL for a self-hosted Plausible. Defaults to the hosted `script.js`. |

## Analytics

`BaseLayout.astro` carries one Plausible tag, so every page counts from the
layout with no per-page work. Cookieless, so no cookie banner, and no tag
manager.

`data-domain` is pinned to `tacticalsolutions.com` rather than the deploy host,
so the GitHub Pages preview and the eventual custom domain stay one continuous
series instead of forking into two site entries. The domain has to exist in the
Plausible account for events to be stored; before that, the tag loads and the
events are accepted but nothing is retained. The tag is `is:inline` because
Astro's default script processing drops `data-domain` off the emitted tag.

## Mailbox

Tracked on [TACA-11](/TACA/issues/TACA-11).

`business@` and `anthony@tacticalsolutions.com` are already live and already linked from the shipped pages — the `/prosentinel` CTAs and intake form compose a `mailto:` to `business@`. Nothing below may break them.

- `pov@tacticalsolutions.com` is a **shared mailbox in the existing Microsoft 365 tenant** (`tacticalfoodpac`), not an ImprovMX forward: the MX already belongs to M365, so a second MX provider fights it.
- Sending from the tenant needs no SPF change — the existing `-all` record already authorises `spf.protection.outlook.com`. A third-party sender (Buttondown, Mailchimp) does need its own `include:` before `-all`.
- DKIM already exists (`selector1`/`selector2` → the tenant). DNS edits happen at **Azure DNS**, nameservers at **Ascio** — blocked on access.

## Rollback

Cloudflare Pages keeps every deploy indefinitely. To roll back:

1. Dashboard → Pages project → Deployments → find the last good deploy → **Rollback**.
2. Or revert the bad commit on `main` — a new clean deploy replaces prod in ~30s.

Never hard-reset `main` as a rollback mechanism. Revert commits preserve the trail.
