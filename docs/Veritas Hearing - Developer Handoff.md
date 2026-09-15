# Technical SEO Build Ticket — veritashearing.co.nz (Vercel / Next.js)

**Prepared:** 15 Sep 2026
**Stack detected:** Next.js on Vercel
**Companion docs:** Veritas Hearing Growth Playbook & Veritas Hearing Content Pack

Everything below is scoped to close the gap identified in the Veritas Hearing Growth Playbook: the site is fully live but has zero indexed organic keywords. That almost always comes down to metadata, indexing setup and missing structured data — not content. This is written for a Next.js app deployed on Vercel; swap the App Router / Pages Router snippet for whichever this repo actually uses.

---

## Before you start: confirmed stack & current state

Pulled from the live homepage source — verify against the actual repo before estimating.

| Item | Status |
|---|---|
| Framework | Next.js (image requests via `_next/image`) |
| Host | Vercel |
| Robots meta | `index, follow` ✓ |
| Canonical tag | Not found on homepage ✗ |
| Page title | Same on every page — "Veritas Hearing \| Hear better. Live fully" ✗ |

**Root cause hypothesis:** robots are allowed to index, but every page appears to ship the same static title/description and no canonical tag. That combination is consistent with zero ranked keywords even on a site that's otherwise been live for months — Google has nothing unique to differentiate one page from another. **P1 below is the highest-leverage fix in this whole ticket.**

---

## P0 — Indexing & crawl foundation

Do this first — nothing else in this ticket matters if Google isn't crawling and indexing the site properly.

### Verify Google Search Console — `P0`

Add the domain property for `veritashearing.co.nz` (covers both www and non-www, http and https in one property). Easiest verification for a Vercel project is a DNS TXT record added wherever the domain's DNS is managed, or an HTML meta tag added to the root layout if DNS access isn't available:

`app/layout.tsx` (App Router) — add to `<head>` via metadata:

```tsx
export const metadata = {
  verification: {
    google: "REPLACE_WITH_GSC_VERIFICATION_CODE",
  },
};
```

Once verified: submit the sitemap (below) from Search Console → Sitemaps, and use "Request Indexing" on the homepage, /about, and each new page as it ships.

### Generate an XML sitemap — `P0`

Next.js App Router supports a file-based sitemap with no extra dependency:

`app/sitemap.ts`:

```ts
import type { MetadataRoute } from "next";

const routes = [
  "", "/about", "/services", "/hearing-aids", "/team", "/resources", "/contact",
  "/hearing-test-hamilton", "/hearing-aids-hamilton", "/earwax-removal-hamilton",
  "/resources/hearing-aid-cost-nz", "/resources/signs-of-hearing-loss",
  "/resources/best-hearing-aids-nz",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: `https://veritashearing.co.nz${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
