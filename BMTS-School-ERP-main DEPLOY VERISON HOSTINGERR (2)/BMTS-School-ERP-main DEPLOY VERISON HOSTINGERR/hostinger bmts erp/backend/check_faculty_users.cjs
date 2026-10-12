const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkFaculty() {
  const teachers = await prisma.teacher.findMany({
    take: 5,
    include: {
      user: true,
      assignments: {
        include: { class: true, division: true, subject: true, academicYear: true }
      }
    }
  });
  console.log(JSON.stringify(teachers.map(t => ({
    name: t.name,
    username: t.user?.username,
    email: t.user?.email,
    assignments: t.assignments.map(a => `${a.class?.name}-${a.division?.name}: ${a.subject?.name} (${a.academicYear?.name})`)
  })), null, 2));
}

checkFaculty().catch(console.error).finally(() => prisma.$disconnect());
