# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Audiology clinic website with four phases:
1. **Marketing website** (COMPLETE) - Public-facing pages with contact form
2. **Booking/reservation system** (COMPLETE) - Patient portal, appointment scheduling, admin dashboard
3. Online payment system (Stripe)
4. Patient documentation system (HIPAA-compliant)

## Technology Stack

- **Frontend**: Next.js 16 (App Router), React 19, Tailwind CSS 4
- **Backend**: Next.js API routes
- **Database**: PostgreSQL with Prisma 7 ORM
- **Auth**: NextAuth.js with credentials provider
- **Payments**: Stripe (Phase 3)
- **Email**: Custom email utility (ready for SendGrid/Resend integration)
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Common Commands

```bash
# Development
npm run dev

# Build
npm run build

# Linting
npm run lint

# Database
npm run db:push          # Push schema to database
npm run db:seed          # Seed database with test data
npm run db:studio        # Open Prisma Studio

# Prisma CLI
npx prisma generate      # Generate Prisma client
npx prisma migrate dev   # Run migrations
```

## Current File Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with Header/Footer
│   ├── page.tsx                # Homepage
│   ├── globals.css             # Design system
│   ├── sitemap.ts              # Dynamic sitemap
│   ├── robots.ts               # Robots.txt
│   ├── about/                  # About page
│   ├── services/               # Services page
│   ├── team/                   # Team page
│   ├── resources/              # Patient resources
│   ├── contact/                # Contact page
│   ├── (auth)/
│   │   ├── login/              # Patient login
│   │   └── register/           # Patient registration
│   ├── portal/                 # Patient portal (protected)
│   │   ├── layout.tsx          # Portal layout with sidebar
│   │   ├── dashboard/          # Patient dashboard
│   │   ├── appointments/       # View/manage appointments
│   │   │   └── new/            # Multi-step booking flow
│   │   └── profile/            # Patient profile
│   ├── admin/                  # Admin portal (protected)
│   │   ├── layout.tsx          # Admin layout with sidebar
│   │   ├── dashboard/          # Admin dashboard with stats
│   │   ├── appointments/       # Appointment management
│   │   ├── patients/           # Patient management
│   │   └── availability/       # Provider schedule management
│   └── api/
│       ├── auth/
│       │   ├── [...nextauth]/  # NextAuth.js handler
│       │   └── register/       # User registration
│       ├── appointments/       # CRUD + email notifications
│       ├── appointment-types/  # Service types
│       ├── audiologists/       # Provider list
│       ├── availability/       # Time slot calculation
│       ├── admin/
│       │   ├── patients/       # Patient list (admin)
│       │   └── availability/   # Provider schedule (admin)
│       └── contact/            # Contact form
├── components/
│   ├── Header.tsx              # Navigation
│   ├── Footer.tsx              # Site footer
│   ├── Hero.tsx                # Homepage hero
│   ├── Button.tsx              # Button component
│   ├── ServiceCard.tsx         # Service card
│   ├── TeamMember.tsx          # Team member card
│   ├── ContactForm.tsx         # Contact form
│   └── AuthProvider.tsx        # NextAuth session provider
└── lib/
    ├── auth.ts                 # NextAuth configuration
    ├── db.ts                   # Prisma client (with pg adapter)
    ├── email.ts                # Email notification utilities
    └── utils.ts                # Utility functions

prisma/
├── schema.prisma               # Database schema
└── seed.ts                     # Database seeding script
```

## Database Schema

Key models in `prisma/schema.prisma`:
- **User** - Patients, audiologists, receptionists, admins (with roles)
- **AppointmentType** - Service types with duration and pricing
- **Appointment** - Bookings with status workflow
- **Availability** - Provider weekly schedules
- **BlockedTime** - Exception blocks for providers

## Authentication

- NextAuth.js with JWT strategy
- Credentials provider (email/password)
- Role-based access control: PATIENT, AUDIOLOGIST, RECEPTIONIST, ADMIN
- Protected routes check session and role in layout components

## Design System

CSS variables in `globals.css`:
- `--primary`: #0891b2 (teal/cyan for healthcare)
- `--secondary`: #f59e0b (amber accent)
- `--foreground`: #1f2937 (dark gray text)
- `--muted`: #6b7280 (secondary text)
- `--success`: #10b981, `--error`: #ef4444

## Test Credentials (after seeding)

```
Admin: admin@hearwell.com / admin123
Audiologist: sarah.chen@hearwell.com / doctor123
Receptionist: reception@hearwell.com / reception123
Patient: john.smith@example.com / patient123
```

## Next Steps (Phase 3-4)

### Phase 3: Online Payments
- Stripe integration for appointment deposits
- Invoice generation
- Payment history

### Phase 4: Patient Documentation
- HIPAA-compliant document storage
- Audiogram upload and viewing
- Secure messaging
- Audit logging

## Security Requirements (Phase 4)

HIPAA-compliant healthcare application requirements:
- Encrypt sensitive data at rest (SSN, insurance numbers, medical info)
- All PHI access must be audit logged
- Session timeout after 15 minutes idle
- RBAC for all protected routes
