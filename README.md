# Veritas Hearing - Audiology Clinic Management System

Modern, professional clinic management system for Veritas Hearing, an audiology clinic based in Hamilton, New Zealand.

## Company Information

- **Company Name:** Veritas Hearing
- **Location:** 42a Hillcrest Road, Hillcrest, Hamilton 3216, New Zealand
- **Contact:** 
  - Phone: 0800 555 051
  - Email: info@veritashearing.co.nz

## Features

- 🏥 **Patient Portal** - Appointments, documents, messaging, billing
- 👨‍⚕️ **Admin Dashboard** - Clinic management, patient records, scheduling
- 🔐 **Authentication** - Role-based access (Admin, Audiologist, Receptionist, Patient)
- 📅 **Appointment System** - Online booking with availability management
- 💳 **Billing & Invoicing** - Payment tracking and invoice generation
- 📄 **Document Management** - Secure storage for medical records
- 💬 **Messaging** - Patient-provider secure communication

## Tech Stack

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** NextAuth.js
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion

## Prerequisites

- Node.js 18+ 
- PostgreSQL 14+
- npm or yarn

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/jethro-r/audiology_clinic.git
cd audiology_clinic
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Install & Setup PostgreSQL (Linux)

#### Ubuntu/Debian:
```bash
# Install PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib

# Start PostgreSQL service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database
sudo -u postgres createdb audiology_clinic

# Create user (optional)
sudo -u postgres psql -c "CREATE USER youruser WITH PASSWORD 'yourpassword';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE audiology_clinic TO youruser;"
```

#### Fedora/RHEL/CentOS:
```bash
# Install PostgreSQL
sudo dnf install postgresql-server postgresql-contrib

# Initialize database
sudo postgresql-setup --initdb

# Start PostgreSQL service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database
sudo -u postgres createdb audiology_clinic
```

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/audiology_clinic"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"  # Generate with: openssl rand -base64 32

# Email Configuration (optional for development)
EMAIL_SERVER_HOST="smtp.example.com"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="your-email@example.com"
EMAIL_SERVER_PASSWORD="your-password"
EMAIL_FROM="noreply@veritashearing.co.nz"
```

**Generate NextAuth Secret:**
```bash
openssl rand -base64 32
```

### 5. Setup Database Schema

```bash
# Push Prisma schema to database
npm run db:push

# Seed database with test data
npm run db:seed
```

### 6. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Test Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@hearwell.com | admin123 |
| Audiologist | sarah.chen@hearwell.com | doctor123 |
| Patient | john.smith@example.com | patient123 |

See [TEST_CREDENTIALS.md](./TEST_CREDENTIALS.md) for complete list.

## Available Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:push      # Push schema changes to database
npm run db:seed      # Seed database with test data
npm run db:studio    # Open Prisma Studio (database GUI)
```

## Application URLs

- **Homepage:** http://localhost:3000
- **Login:** http://localhost:3000/login
- **Patient Portal:** http://localhost:3000/portal/dashboard
- **Admin Dashboard:** http://localhost:3000/admin/dashboard

## Project Structure

```
├── prisma/              # Database schema and migrations
├── public/              # Static assets
├── src/
│   ├── app/            # Next.js app router pages
│   │   ├── (auth)/     # Authentication pages
│   │   ├── portal/     # Patient portal
│   │   ├── admin/      # Admin dashboard
│   │   └── api/        # API routes
│   ├── components/     # Reusable React components
│   ├── lib/           # Utility functions and configurations
│   └── types/         # TypeScript type definitions
└── ...
```

## Production Deployment

### Environment Setup
Ensure all environment variables are properly configured for production:
- Set `NEXTAUTH_URL` to your production domain
- Use strong `NEXTAUTH_SECRET`
- Configure production database connection
- Setup email service (SMTP)

### Build & Deploy
```bash
npm run build
npm run start
```

### Recommended Hosting Platforms
- **Vercel** - Zero-config deployment for Next.js
- **Railway** - Includes PostgreSQL database
- **DigitalOcean App Platform** - Full-stack deployment
- **AWS/GCP/Azure** - For enterprise deployments

## Database Management

### Backup Database
```bash
pg_dump audiology_clinic > backup.sql
```

### Restore Database
```bash
psql audiology_clinic < backup.sql
```

### View Database with Prisma Studio
```bash
npm run db:studio
```

## Troubleshooting

### PostgreSQL Connection Issues
```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Check if database exists
sudo -u postgres psql -l | grep audiology_clinic

# Test connection
psql -U username -d audiology_clinic -h localhost
```

### Port Already in Use
```bash
# Find process using port 3000
sudo lsof -i :3000

# Kill process
kill -9 <PID>
```

## License

Private - Veritas Hearing

## Support

For questions or support, contact: info@veritashearing.co.nz
