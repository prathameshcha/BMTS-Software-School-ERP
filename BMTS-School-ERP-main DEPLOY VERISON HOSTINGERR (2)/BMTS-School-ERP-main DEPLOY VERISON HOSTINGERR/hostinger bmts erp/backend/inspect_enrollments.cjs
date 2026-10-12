require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function inspectEnrollments() {
  const classes = await prisma.class.findMany({
    orderBy: { displayOrder: 'asc' },
    include: {
      divisions: {
        include: {
          enrollments: {
            include: { academicYear: true }
          }
        }
      }
    }
  });

  for (const c of classes) {
    console.log(`\nClass: ${c.name}`);
    for (const d of c.divisions) {
      const countsByYear = {};
      for (const e of d.enrollments) {
        const yName = e.academicYear?.name || 'Unknown';
        countsByYear[yName] = (countsByYear[yName] || 0) + 1;
      }
      console.log(`  Div: ${d.name} -> total: ${d.enrollments.length}, by year: ${JSON.stringify(countsByYear)}`);
    }
  }
}

inspectEnrollments().catch(console.error).finally(() => prisma.$disconnect());
