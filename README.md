# Veritas Hearing — Audiology Clinic Website

Modern, professional marketing website for Veritas Hearing, an independent audiology clinic based in Hamilton, New Zealand.

## Company

- **Name:** Veritas Hearing
- **Location:** 37 Lake Road, Frankton, Hamilton 3204, New Zealand
- **Phone:** 029 0451 0839
- **Email:** info@veritashearing.co.nz

## Features

- 🌐 **Marketing Pages** — Home, About, Services, Hearing Aids, Team, Resources, Contact, Booking
- 📊 **Admin CMS** — Manage services, team members, articles, FAQs, and site settings
- 🖼️ **Media Library** — Upload, browse, and manage images via Vercel Blob storage
- 🗄️ **Database-Driven** — PostgreSQL (Neon) with Prisma ORM for dynamic content
- 🎨 **Design System** — Forest green & gold with consistent section components
- 📱 **Responsive** — Mobile-first with IntersectionObserver animations
- 🔒 **Admin Auth** — Password-protected admin panel with session management
- 📝 **Rich Text Editing** — TipTap editor for articles and service descriptions

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| Next.js 16 (App Router) | Framework |
| React 19 | UI library |
| TypeScript | Language |
| Tailwind CSS 4 | Styling |
| Prisma 6 | Database ORM |
| PostgreSQL (Neon) | Database |
| TipTap | Rich text editor |
| Vercel Blob | Image storage |
| Lucide React | Icons |
| Geist | Typography |

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL database (Neon or local)
- Docker (optional, for staging deployment)

### Local Development

```bash
# Clone and install
git clone https://github.com/jethro-r/audiology_clinic.git
cd audiology_clinic
npm install

# Configure environment
cp .env.example .env.local
# Edit .env.local — add your Neon DATABASE_URL

# Setup database
npx prisma generate
npm run db:push
npm run db:seed

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Admin Panel

Visit `/admin` and log in with the configured password. From there you can manage:

- **Services** — Add/edit services with icons, images, features, and rich descriptions
- **Team** — Manage team member profiles and specialisations
- **Articles** — Write and publish patient resources with rich text
- **FAQs** — Manage frequently asked questions
- **Media** — Upload and organise images
- **Settings** — Site-wide configuration

## Project Structure

```
src/
├── app/
│   ├── (site)/            # Public pages (route group)
│   │   ├── page.tsx       # Homepage
│   │   ├── layout.tsx     # Shared layout with Header/Footer
│   │   ├── loading.tsx    # Skeleton loading UI
│   │   ├── about/
│   │   ├── booking/
│   │   ├── contact/
│   │   ├── hearing-aids/
│   │   ├── resources/
│   │   ├── services/
│   │   └── team/
│   ├── admin/             # Admin CMS
│   └── api/               # API routes
│       ├── admin/         # Upload & media management
│       ├── contact/       # Contact form
│       └── faqs/          # FAQ queries
├── components/
│   ├── sections/          # PageHero, Section, CTASection
│   ├── admin/             # AdminLayout, AdminAuthWrapper, RichTextEditor
│   ├── AnimateInView.tsx  # IntersectionObserver animation wrapper
│   ├── NavigationProgress.tsx
│   ├── HearingAid*.tsx    # Hearing aids page components
│   └── ...Content.tsx     # Client components for server-rendered pages
├── hooks/
│   └── useInView.ts       # Viewport detection hook
├── lib/
│   ├── data.ts            # Prisma query functions
│   ├── db.ts              # Prisma client singleton
│   ├── hearingAidData.ts  # Hearing aid types, brands, care data
│   └── static-data.ts     # Fallback static service data
└── ...

public/
└── frontend/              # All site images (WebP preferred, SVG for logos)

scripts/
├── optimize-images.ts     # Batch image optimisation with sharp
└── dumpRemoteDb.ts        # Remote DB dump utility

prisma/
├── schema.prisma          # Database models
└── seed.ts               # Seed data
```

## Deployment

### Production (Vercel)

1. Push to GitHub — Vercel auto-deploys from the `main` branch
2. Set `DATABASE_URL` environment variable in Vercel dashboard
3. Seed the database once: `DATABASE_URL="your-url" npm run db:seed`

### Staging (Docker)

```bash
cp .env.example .env  # Add DATABASE_URL
docker compose up -d --build
```

Uses Traefik reverse proxy with health checks and SSL.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:push` | Push Prisma schema to database |
| `npm run db:seed` | Seed database with initial data |
| `npm run db:studio` | Open Prisma Studio GUI |
| `npm run db:dump:remote` | Dump remote DB to local |
| `npm run db:dump:remote:dry` | Dry-run remote DB dump |
| `npm run db:dump:remote:noimg` | Dump remote DB without images |

## Database Models

- **Service** — Marketing services with features, icons, images, and rich descriptions
- **TeamMember** — Team profiles with specialisations and photos
- **Article** — Patient resources and blog posts with rich text content
- **FAQ** — Frequently asked questions with sort ordering

## Environments

| Environment | Hosting | Database | Config |
|-------------|---------|----------|--------|
| Local | `localhost:3000` | Neon | `.env.local` |
| Staging | Docker + Traefik | Neon | `.env` on server |
| Production | Vercel | Neon | Vercel dashboard |

---

**License:** Private — Veritas Hearing
**Contact:** info@veritashearing.co.nz
