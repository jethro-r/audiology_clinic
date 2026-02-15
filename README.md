# Veritas Hearing - Audiology Clinic Website

Modern, professional marketing website for Veritas Hearing, an independent audiology clinic based in Hamilton, New Zealand.

## Company Information

- **Company Name:** Veritas Hearing
- **Location:** 37 Lake Road, Frankton, Hamilton 3204, New Zealand
- **Contact:**
  - Phone: 029 0451 0839
  - Email: info@veritashearing.co.nz

## Features

- 🌐 **Marketing Website** - Professional clinic website with service information
- 📄 **Pages** - Home, About, Services, Packages, Team, Resources, Contact
- 🗄️ **Database** - PostgreSQL (Neon) for dynamic content management
- 🎨 **Custom Design System** - Forest green & gold color scheme with consistent components
- 📱 **Responsive Design** - Mobile-first with smooth animations
- 📞 **Contact Form** - Client-side contact form for inquiries
- 📝 **Content Management** - Database-driven services, team members, and articles

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL (Neon) with Prisma 6 ORM
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **Icons:** Lucide React & Heroicons
- **Deployment:** Docker with Traefik reverse proxy

## Prerequisites

- Docker & Docker Compose (for production deployment)
- Node.js 20+ (for local development)
- PostgreSQL database (Neon or local)

## Quick Start (Local Development)

```bash
# Clone and install
git clone https://github.com/jethro-r/audiology_clinic.git
cd audiology_clinic
npm install

# Configure environment
cp .env.example .env.local
# Edit .env.local and add your Neon DATABASE_URL

# Setup database
npx prisma generate
npx prisma db push
npm run db:seed

# Start development
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Deployment

### Staging (Docker)

```bash
# On server - Initial setup
cp .env.example .env
# Edit .env with DATABASE_URL from Neon

npx prisma generate
npx prisma db push
npm run db:seed

# Deploy with Docker
docker compose up -d --build

# Updates
git pull
docker compose up -d --build
```

### Production (Vercel)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Import repository in Vercel dashboard
   - Add environment variable: `DATABASE_URL` (from Neon)

3. **Deploy**
   - Vercel will automatically build and deploy
   - Database setup runs automatically via `vercel.json`

4. **Seed Database** (one-time)
   ```bash
   # Run locally against production database
   DATABASE_URL="your-production-url" npm run db:seed
   ```

The `docker-compose.yml` file includes:
- **Container:** `audiology-clinic`
- **Network:** `proxy` (for Traefik integration)
- **Health checks:** Automatic container health monitoring
- **Traefik labels:** For routing and SSL configuration

## Project Structure

```
prisma/
├── schema.prisma       # Database models
└── seed.ts            # Database seed data

src/
├── app/               # Next.js pages & API routes
├── components/        # React components
└── lib/              # Utilities & database client

public/               # Static assets
```

See [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) for design guidelines.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:push` | Push database schema |
| `npm run db:seed` | Seed database |
| `npm run db:studio` | Open database GUI |

## Content Management

Manage services, team members, and articles:

```bash
npm run db:studio
```

Opens at [http://localhost:5555](http://localhost:5555)

## Database Models

- **Service** - Marketing services with features and details
- **TeamMember** - Team profiles and specializations
- **Article** - Patient resources and blog posts

## Environments

| Environment | Hosting | Database | Config |
|-------------|---------|----------|--------|
| Local | localhost:3000 | Neon | `.env.local` |
| Staging | Docker + Traefik | Neon | `.env` on server |
| Production | Vercel | Neon | Vercel dashboard |

---

**License:** Private - Veritas Hearing  
**Contact:** info@veritashearing.co.nz
