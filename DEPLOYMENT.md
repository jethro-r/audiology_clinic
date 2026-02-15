# Veritas Hearing - Deployment Guide

This application supports three deployment environments.

## 🏠 Local Development

**Environment:** Your computer  
**URL:** http://localhost:3000  
**Config:** `.env.local`

```bash
# Setup
npm install
cp .env.example .env.local
# Add DATABASE_URL to .env.local

# Database
npx prisma generate
npx prisma db push
npm run db:seed

# Run
npm run dev
```

## 🧪 Staging (Docker)

**Environment:** Staging server with Docker + Traefik  
**URL:** https://veritashearing.readj.dev  
**Config:** `.env` on server

```bash
# On server - First time
git clone <repo>
cd audiology_clinic
npm install
cp .env.example .env
# Add DATABASE_URL to .env

# Database setup
npx prisma generate
npx prisma db push
npm run db:seed

# Deploy
docker compose up -d --build

# Updates
git pull
docker compose up -d --build
```

## 🚀 Production (Vercel)

**Environment:** Vercel serverless  
**URL:** Your production domain  
**Config:** Vercel dashboard

### Initial Setup

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Import in Vercel**
   - Go to https://vercel.com
   - Import your GitHub repository
   - Framework: Next.js (auto-detected)

3. **Add Environment Variable**
   - In Vercel dashboard → Settings → Environment Variables
   - Add: `DATABASE_URL` = your Neon connection string
   - Apply to: Production, Preview, Development

4. **Deploy**
   - Vercel will automatically build and deploy
   - Build command runs `prisma generate` automatically

### Database Setup (One-time)

After first deployment, seed the production database:

```bash
# Run locally, but target production database
DATABASE_URL="your-production-neon-url" npm run db:seed
```

### Updates

Just push to GitHub:
```bash
git push origin main
```

Vercel auto-deploys on every push.

## 🗄️ Database (Neon)

All environments use **Neon PostgreSQL** (cloud database).

- Get your database URL: https://neon.tech
- Same database can be used for all environments (different branches recommended)
- Or create separate databases for staging/production

### Neon Branch Strategy (Recommended)

```
main branch     → Production database
staging branch  → Staging database  
dev branch      → Development database
```

## 📝 Environment Variables

Only one variable needed: `DATABASE_URL`

| Environment | Config File | Example |
|-------------|-------------|---------|
| Local | `.env.local` | `.env.local` file |
| Staging | `.env` | `.env` file on server |
| Production | Vercel Dashboard | Settings → Environment Variables |

## 🔄 Workflow Summary

```
┌─────────────┐      ┌──────────────┐      ┌────────────────┐
│   Local     │      │   Staging    │      │   Production   │
│  (laptop)   │ ───> │   (Docker)   │ ───> │   (Vercel)     │
│             │      │              │      │                │
│ npm run dev │      │ docker up    │      │ git push       │
└─────────────┘      └──────────────┘      └────────────────┘
       │                    │                       │
       └────────────────────┴───────────────────────┘
                            │
                    ┌───────▼────────┐
                    │  Neon Database │
                    │  (PostgreSQL)  │
                    └────────────────┘
```

## 🛠️ Managing Content

Use Prisma Studio (works with any environment):

```bash
# Point to desired database
DATABASE_URL="your-db-url" npm run db:studio
```

Opens at http://localhost:5555
