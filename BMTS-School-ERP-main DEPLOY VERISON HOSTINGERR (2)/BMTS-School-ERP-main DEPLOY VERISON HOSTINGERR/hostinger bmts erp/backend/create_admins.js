const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdmins() {
  const hash = await bcrypt.hash('Admin@123', 10);
  
  for (let i = 2; i <= 4; i++) {
    const email = `admin${i}@mtfschool.edu`;
    const username = `admin${i}`;
    
    await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        username,
        passwordHash: hash,
        role: 'ADMIN',
        admin: {
          create: {
            name: `Admin ${i}`
          }
        }
      }
    });
    console.log(`Created: ${email}`);
  }
  
  console.log("Done");
  await prisma.$disconnect();
}

createAdmins().catch(e => {
  console.error(e);
  process.exit(1);
});