```

Pages Router equivalent: use the `next-sitemap` package with a postbuild script, or a custom `pages/sitemap.xml.tsx` that returns XML with the correct content-type header.

### Add robots.txt — `P0`

`app/robots.ts`:

```ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://veritashearing.co.nz/sitemap.xml",
  };
}
```

### Check for a stray preview/staging noindex — `P0`

Vercel Preview and non-production deployments sometimes carry an `X-Robots-Tag: noindex` header or a middleware check for `VERCEL_ENV`. Grep the repo for `noindex` and `X-Robots-Tag` and confirm the Production deployment specifically is not affected — this is a common reason a site "looks fine" but never gets indexed.

---

## P1 — Per-page metadata & canonical tags

Every page currently ships the same title/description. Replace the shared static metadata with a per-route `generateMetadata`, and add a canonical URL to every page — both are missing today.

### Set a metadataBase + canonical pattern once, site-wide — `P1`

`app/layout.tsx`:

```tsx
export const metadata = {
  metadataBase: new URL("https://veritashearing.co.nz"),
  // canonical is then set per-page via alternates.canonical (relative path)
};
```

### Per-page metadata example — `P1`

`app/hearing-test-hamilton/page.tsx`:

```tsx
export const metadata = {
  title: "Hearing Test Hamilton | Veritas Hearing, Frankton",
  description:
    "Book a comprehensive hearing test in Hamilton with audiologist Paul Hsu. " +
    "No sales pressure, a full take-home report, and same-week appointments in Frankton.",
  alternates: { canonical: "/hearing-test-hamilton" },
};
```

Pages Router equivalent: put a `<Head>` block per page with `<title>`, `<meta name="description">`, and `<link rel="canonical">`.

**Title/description set (starter — full set for every page is in the Content Pack / Growth Playbook, copy from there rather than re-writing):**

| Page | Title | Description |
|---|---|---|
| `/` | Veritas Hearing \| Independent Audiologist in Frankton, Hamilton | Honest, evidence-based hearing care with no sales pressure. Book a comprehensive hearing assessment with Paul Hsu, Frankton, Hamilton. |
| `/hearing-test-hamilton` | Hearing Test Hamilton \| Veritas Hearing, Frankton | Book a comprehensive hearing test in Hamilton with audiologist Paul Hsu. No sales pressure, a full take-home report, and same-week appointments in Frankton. |
| `/hearing-aids-hamilton` | Hearing Aids Hamilton \| Independent, Unbiased Advice \| Veritas Hearing | Independent hearing aid fittings in Hamilton — we recommend what suits you, not what pays the most commission. Talk to Paul Hsu directly. |

### Enforce one canonical domain — `P1`

Search results currently show both `veritashearing.co.nz` and `www.veritashearing.co.nz`. Pick one (non-www is the simpler default) and 301-redirect the other, plus force https, in the Vercel project's Domains settings, or explicitly in code:

`next.config.js`:

```js
module.exports = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.veritashearing.co.nz" }],
        destination: "https://veritashearing.co.nz/:path*",
        permanent: true,
      },
    ];
  },
};
```

---

## P2 — New pages from the keyword plan

These routes don't exist yet and are the fastest wins in the whole plan — most carry Ahrefs Keyword Difficulty of 0–4. Copy for every one of these is already written in the Content Pack; this is purely the build task.

| Route | Type | Content source | Nav / linking |
|---|---|---|---|
| `/hearing-test-hamilton` | Local service page | Content Pack, Article 1 | Link from main nav "Services" dropdown + homepage |
| `/hearing-aids-hamilton` | Local service page | Growth Playbook copy blocks (meta only — needs a full page written) | Link from "Hearing Aids" nav item |
| `/earwax-removal-hamilton` | Local service page | Content Pack, Article 5 | Link from "Services" + relevant blog posts |
| `/resources/hearing-aid-cost-nz` | Content/resource | Content Pack, Article 2 | Link from Hearing Aids page + Resources index |
| `/resources/signs-of-hearing-loss` | Content/resource | Content Pack, Article 3 | Link from homepage + Resources index |
| `/resources/best-hearing-aids-nz` | Content/resource | Content Pack, Article 4 | Link from Hearing Aids page + Resources index |

### Suggested structure — `P1`

If these are hand-built pages rather than CMS-driven, a shared `<ServicePageLayout>` / `<ArticleLayout>` component keeps them consistent — hero + intro answer paragraph (for AI Overview extraction), body content, CTA block, and an `<Faq>` component (see P3) at the bottom of every one.

`app/hearing-test-hamilton/page.tsx` — skeleton:

```tsx
import { Faq } from "@/components/Faq";
import { LocalBusinessJsonLd } from "@/components/schema";

export const metadata = { /* see P1 */ };

export default function Page() {
  return (
    <main>
      <h1>Hearing Test Hamilton: What to Expect at Your First Assessment</h1>
      {/* body content from Content Pack, Article 1 */}
      <Faq items={hearingTestFaqs} />
    </main>
  );
}
```

---

## P3 — Structured data (JSON-LD)

None of this appears to be on the site yet. This is what both classic Google rich results and AI Overview / AI answer engines use to confirm the practice is a real, specific, local, credentialed provider.

### MedicalBusiness / LocalBusiness — site-wide, one instance — `P1`

`components/schema/LocalBusinessJsonLd.tsx` — render once in `app/layout.tsx`:

```tsx
export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Veritas Hearing",
    "image": "https://veritashearing.co.nz/frontend/icon.png",
    "url": "https://veritashearing.co.nz",
    "telephone": "+64290451839",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "37 Lake Road",
      "addressLocality": "Frankton, Hamilton",
      "postalCode": "3204",
      "addressCountry": "NZ"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "08:00",
      "closes": "17:00"
    },
    "medicalSpecialty": "Audiology"
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

### Physician / Person schema for Paul — About/Team page — `P1`

