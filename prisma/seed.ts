import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const userPassword = await bcrypt.hash('password123', 10);
  
  // Create admin
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN',
      status: 'ACTIVE'
    }
  });

  // Create freelancer
  await prisma.user.upsert({
    where: { email: 'freelancer@example.com' },
    update: {},
    create: {
      email: 'freelancer@example.com',
      name: 'John Doe',
      password: userPassword,
      role: 'FREELANCER',
      status: 'ACTIVE',
      profile: {
        create: {
          bio: 'Experienced full-stack developer',
          skills: 'React,Node.js,TypeScript',
          hourlyRate: 50,
          location: 'New York, USA'
        }
      }
    }
  });

  // Create client
  await prisma.user.upsert({
    where: { email: 'client@example.com' },
    update: {},
    create: {
      email: 'client@example.com',
      name: 'Jane Smith',
      password: userPassword,
      role: 'CLIENT',
      status: 'ACTIVE',
      profile: {
        create: {
          bio: 'Tech startup founder',
          website: 'https://techcorp.com',
          location: 'San Francisco, USA'
        }
      }
    }
  });

  console.log('Database seeded!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 
