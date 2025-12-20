import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import "dotenv/config";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  // Create appointment types
  const appointmentTypes = await Promise.all([
    prisma.appointmentType.upsert({
      where: { name: "Comprehensive Hearing Evaluation" },
      update: {},
      create: {
        name: "Comprehensive Hearing Evaluation",
        description:
          "Complete assessment of hearing ability including pure tone audiometry, speech testing, and middle ear analysis.",
        durationMinutes: 60,
        price: 250,
        active: true,
      },
    }),
    prisma.appointmentType.upsert({
      where: { name: "Hearing Aid Fitting" },
      update: {},
      create: {
        name: "Hearing Aid Fitting",
        description:
          "Professional fitting and programming of hearing aids customized to your hearing needs.",
        durationMinutes: 90,
        price: 350,
        active: true,
      },
    }),
    prisma.appointmentType.upsert({
      where: { name: "Hearing Aid Follow-up" },
      update: {},
      create: {
        name: "Hearing Aid Follow-up",
        description:
          "Adjustment and fine-tuning of hearing aids, cleaning, and counseling.",
        durationMinutes: 30,
        price: 75,
        active: true,
      },
    }),
    prisma.appointmentType.upsert({
      where: { name: "Tinnitus Consultation" },
      update: {},
      create: {
        name: "Tinnitus Consultation",
        description:
          "Evaluation and management options for ringing in the ears, including sound therapy options.",
        durationMinutes: 45,
        price: 200,
        active: true,
      },
    }),
    prisma.appointmentType.upsert({
      where: { name: "Earwax Removal" },
      update: {},
      create: {
        name: "Earwax Removal",
        description:
          "Safe and gentle removal of earwax buildup using professional techniques.",
        durationMinutes: 30,
        price: 100,
        active: true,
      },
    }),
    prisma.appointmentType.upsert({
      where: { name: "Pediatric Hearing Screening" },
      update: {},
      create: {
        name: "Pediatric Hearing Screening",
        description:
          "Age-appropriate hearing assessment for children using specialized testing methods.",
        durationMinutes: 45,
        price: 175,
        active: true,
      },
    }),
  ]);

  console.log(`✅ Created ${appointmentTypes.length} appointment types`);

  // Create services (marketing/display)
  const services = await Promise.all([
    prisma.service.upsert({
      where: { slug: "hearing-assessments" },
      update: {},
      create: {
        slug: "hearing-assessments",
        title: "Comprehensive Hearing Assessments",
        shortDescription:
          "Advanced hearing assessments delivering clear answers and confidence through precise, evidence-based diagnostic testing.",
        fullDescription:
          "Advanced hearing assessments delivering clear answers and confidence through precise, evidence-based diagnostic testing.",
        duration: "60-90 minutes",
        iconName: "Ear",
        features: [
          "Complete medical history review",
          "Otoscopic examination",
          "Pure-tone audiometry",
          "Speech recognition testing",
          "Detailed results explanation",
          "Personalized recommendations",
        ],
        sortOrder: 1,
        showOnHomepage: true,
        showInFooter: true,
      },
    }),
    prisma.service.upsert({
      where: { slug: "hearing-aid-solutions" },
      update: {},
      create: {
        slug: "hearing-aid-solutions",
        title: "Hearing Aid Solutions & Packages",
        shortDescription:
          "Independent hearing aid solutions with tiered packages tailored to your hearing, lifestyle, and needs.",
        fullDescription:
          "Independent hearing aid solutions with tiered packages tailored to your hearing, lifestyle, and needs.",
        duration: "60-90 minutes",
        iconName: "Headphones",
        features: [
          "Multiple package tiers available",
          "Personalized hearing aid selection",
          "Custom fitting and programming",
          "Real-ear measurements",
          "Trial period available",
          "Follow-up adjustments included",
        ],
        sortOrder: 2,
        showOnHomepage: true,
        showInFooter: true,
      },
    }),
    prisma.service.upsert({
      where: { slug: "ongoing-care" },
      update: {},
      create: {
        slug: "ongoing-care",
        title: "Ongoing Hearing Care",
        shortDescription:
          "Ongoing hearing care and follow-up services ensuring comfort, performance, and long-term hearing outcomes.",
        fullDescription:
          "Ongoing hearing care and follow-up services ensuring comfort, performance, and long-term hearing outcomes.",
        duration: "30-60 minutes",
        iconName: "Volume2",
        features: [
          "Regular hearing assessments",
          "Device adjustment and optimization",
          "Troubleshooting and support",
          "Device cleaning and maintenance",
          "Reprogramming services",
          "Long-term outcome monitoring",
        ],
        sortOrder: 3,
        showOnHomepage: true,
        showInFooter: true,
      },
    }),
    prisma.service.upsert({
      where: { slug: "earwax-removal" },
      update: {},
      create: {
        slug: "earwax-removal",
        title: "Ear Wax Removal",
        shortDescription:
          "Professional ear wax removal using safe clinical techniques for comfort, clarity, and immediate improvement.",
        fullDescription:
          "Professional ear wax removal using safe clinical techniques for comfort, clarity, and immediate improvement.",
        duration: "15-30 minutes",
        iconName: "Wrench",
        features: [
          "Safe clinical removal techniques",
          "Immediate relief and clarity",
          "Comfortable and professional care",
          "Prevention advice",
          "Same-day service available",
          "No waiting or complications",
        ],
        sortOrder: 4,
        showOnHomepage: true,
        showInFooter: true,
      },
    }),
  ]);

  console.log(`✅ Created ${services.length} services`);

  // Create admin user
  const adminPassword = await bcrypt.hash("admin!23", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@veritashearing.co.nz" },
    update: {},
    create: {
      email: "admin@veritashearing.co.nz",
      passwordHash: adminPassword,
      firstName: "Admin",
      lastName: "User",
      role: "ADMIN",
      phone: "",
    },
  });
  console.log(`✅ Created admin user: ${admin.email}`);

  // Create audiologists
  const audiologistPassword = await bcrypt.hash("audio!23", 12);
  const audiologists = await Promise.all([
    prisma.user.upsert({
      where: { email: "paul.hsu@veritashearing.co.nz" },
      update: {},
      create: {
        email: "paul.hsu@veritashearing.co.nz",
        passwordHash: audiologistPassword,
        firstName: "Paul",
        lastName: "Hsu",
        role: "AUDIOLOGIST",
        phone: "",
      },
    }),
    
  ]);

  console.log(`✅ Created ${audiologists.length} audiologists`);

  // Create availability for audiologists (Monday-Friday, 9 AM - 5 PM)
  for (const audiologist of audiologists) {
    for (let day = 1; day <= 5; day++) {
      // Monday = 1, Friday = 5
      await prisma.availability.upsert({
        where: {
          audiologistId_dayOfWeek: {
            audiologistId: audiologist.id,
            dayOfWeek: day,
          },
        },
        update: {},
        create: {
          audiologistId: audiologist.id,
          dayOfWeek: day,
          startTime: "09:00",
          endTime: "17:00",
          isAvailable: true,
        },
      });
    }
  }

  console.log(`✅ Created availability for ${audiologists.length} audiologists`);

  // Create a sample patient
  const patientPassword = await bcrypt.hash("patient123", 12);
  const patient = await prisma.user.upsert({
    where: { email: "john.smith@example.com" },
    update: {},
    create: {
      email: "john.smith@example.com",
      passwordHash: patientPassword,
      firstName: "John",
      lastName: "Smith",
      role: "PATIENT",
      phone: "(555) 200-0001",
      dateOfBirth: new Date("1980-05-15"),
    },
  });
  console.log(`✅ Created sample patient: ${patient.email}`);

  console.log("\n🎉 Database seeding completed!");
  console.log("\n📋 Test Credentials:");
  console.log("-------------------");
  console.log("Admin: admin@veritashearing.co.nz / admin!23");
  console.log("Audiologist: paul.hsu@veritashearing.co.nz / audio!23");
  console.log("Patient: john.smith@example.com / patient123");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
