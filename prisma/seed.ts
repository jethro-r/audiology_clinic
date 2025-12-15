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

  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@hearwell.com" },
    update: {},
    create: {
      email: "admin@hearwell.com",
      passwordHash: adminPassword,
      firstName: "Admin",
      lastName: "User",
      role: "ADMIN",
      phone: "(555) 100-0001",
    },
  });
  console.log(`✅ Created admin user: ${admin.email}`);

  // Create audiologists
  const audiologistPassword = await bcrypt.hash("doctor123", 12);
  const audiologists = await Promise.all([
    prisma.user.upsert({
      where: { email: "sarah.chen@hearwell.com" },
      update: {},
      create: {
        email: "sarah.chen@hearwell.com",
        passwordHash: audiologistPassword,
        firstName: "Sarah",
        lastName: "Chen",
        role: "AUDIOLOGIST",
        phone: "(555) 100-0002",
      },
    }),
    prisma.user.upsert({
      where: { email: "michael.torres@hearwell.com" },
      update: {},
      create: {
        email: "michael.torres@hearwell.com",
        passwordHash: audiologistPassword,
        firstName: "Michael",
        lastName: "Torres",
        role: "AUDIOLOGIST",
        phone: "(555) 100-0003",
      },
    }),
    prisma.user.upsert({
      where: { email: "emily.watson@hearwell.com" },
      update: {},
      create: {
        email: "emily.watson@hearwell.com",
        passwordHash: audiologistPassword,
        firstName: "Emily",
        lastName: "Watson",
        role: "AUDIOLOGIST",
        phone: "(555) 100-0004",
      },
    }),
    prisma.user.upsert({
      where: { email: "james.park@hearwell.com" },
      update: {},
      create: {
        email: "james.park@hearwell.com",
        passwordHash: audiologistPassword,
        firstName: "James",
        lastName: "Park",
        role: "AUDIOLOGIST",
        phone: "(555) 100-0005",
      },
    }),
  ]);

  console.log(`✅ Created ${audiologists.length} audiologists`);

  // Create receptionist
  const receptionistPassword = await bcrypt.hash("reception123", 12);
  const receptionist = await prisma.user.upsert({
    where: { email: "reception@hearwell.com" },
    update: {},
    create: {
      email: "reception@hearwell.com",
      passwordHash: receptionistPassword,
      firstName: "Reception",
      lastName: "Desk",
      role: "RECEPTIONIST",
      phone: "(555) 100-0006",
    },
  });
  console.log(`✅ Created receptionist: ${receptionist.email}`);

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
  console.log("Admin: admin@hearwell.com / admin123");
  console.log("Audiologist: sarah.chen@hearwell.com / doctor123");
  console.log("Receptionist: reception@hearwell.com / reception123");
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