```json
{
  "@context": "https://schema.org",
  "@type": "Physician",
  "name": "Paul Hsu",
  "jobTitle": "Audiologist",
  "worksFor": { "@type": "MedicalBusiness", "name": "Veritas Hearing" },
  "memberOf": { "@type": "Organization", "name": "New Zealand Audiological Society" },
  "medicalSpecialty": "Audiology"
}
```

This depends on Paul's real bio going live first (see Growth Playbook, Immediate Interventions) — don't ship this schema before the on-page bio exists, or it's marking up content that isn't there.

### Reusable FAQPage component — `P1`

Every article in the Content Pack ends with an FAQ block written for this. One component renders both the visible Q&A and its schema from the same data:

`components/Faq.tsx`:

```tsx
type FaqItem = { q: string; a: string };

export function Faq({ items }: { items: FaqItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map((i) => ({
      "@type": "Question",
      "name": i.q,
      "acceptedAnswer": { "@type": "Answer", "text": i.a },
    })),
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="faq">
        {items.map((i) => (
          <div key={i.q}>
            <h3>{i.q}</h3>
            <p>{i.a}</p>
          </div>
        ))}
      </div>
    </>
  );
}
```

The Q&A pairs to pass in for each page are already written in the Content Pack — copy them into a data file rather than re-writing.

### Article schema on the 5 existing blog posts + new resource pages — `P2`

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "The Early Signs of Hearing Loss (And When to Get Tested)",
  "author": { "@type": "Person", "name": "Paul Hsu" },
  "publisher": { "@type": "MedicalBusiness", "name": "Veritas Hearing" },
  "datePublished": "2026-09-15"
}
```

> **Validate before shipping:** run every page through Google's Rich Results Test after adding schema — a malformed JSON-LD block is worse than none, since it can trigger a manual Search Console warning.

---

## P4 — Internal linking & site structure

### Cross-link the 5 existing blog posts into service pages — `P2`

They currently sit in "Resources" with nothing pointing to them. Add a "Related reading" component to each service page, and a "Book this service" CTA on each blog post:

- Tinnitus blog post ↔ (new) tinnitus mention on Services page
- "Choosing the right hearing aid" post ↔ Hearing Aids page
- "Understanding hearing loss" post ↔ new /resources/signs-of-hearing-loss page
- "Protecting your hearing" post ↔ custom ear plugs service mention

### Sitewide NAP footer component — `P2`

Name, address (37 Lake Road, Frankton), phone and hours in the footer on every page, plus an embedded Google Map on `/contact`. If this component already exists, just confirm it renders identically site-wide — inconsistent NAP across pages is a known local-SEO trust signal issue.

---

## P5 — Performance & technical hygiene

### Confirm all images use next/image — `P2`

The homepage already shows `_next/image` requests, which is a good sign — spot-check the hero image and any blog post images specifically, since these are the most commonly missed.

### Run Lighthouse / PageSpeed Insights — `P2`

Check the homepage and `/hearing-test-hamilton` once built. Enable Vercel Speed Insights on the project if it isn't already, so Core Web Vitals are tracked going forward rather than checked once and forgotten.

---

## Acceptance checklist

- [ ] Google Search Console verified for veritashearing.co.nz, sitemap submitted
- [ ] robots.txt live at /robots.txt, sitemap live at /sitemap.xml
- [ ] No noindex header/tag present on the Production deployment
- [ ] Every existing page has a unique title, meta description and canonical tag (no duplicates)
- [ ] Single canonical domain enforced (www → non-www or vice versa), http → https forced
- [ ] All 6 new pages from the keyword plan are live, linked from nav/footer/related content, and indexed-requested in Search Console
- [ ] MedicalBusiness schema present site-wide; validates in Rich Results Test
- [ ] Physician schema present on About/Team page (after Paul's bio copy is live)
- [ ] FAQPage schema present and validating on all 6 new pages
- [ ] Existing 5 blog posts cross-linked to relevant service pages and vice versa
- [ ] Lighthouse SEO score ≥ 95 on homepage and one new service page

---

*Companion documents: Veritas Hearing Growth Playbook (competitor data, keyword plan, copy) and Veritas Hearing Content Pack (full article copy for every new page above). Framework/host detected from live page source, 15 Sep 2026 — confirm against the actual repository before scoping hours.*
