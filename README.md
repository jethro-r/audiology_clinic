# Veritas Hearing - Audiology Clinic Website

Modern, professional website and patient portal for Veritas Hearing, an independent audiology clinic based in Hamilton, New Zealand.

## Company Information

- **Company Name:** Veritas Hearing
- **Location:** 37 Lake Road, Frankton, Hamilton 3204, New Zealand
- **Contact:**
  - Phone: 029 0451 0839
  - Email: info@veritashearing.co.nz

## Features

- 🌐 **Marketing Website** - Services, team, resources, contact
- 🏥 **Patient Portal** - Appointments, documents, messaging, billing
- 🔐 **Authentication** - Role-based access (Admin, Audiologist, Patient)
- 📅 **Appointment System** - Online booking with availability management
- 💳 **Billing & Invoicing** - Payment tracking and invoice generation

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL with Prisma 7 ORM
- **Authentication:** NextAuth.js
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **Deployment:** Docker with Traefik reverse proxy

## Prerequisites

- Docker & Docker Compose
- Node.js 20+ (for local Prisma commands)
- PostgreSQL 14+ (external to Docker)

## Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/jethro-r/audiology_clinic.git
cd audiology_clinic
```

### 2. Install Dependencies (for local Prisma commands)

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file:

```bash
# Database (local development)
DATABASE_URL="postgresql://audiology:audiology123@localhost:5432/audiology_clinic"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"  # Generate with: openssl rand -base64 32
```

### 4. Setup Database

```bash
# Push schema to database
npx prisma db push

# Generate Prisma client
npx prisma generate

# Seed with test data
npx prisma db seed
```

### 5. Start Development Server

```bash
npm run dev
```

## Production Deployment (Docker)

### 1. Configure Production Environment

Create `.env` on your server:

```bash
DATABASE_URL="postgresql://audiology:audiology123@host.docker.internal:5432/audiology_clinic"
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="your-production-secret"
```

### 2. Build and Deploy

```bash
# Build and start container
docker compose up -d --build

# View logs
docker compose logs -f audiology-clinic
```

### 3. Database Commands (run on server, NOT in Docker)

Prisma commands should be run directly on the server with Node.js installed:

```bash
# Push schema changes to database
npx prisma db push

# Regenerate Prisma client after schema changes
npx prisma generate

# Seed database
npx prisma db seed

# Open Prisma Studio
npx prisma studio
```

### 4. Rebuild After Code Changes

```bash
git pull origin main
docker compose down
docker compose up -d --build
```

## Test Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@veritashearing.co.nz | admin!23 |
| Audiologist | paul.hsu@veritashearing.co.nz | audio!23 |
| Patient | john.smith@example.com | patient123 |

## Project Structure

```
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Database seeding
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── (auth)/         # Login, register
│   │   ├── portal/         # Patient portal
│   │   ├── api/            # API routes
│   │   └── ...             # Public pages
│   ├── components/         # React components
│   └── lib/                # Utilities
├── docker-compose.yml      # Docker configuration
├── Dockerfile              # Container build
└── prisma.config.ts        # Prisma 7 configuration
```

## Docker Architecture

The application runs in Docker with:
- **Target:** `runner` stage (optimized production build)
- **Network:** `proxy` (Traefik integration)
- **Database:** External PostgreSQL via `host.docker.internal`

## Troubleshooting

### Container won't start
```bash
docker compose logs audiology-clinic
```

### Database connection issues
```bash
# Ensure PostgreSQL allows connections from Docker
# Edit pg_hba.conf to allow 172.17.0.0/16
```

### Schema out of sync
```bash
# On server (not in Docker)
npx prisma db push
npx prisma generate

# Then rebuild container
docker compose up -d --build
```

## License

Private - Veritas Hearing

## Support

For questions or support, contact: info@veritashearing.co.nz
