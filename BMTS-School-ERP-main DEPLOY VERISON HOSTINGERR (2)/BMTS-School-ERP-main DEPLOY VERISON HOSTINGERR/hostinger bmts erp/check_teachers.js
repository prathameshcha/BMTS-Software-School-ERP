const { PrismaClient } = require('./backend/node_modules/@prisma/client');
const prisma = new PrismaClient();

async function check() {
  // Check if any teachers exist
  const userCount = await prisma.user.count({ where: { role: 'FACULTY' } });
  console.log('Total FACULTY users:', userCount);

  // Check specific teacher
  const teacher3b = await prisma.user.findUnique({ 
    where: { email: 'teacher.3b@mtfschool.edu' },
    select: { id: true, email: true, username: true, role: true, status: true }
  });
  console.log('teacher.3b:', teacher3b);

  // Check admin
  const admin = await prisma.user.findFirst({ 
    where: { role: 'ADMIN' },
    select: { id: true, email: true, username: true, role: true, status: true }
  });
  console.log('Admin:', admin);

  // List all faculty
  const allFaculty = await prisma.user.findMany({
    where: { role: 'FACULTY' },
    select: { email: true, username: true, status: true }
  });
  console.log('All faculty:', allFaculty);

  await prisma.$disconnect();
}

check().catch(e => { console.error(e); process.exit(1); });
