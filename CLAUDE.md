# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Veritas Hearing audiology clinic website with:
1. **Marketing website** (COMPLETE) - Public pages, services, contact
2. **Booking/reservation system** (COMPLETE) - Patient portal, appointments
3. **Packages page** - Hearing aid package tiers
4. Online payment system (Stripe) - Future
5. Patient documentation system - Future

## Technology Stack

- **Frontend**: Next.js 16 (App Router), React 19, Tailwind CSS 4
- **Backend**: Next.js API routes
- **Database**: PostgreSQL with Prisma 7 ORM
- **Auth**: NextAuth.js with credentials provider
- **Deployment**: Docker with Traefik reverse proxy
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Deployment Architecture

The application runs in Docker. Database commands are run directly on the server (NOT via docker exec).

### Docker Commands (on server)

```bash
# Build and deploy
docker compose up -d --build

# Rebuild after code changes
git pull origin main
docker compose down
docker compose up -d --build

# View logs
docker compose logs -f audiology-clinic
```

### Prisma Commands (on server, outside Docker)

```bash
# Push schema changes to database
npx prisma db push

# Regenerate client after schema changes
npx prisma generate

# Seed database
npx prisma db seed

# Open database GUI
npx prisma studio
```

**Important:** Never run `prisma migrate deploy` - use `prisma db push` instead for this project.

## Local Development Commands

```bash
# Development server
npm run dev

# Build
npm run build

# Linting
npm run lint

# Database
npm run db:push          # Push schema to database
npm run db:seed          # Seed database with test data
npm run db:studio        # Open Prisma Studio
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Homepage
│   ├── globals.css             # Design system
│   ├── about/                  # About page
│   ├── services/               # Services page
│   ├── packages/               # Hearing aid packages
│   ├── team/                   # Team page
│   ├── resources/              # Patient resources
│   ├── contact/                # Contact page
│   ├── faq/                    # FAQ page
│   ├── (auth)/
│   │   ├── login/              # Patient login
│   │   └── register/           # Patient registration
│   ├── portal/                 # Patient portal (protected)
│   │   ├── dashboard/
│   │   ├── appointments/
│   │   ├── billing/
│   │   ├── documents/
│   │   ├── messages/
│   │   ├── profile/
│   │   └── settings/
│   └── api/
│       ├── auth/               # NextAuth handlers
│       ├── appointments/       # Appointment CRUD
│       ├── services/           # Services API
│       └── ...
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Button.tsx
│   └── ...
└── lib/
    ├── auth.ts                 # NextAuth config
    ├── db.ts                   # Prisma client
    ├── email.ts                # Email utilities
    └── services.ts             # Service definitions

prisma/
├── schema.prisma               # Database schema
├── seed.ts                     # Seeding script
└── prisma.config.ts            # Prisma 7 config

Dockerfile                      # Multi-stage build
docker-compose.yml              # Docker Compose config
```

## Database Schema

Key models in `prisma/schema.prisma`:
- **User** - Patients, audiologists, admins (with roles)
- **Service** - Marketing services displayed on website
- **AppointmentType** - Bookable service types with pricing
- **Appointment** - Patient bookings
- **Availability** - Provider weekly schedules
- **Invoice**, **Payment** - Billing models

## Authentication

- NextAuth.js with JWT strategy
- Credentials provider (email/password)
- Roles: PATIENT, AUDIOLOGIST, RECEPTIONIST, ADMIN
- Protected routes check session in layout components

## Design System

**IMPORTANT:** See `DESIGN_SYSTEM.md` for complete design system documentation including:
- Color palette with usage guidelines
- Typography scale and rules
- Component patterns (Badge, Button, cards)
- Layout patterns (heroes, sections)
- Spacing scale
- Animation patterns
- "What to avoid" guidelines

### Quick Reference (Color Palette - Forest Green + Gold)

CSS variables in `globals.css`:
- `--primary`: #183D2D (deep forest green)
- `--primary-dark`: #0f2a1e
- `--primary-light`: #2a5c44
- `--secondary`: #C6A667 (gold accent)
- `--secondary-dark`: #a88b4a
- `--secondary-light`: #d4bc8a
- `--background`: #F7F5EF (cream)
- `--foreground`: #1f2937
- `--muted`: #6b7280
- `--card`: #ffffff

### Page Design Patterns

**Use white as the primary background** for content sections. Use cream (`--background`) sparingly for alternating sections. Avoid heavy use of dark green backgrounds - reserve for hero sections only.

**Standard page section pattern:**
1. **Hero**: `bg-primary` with white text, gold border badge
2. **Content sections**: `bg-white` for primary content
3. **Alternating section**: `bg-background` (cream) for visual break
4. **Cards**: `bg-background` with `border-border` on white, OR `bg-white` with border on cream
5. **Icons**: `bg-primary` with white icons, OR `bg-secondary` with white icons

**What to avoid:**
- No gradients in backgrounds
- No SVG wave transitions between sections
- Don't mix dark green and gold heavily in the same area
- Don't overuse cream - mostly white with strategic cream accents
- **NEVER use `<strong>` or `<b>` tags in body text** - body copy must have uniform weight

### Typography Rules

**CRITICAL:** Body text must never contain randomly bolded words.
- **DO:** Use `<h1>-<h6>` tags with `font-bold` for headings
- **DON'T:** Use `<strong>`, `<b>`, or `font-semibold` within paragraphs
- All body text should be uniform weight without random emphasis

**Hero sections:** Use `pt-24 pb-20` padding (NOT `pt-32`)
**Headings:** `text-4xl sm:text-5xl` for hero titles, `text-3xl sm:text-4xl` for section headings

## Test Credentials

```
Admin: admin@veritashearing.co.nz / admin!23
Audiologist: paul.hsu@veritashearing.co.nz / audio!23
Patient: john.smith@example.com / patient123
```

## Prisma 7 Notes

This project uses Prisma 7 with `prisma.config.ts`. The config file defines:
- Schema location
- Migrations path
- Datasource URL from environment

The schema does NOT include `url` in the datasource block - it's defined in `prisma.config.ts` instead.
