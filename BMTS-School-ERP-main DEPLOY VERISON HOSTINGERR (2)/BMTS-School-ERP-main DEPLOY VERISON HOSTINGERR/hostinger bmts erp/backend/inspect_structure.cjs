require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function inspectStructure() {
  const classes = await prisma.class.findMany({
    orderBy: { displayOrder: 'asc' },
    include: {
      divisions: {
        include: {
          _count: {
            select: { enrollments: true, assignments: true }
          }
        }
      }
    }
  });

  console.log('--- CLASSES & DIVISIONS ---');
  for (const c of classes) {
    console.log(`Class: ${c.name} (id: ${c.id})`);
    for (const d of c.divisions) {
      console.log(`   Div: ${d.name} (id: ${d.id}) -> enrollments: ${d._count.enrollments}, assignments: ${d._count.assignments}`);
    }
  }

  const teachers = await prisma.teacher.findMany({
    include: {
      user: { select: { username: true, email: true, status: true } },
      assignments: {
        include: { class: true, division: true, subject: true, academicYear: true }
      }
    }
  });

  console.log('\n--- EXISTING TEACHERS --- (Total: ' + teachers.length + ')');
  for (const t of teachers) {
    console.log(`Teacher: ${t.name} | Username: ${t.user?.username} | Assignments: ${t.assignments.length}`);
    for (const a of t.assignments) {
      console.log(`   -> Class: ${a.class?.name}, Div: ${a.division?.name}, Sub: ${a.subject?.name}, AY: ${a.academicYear?.name}`);
    }
  }
}

inspectStructure().catch(console.error).finally(() => prisma.$disconnect());
