#!/bin/bash
# Linux Setup Script for Veritas Hearing Audiology Clinic

set -e  # Exit on error

echo "🏥 Veritas Hearing - Linux Setup Script"
echo "========================================"
echo ""

# Check if running on Linux
if [[ "$OSTYPE" != "linux-gnu"* ]]; then
    echo "❌ This script is designed for Linux systems"
    exit 1
fi

# Check for Node.js
echo "📦 Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first:"
    echo "   https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version must be 18 or higher. Current: $(node -v)"
    exit 1
fi
echo "✅ Node.js $(node -v) found"

# Check for PostgreSQL
echo ""
echo "📦 Checking PostgreSQL installation..."
if ! command -v psql &> /dev/null; then
    echo "⚠️  PostgreSQL is not installed"
    echo ""
    read -p "Would you like to install PostgreSQL? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        # Detect Linux distribution
        if [ -f /etc/debian_version ]; then
            echo "Installing PostgreSQL on Debian/Ubuntu..."
            sudo apt update
            sudo apt install -y postgresql postgresql-contrib
        elif [ -f /etc/redhat-release ]; then
            echo "Installing PostgreSQL on RHEL/Fedora/CentOS..."
            sudo dnf install -y postgresql-server postgresql-contrib
            sudo postgresql-setup --initdb
        else
            echo "❌ Unsupported Linux distribution. Please install PostgreSQL manually."
            exit 1
        fi
        
        # Start PostgreSQL service
        sudo systemctl start postgresql
        sudo systemctl enable postgresql
        echo "✅ PostgreSQL installed and started"
    else
        echo "❌ PostgreSQL is required. Please install it manually and re-run this script."
        exit 1
    fi
else
    echo "✅ PostgreSQL found"
fi

# Install dependencies
echo ""
echo "📦 Installing npm dependencies..."
npm install

# Setup database
echo ""
echo "🗄️  Setting up database..."
read -p "Enter PostgreSQL username [default: postgres]: " DB_USER
DB_USER=${DB_USER:-postgres}

read -sp "Enter PostgreSQL password: " DB_PASSWORD
echo ""

# Create database
echo "Creating database 'audiology_clinic'..."
if sudo -u postgres psql -lqt | cut -d \| -f 1 | grep -qw audiology_clinic; then
    echo "⚠️  Database 'audiology_clinic' already exists"
    read -p "Do you want to drop and recreate it? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        sudo -u postgres dropdb audiology_clinic
        sudo -u postgres createdb audiology_clinic
        echo "✅ Database recreated"
    fi
else
    sudo -u postgres createdb audiology_clinic
    echo "✅ Database created"
fi

# Configure environment
echo ""
echo "⚙️  Configuring environment variables..."
if [ -f .env.local ]; then
    echo "⚠️  .env.local already exists"
    read -p "Do you want to overwrite it? (y/n) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Skipping .env.local configuration"
    else
        CREATE_ENV=true
    fi
else
    CREATE_ENV=true
fi

if [ "$CREATE_ENV" = true ]; then
    # Generate NextAuth secret
    NEXTAUTH_SECRET=$(openssl rand -base64 32)
    
    cat > .env.local << EOF
# Database Configuration
DATABASE_URL="postgresql://${DB_USER}:${DB_PASSWORD}@localhost:5432/audiology_clinic"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="${NEXTAUTH_SECRET}"

# Email Configuration (Optional - configure later if needed)
EMAIL_SERVER_HOST="smtp.example.com"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="your-email@example.com"
EMAIL_SERVER_PASSWORD="your-password"
EMAIL_FROM="noreply@veritashearing.co.nz"
EOF
    echo "✅ .env.local created"
fi

# Setup Prisma
echo ""
echo "🗄️  Setting up database schema..."
npm run db:push

echo ""
echo "🌱 Seeding database with test data..."
npm run db:seed

# Success message
echo ""
echo "✅ Setup complete!"
echo ""
echo "🚀 To start the development server, run:"
echo "   npm run dev"
echo ""
echo "📝 Test accounts:"
echo "   Admin:       admin@hearwell.com / admin123"
echo "   Audiologist: sarah.chen@hearwell.com / doctor123"
echo "   Patient:     john.smith@example.com / patient123"
echo ""
echo "🌐 Access the application at:"
echo "   http://localhost:3000"
echo ""
