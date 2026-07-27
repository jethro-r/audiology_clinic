# CLAUDE.md

Guidance for Claude Code when working with this repository.

## Project Overview

Veritas Hearing marketing website for an independent audiology clinic in Hamilton, New Zealand.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Prisma 6, PostgreSQL (Neon)

### Key Features
- Marketing pages (Home, About, Services, Hearing Aids, Team, Resources, Contact, Booking, Privacy Policy)
- Admin CMS with media library (services, team, articles, FAQs, settings)
- Database-driven content via direct Prisma queries (no internal API fetch pattern)
- Custom animation system using IntersectionObserver (no framer-motion)
- Navigation progress bar for client-side transitions
- Hearing aids page with lightbox (yet-another-react-lightbox)
- Image optimization pipeline (WebP preferred, images in `public/frontend/`)
- Consent-gated third-party tracking (GA4 + Meta Pixel) via `ConsentProvider`

## Environments

- **Local:** `.env.local` → `npm run dev`
- **Staging:** `.env` → `docker compose up -d --build`
- **Production:** Vercel → Auto-deploy from GitHub

All environments use Neon PostgreSQL. Only `DATABASE_URL` required.

## Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Production build (includes prisma generate)

# Database
npm run db:push          # Push schema changes
npm run db:seed          # Seed data
npm run db:studio        # Open Prisma GUI
npm run db:dump:remote   # Dump remote DB to local (use --dry-run first)

# Staging
docker compose up -d --build
```

## Architecture

### Pages — `src/app/(site)/`

All public pages live in a Next.js route group with a shared server layout that fetches footer services. Pages are async server components that call Prisma directly and pass data to client components.

| Route | Server data | Client component |
|-------|------------|-----------------|
| `/` | `getServicesDirect`, `getFaqsDirect` | `HomePageContent` |
| `/about` | Static | — |
| `/services` | `getServicesDirect` | `ServicesContent` |
| `/hearing-aids` | Static data from `hearingAidData.ts` | Multiple HA components |
| `/team` | `getTeamMembersDirect` | `TeamContent` |
| `/resources` | `getArticlesDirect` | `ResourcesContent` |
| `/resources/articles/[slug]` | `getArticleBySlugDirect` | `ArticleContent` |
| `/booking` | Static | Cliniko iframe |
| `/contact` | Static | `ContactForm` |
| `/privacy-policy` | Static | — |

### Data Layer — `src/lib/data.ts`

Direct Prisma queries with `reactCache` + `unstable_cache` for layout-level caching. No internal API fetch pattern — server components query the database directly.

### Admin — `src/app/admin/`

Full CMS with admin auth, rich text editor (TipTap), image upload (Vercel Blob), and media library. Uses `AdminAuthWrapper` + `AdminLayout` pattern.

### Animations — `src/components/AnimateInView.tsx`

Custom `IntersectionObserver`-based animation wrapper (replaces framer-motion). Supports `fade-up`, `fade-left`, `fade-right` with configurable delay. Used with the `useInView` hook (`src/hooks/useInView.ts`).

### Images — `public/frontend/`

All site images live in `public/frontend/`. WebP format preferred. Brand logos are SVGs. Use Next.js `<Image>` component everywhere — never raw `<img>` tags.

### Tracking & Consent — `src/components/ConsentProvider.tsx`

GA4 (Google Analytics 4) and Meta Pixel are gated behind visitor consent. Nothing third-party loads until the visitor accepts.

- `ConsentProvider` is a client component mounted in `src/app/(site)/layout.tsx`. It reads `veritas-cookie-consent` from `localStorage` on mount and renders the cookie banner when no choice has been recorded.
- **Accept** → writes `"accepted"`, mounts the GA4 + Meta Pixel `<Script>` tags (via `next/script`) and `GaPageView` / `MetaPageView`. The scripts' inline init fires the initial page view automatically.
- **Decline** → writes `"declined"`. No third-party scripts load, no events fire, no requests are made to Google or Meta.
- The provider lives in the `(site)` layout, so `/admin` pages are never tracked.
- `GaPageView` and `MetaPageView` (also client components) skip their first render to avoid double-counting the initial page view fired by the inline init.
- Vercel Analytics + Speed Insights remain in the root layout **ungated** — they are first-party and privacy-friendly.
- Env vars: `NEXT_PUBLIC_GA_MEASUREMENT_ID` (GA4), `NEXT_PUBLIC_META_PIXEL_ID` (Meta Pixel). If unset, the corresponding scripts and trackers are skipped.

## API Routes

- `POST /api/contact` — Contact form submission
- `POST /api/admin/upload` — Image upload to Vercel Blob
- `GET/DELETE /api/admin/media` — Media library management

## Database

**Models:** Service, TeamMember, Article, FAQ
**Location:** `prisma/schema.prisma`
**Seed:** `prisma/seed.ts`

### ⚠️ Database Safety

**Never modify the database without explicit user permission.** Always report what you find and let the user decide whether to make changes.

## Design System

### Key Colors
- Primary: `#183D2D` (forest green)
- Secondary: `#C6A667` (gold)
- Background: `#F7F5EF` (cream)

### Rules
- Use white for main content, cream for alternating sections
- Hero sections: `bg-primary` with white text
- **Never** use `<strong>` or `<b>` in body text
- Always use section components: `PageHero`, `Section`, `SectionHeader`, `CTASection`
- Typography: Geist typeface (loaded via `geist` npm package)

## Utility Scripts

- `scripts/optimize-images.ts` — Batch convert/compress images using sharp
- `scripts/dumpRemoteDb.ts` — Dump remote DB to local (supports `--dry-run`, `--skip-images`, `--force`)
