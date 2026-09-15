# What Actually Needs Implementing

Validation of the Growth Playbook + Developer Handoff, 15 Sep 2026.
Every item below was verified against the live site (**www**.veritashearing.co.nz — that's
the production host; non-www redirects to it). The audits are ~70% accurate — this is the
corrected, prioritized list.

## Already done — ignore these audit items

| Audit claim | Reality |
|---|---|
| No sitemap | Exists (`src/app/sitemap.ts`) |
| No robots.txt | Exists (`src/app/robots.ts`) |
| Paul has no bio | Live on `/team` with MNZAS / ACC / VA credentials + photo |
| No NAP footer / map | Footer has full NAP; Google Map on `/contact` |
| Speed Insights | Already enabled in root layout |

## Real gaps — fix in this order

### 1. Every blog article ships the same title (highest impact)
All article pages use the site-wide default title, so Google sees near-identical pages.
**Fix:** add `generateMetadata` to `src/app/(site)/resources/articles/[slug]/page.tsx`
using the article's title + excerpt.

### 2. No canonical tags anywhere
Zero `<link rel="canonical">` (and zero `og:url`) on every page checked. Since the site
actually serves on **www**.veritashearing.co.nz, canonicals must target the www URL.
**Fix:** set `metadataBase` to `https://www.veritashearing.co.nz` in `src/app/layout.tsx`,
add `alternates.canonical` per route.

### 3. Zero structured data (JSON-LD)
Nothing marks the site up as a real local medical business — used by Google and AI answers.
**Fix:** add MedicalBusiness (site-wide), Physician (`/team`), FAQPage (homepage),
Article (article pages) as `ld+json` components. NAP + hours already known: 37 Lake Road,
Frankton, 029 0451 0839, Mon–Fri 8–5.

### 4. Three pages still use the default title
`/`, `/hearing-aids`, `/booking` have no metadata of their own.
**Fix:** add metadata exports (homepage title per the Playbook: "Independent Audiologist
in Frankton, Hamilton").

### 5. Sitemap is a static 8-URL list
Missing `/privacy-policy` and all 5 published articles. Worse: every URL in the sitemap is
**non-www**, and robots.txt points at the non-www sitemap too — while the site serves on
www. Mixed host signals.
**Fix:** extend `src/app/sitemap.ts` to fetch published articles via the existing
`getArticlesDirect` helper, and use the www host in sitemap + robots URLs.

### 6. Non-www → www redirect is only temporary (307)
The redirect does exist (Vercel domain config — no code involved), but it's a 307, and
search engines don't consolidate signals across temporary redirects. (http→https is a
proper 308.)
**Fix:** in the Vercel dashboard set www as the domain that gets redirected to (primary),
which serves a permanent 308 instead.

### 7. Broken `tel:` link (placeholder number)
Footer + Contact page *display* the correct mobile (029 0451 0839), but the underlying
`tel:` href dials +64 800 555 51 — a leftover placeholder. Only visible when tapped on a
phone. The header's link is correct.
**Fix:** `tel:+6480055551` → `tel:+642904510839` in `src/components/Footer.tsx` and
`src/app/(site)/contact/page.tsx`.

Items 1–4 are the ones that plausibly explain "zero organic keywords". All are code-only,
no DB changes, no new content needed.

## Strategy calls — decide later, not defects

- **Location landing pages / splitting `/services`** — valuable for "hearing test hamilton"
  etc., but thin near-duplicate pages carry risk. Decides whether FAQ blocks and per-service
  targeting follow. Needs the Content Pack doc (not in `docs/`).
- **FAQ on service pages** — only makes sense once services have their own URLs; today it
  would duplicate the homepage FAQ.
- **Internal linking / Related Reading** — worth doing after new pages exist.
- **Homepage reviews** — needs real, consented Google reviews from Paul first.

## Not code tasks (Paul / owner)

- Google Search Console verification + sitemap submission, request indexing
- Directory listings: Healthpoint, Yellow, NZAS, ACC, Veterans' Affairs
- Weekly Google Business Profile posts, review collection, local press
