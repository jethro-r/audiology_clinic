# CLAUDE.md

Guidance for Claude Code when working with this repository.

## Project Overview

Veritas Hearing marketing website with:
- ✅ Marketing pages (Home, About, Services, Packages, Team, Resources, Contact)
- ✅ Database integration (PostgreSQL/Neon + Prisma)
- ✅ API routes for dynamic content
- ✅ Responsive design with Framer Motion
- ✅ Forest green & gold design system

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Prisma 6, PostgreSQL

## Environments

- **Local:** `.env.local` → `npm run dev`
- **Staging:** `.env` → `docker compose up -d --build`
- **Production:** Vercel dashboard → Auto-deploy from GitHub

All environments use Neon PostgreSQL. Only `DATABASE_URL` required.

## Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Production build

# Database
npm run db:push          # Push schema
npm run db:seed          # Seed data
npm run db:studio        # Open GUI

# Staging Deploy
docker compose up -d --build
```

## API Routes

- `GET /api/services` - List services (?homepage=true, ?footer=true)
- `GET /api/services/[slug]` - Single service
- `GET /api/team` - Team members
- `GET /api/articles` - Articles

## Database

**Models:** Service, TeamMember, Article  
**Location:** `prisma/schema.prisma`  
**Seed:** `prisma/seed.ts`

## Design System

**See [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) for complete guidelines.**

### Key Colors
- Primary: `#183D2D` (forest green)
- Secondary: `#C6A667` (gold)
- Background: `#F7F5EF` (cream)

### Rules
- Use white for main content, cream for alternating sections
- Hero sections: `bg-primary` with white text
- **Never** use `<strong>` or `<b>` in body text
- Always use section components: `PageHero`, `Section`, `SectionHeader`, `CTASection`
