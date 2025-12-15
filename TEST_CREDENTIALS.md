# Test Credentials & URLs

## Local Development URLs

- **Homepage**: http://localhost:3000
- **Login**: http://localhost:3000/login
- **Register**: http://localhost:3000/register
- **Patient Portal**: http://localhost:3000/portal/dashboard
- **Admin Dashboard**: http://localhost:3000/admin/dashboard

## Test Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@hearwell.com | admin123 |
| Audiologist | sarah.chen@hearwell.com | doctor123 |
| Audiologist | michael.torres@hearwell.com | doctor123 |
| Audiologist | emily.watson@hearwell.com | doctor123 |
| Audiologist | james.park@hearwell.com | doctor123 |
| Receptionist | reception@hearwell.com | reception123 |
| Patient | john.smith@example.com | patient123 |

## Database

- **Connection**: PostgreSQL on port 5433 (Homebrew)
- **Database Name**: audiology_clinic
- **Connection String**: `postgresql://jethroread@localhost:5433/audiology_clinic`

## Commands

```bash
# Start development server
npm run dev

# Database commands
npm run db:push      # Push schema changes
npm run db:seed      # Re-seed test data
npm run db:studio    # Open Prisma Studio (database GUI)

# Start PostgreSQL (if stopped)
/opt/homebrew/opt/postgresql@17/bin/pg_ctl -D /opt/homebrew/var/postgresql@17 -o "-p 5433" start
```
