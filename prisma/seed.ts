import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data
  console.log('Clearing existing data...');
  await prisma.article.deleteMany();
  await prisma.teamMember.deleteMany();
  await prisma.service.deleteMany();
  await prisma.faq.deleteMany();
  await prisma.setting.deleteMany();

  // Seed Services
  console.log('Seeding services...');
  const services = await prisma.service.createMany({
    data: [
      {
        slug: 'hearing-assessments',
        title: 'Comprehensive Hearing Assessment',
        shortDescription:
          'A thorough, unhurried assessment to understand your hearing and how it affects daily life — with clear answers and no pressure.',
        fullDescription:
          'A thorough, unhurried assessment to understand your hearing and how it affects daily life — with clear answers and no pressure.',
        image: '/images/Comprehensive Hearing Assessment.jpg',
        iconName: 'Ear',
        features: [
          'Diagnostic hearing testing',
          'Speech-in-noise assessment',
          'Advanced middle ear assessment',
          'Clear explanation of results',
        ],
        sortOrder: 1,
        showOnHomepage: true,
        showInFooter: true,
        buttonText: 'Book Assessment',
        idealFor:
          "You've noticed changes, struggle in noise, or want a professional baseline check.",
        note: 'No obligation to proceed with treatment',
      },
      {
        slug: 'hearing-aid-solutions',
        title: 'Hearing Aid Solutions & Packages',
        shortDescription:
          'At Veritas Hearing, we separate care from technology. Choose the level of support that suits your needs, from Essential to Premium Care.',
        fullDescription:
          'At Veritas Hearing, we separate care from technology. You choose the level of support that suits your needs, from Essential to Premium Care. Hearing aid technology is selected independently based on your hearing, lifestyle, and preferences, so every recommendation is personalised and evidence-based.',
        iconName: 'Headphones',
        features: [
          'Personalisation & selection',
          'Fitting & verification',
          'Ongoing support & follow-up',
          'Long-term hearing health',
        ],
        buttonText: 'Explore More',
        sortOrder: 2,
        showOnHomepage: true,
        showInFooter: true,
      },
      {
        slug: 'ongoing-care',
        title: 'Hearing Review',
        shortDescription:
          'Comprehensive checks to ensure your hearing and hearing aids are performing at their best.',
        fullDescription:
          'Comprehensive checks to ensure your hearing and hearing aids are performing at their best.',
        image: '/images/Ongoing hearing care.jpg',
        iconName: 'Volume2',
        features: [
          'Ear wax removal',
          'Hearing assessment to check for changes',
          'Device comprehensive service',
          'Device performance check and verification',
          'Hearing aid fine-tuning',
          'Aided speech-in-noise testing',
          'New clients welcome',
        ],
        sortOrder: 3,
        showOnHomepage: true,
        showInFooter: true,
        buttonText: 'Book a Hearing Review',
        featureTooltips: {
          'Device comprehensive service':
            'parts renewal, cleaning, and moisture removal',
        },
      },
      {
        slug: 'earwax-removal',
        title: 'Wax Removal',
        shortDescription:
          'Safe, professional ear wax removal to restore comfort and optimise hearing aid performance.',
        fullDescription:
          'Safe, professional ear wax removal to restore comfort and optimise hearing aid performance.',
        iconName: 'Wrench',
        features: [
          'Microsuction removal of ear wax',
          'Live view of procedure',
          'Post-removal hearing screening',
          'Video of procedure available to take home',
        ],
        sortOrder: 4,
        showOnHomepage: true,
        showInFooter: true,
        buttonText: 'Book Wax Removal',
      },
    ],
  });
  console.log(`✅ Created ${services.count} services`);

  // Seed Team Members
  console.log('Seeding team members...');
  const teamMembers = await prisma.teamMember.createMany({
    data: [
      {
        slug: 'paul-hsu',
        name: 'Paul Hsu',
        title: 'Founder & Audiologist',
        credentials: 'MNZAS | ACC Approved | Veteran Affairs Approved',
        imageUrl: '/images/Paul Hsu.jpg',
        bio: 'At Veritas Hearing, I provide evidence-based, patient-focused hearing care tailored to your needs. From comprehensive hearing assessments to hearing aid fittings and long-term support, my goal is to help you achieve measurable improvements in everyday listening and communication. I combine advanced diagnostic tools, real-life outcome measures, premium hearing technologies, and personalised care plans to ensure every patient receives clear guidance and ongoing support.',
        specialisations: [
          'Comprehensive Hearing Assessments',
          'Hearing Aid Fitting & Optimisation',
          'Auditory Training (LACE AI)',
          'Long-term Hearing Care',
        ],
        email: 'paul.hsu@veritashearing.co.nz',
        sortOrder: 1,
        active: true,
      },
    ],
  });
  console.log(`✅ Created ${teamMembers.count} team members`);

  // Seed Articles
  console.log('Seeding articles...');
  const articles = await prisma.article.createMany({
    data: [
      {
        slug: 'understanding-types-of-hearing-loss',
        title: 'Understanding the Different Types of Hearing Loss',
        excerpt:
          'Learn about conductive, sensorineural, and mixed hearing loss, their causes, and treatment options.',
        category: 'Education',
        published: true,
        publishedAt: new Date('2024-01-15'),
        sortOrder: 1,
      },
      {
        slug: 'choosing-right-hearing-aid',
        title: 'How to Choose the Right Hearing Aid for Your Lifestyle',
        excerpt:
          'A guide to selecting hearing aids based on your daily activities, preferences, and hearing needs.',
        category: 'Hearing Aids',
        published: true,
        publishedAt: new Date('2024-02-20'),
        sortOrder: 2,
      },
      {
        slug: 'living-with-tinnitus',
        title: 'Living with Tinnitus: Coping Strategies That Work',
        excerpt:
          'Practical tips and treatments for managing tinnitus and improving your quality of life.',
        category: 'Tinnitus',
        published: true,
        publishedAt: new Date('2024-03-10'),
        sortOrder: 3,
      },
      {
        slug: 'protecting-your-hearing',
        title: 'Protecting Your Hearing: A Complete Guide',
        excerpt:
          'Everything you need to know about preventing noise-induced hearing loss at home and work.',
        category: 'Prevention',
        published: true,
        publishedAt: new Date('2024-04-05'),
        sortOrder: 4,
      },
    ],
  });
  console.log(`✅ Created ${articles.count} articles`);

  // Seed FAQs
  console.log('Seeding FAQs...');
  const faqs = await prisma.faq.createMany({
    data: [
      {
        question: 'What should I expect at my first appointment?',
        answer:
          'Your first visit includes a comprehensive hearing assessment, discussion of your concerns, and clear guidance on suitable solutions tailored to your needs.',
        sortOrder: 1,
        active: true,
      },
      {
        question: 'How do I know if I need a hearing test?',
        answer:
          'If you notice difficulty following conversations, frequently ask people to repeat themselves, or struggle in noisy environments, a hearing test can provide clarity and peace of mind.',
        sortOrder: 2,
        active: true,
      },
      {
        question: 'Why choose an independent audiologist?',
        answer:
          'As an independent clinic, we provide unbiased advice and recommendations, focusing solely on your hearing needs rather than promoting specific brands or products.',
        sortOrder: 3,
        active: true,
      },
      {
        question: 'What type of hearing aids do you offer?',
        answer:
          'We offer a range of hearing aids across multiple tiers chosen to suit your lifestyle, preferences, and hearing requirements.',
        sortOrder: 4,
        active: true,
      },
      {
        question: 'How much do hearing aids cost?',
        answer:
          'Hearing aid costs vary by technology and package. We provide clear, tiered options with transparent pricing to help you make informed decisions.',
        sortOrder: 5,
        active: true,
      },
      {
        question: 'Is there a trial period for hearing aids?',
        answer:
          'Yes. We offer a trial period so you can experience your hearing aids in real-life situations before making a final decision.',
        sortOrder: 6,
        active: true,
      },
      {
        question: 'How often should I have a hearing check?',
        answer:
          'Regular hearing checks are recommended at least once a year, or sooner if you notice changes, to ensure your hearing remains optimised.',
        sortOrder: 7,
        active: true,
      },
    ],
  });
  console.log(`✅ Created ${faqs.count} FAQs`);

  // Seed Settings
  console.log('Seeding settings...');
  await prisma.setting.upsert({
    where: { key: 'contactEmail' },
    update: { value: 'info@veritashearing.co.nz' },
    create: {
      key: 'contactEmail',
      value: 'info@veritashearing.co.nz',
    },
  });
  console.log('✅ Created settings');

  console.log('✅ Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
