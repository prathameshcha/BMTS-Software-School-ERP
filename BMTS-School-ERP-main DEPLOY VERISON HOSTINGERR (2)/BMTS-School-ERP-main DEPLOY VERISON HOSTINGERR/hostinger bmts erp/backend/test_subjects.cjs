const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testSubjectQueries() {
  const classes = await prisma.class.findMany({ orderBy: { displayOrder: 'asc' } });
  const jrKg = classes[0];
  console.log('First class:', jrKg.name, 'id:', jrKg.id);

  const jrKgSubjects = await prisma.subject.findMany({
    where: { classId: jrKg.id },
    orderBy: { displayOrder: 'asc' }
  });
  console.log(`Subjects for Class ${jrKg.name} (${jrKgSubjects.length}):`, jrKgSubjects.map(s => s.name));

  const secondClass = classes[1];
  const secondClassSubjects = await prisma.subject.findMany({
    where: { classId: secondClass.id },
    orderBy: { displayOrder: 'asc' }
  });
  console.log(`Subjects for Class ${secondClass.name} (${secondClassSubjects.length}):`, secondClassSubjects.map(s => s.name));
}

testSubjectQueries().catch(console.error).finally(() => prisma.$disconnect());
