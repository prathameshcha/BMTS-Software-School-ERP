import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function cleanupStudents() {
  const students = await prisma.student.findMany({
    include: {
      enrollments: true
    }
  });

  const keptPerClass = new Set();
  const toDeleteIds = [];

  for (const s of students) {
    if (s.enrollments.length > 0) {
      const classId = s.enrollments[0].classId;
      if (!keptPerClass.has(classId)) {
        keptPerClass.add(classId); // Keep this student
      } else {
        toDeleteIds.push(s.id);
      }
    } else {
      toDeleteIds.push(s.id); // Delete unenrolled students too
    }
  }

  console.log(`Found ${students.length} students. Keeping ${keptPerClass.size}, deleting ${toDeleteIds.length}.`);

  if (toDeleteIds.length > 0) {
    // Delete in chunks if many, but sqlite handles small batches fine.
    await prisma.student.deleteMany({
      where: {
        id: { in: toDeleteIds }
      }
    });
  }

  console.log('Cleanup complete.');
}

cleanupStudents()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
