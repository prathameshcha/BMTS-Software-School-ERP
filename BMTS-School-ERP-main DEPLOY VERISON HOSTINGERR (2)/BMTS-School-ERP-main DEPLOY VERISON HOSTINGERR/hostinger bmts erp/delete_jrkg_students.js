const { PrismaClient } = require('./backend/node_modules/@prisma/client');
const prisma = new PrismaClient();

async function deleteJrKGStudents() {
  console.log('=== Deleting all Jr.KG students ===\n');

  // Find Jr.KG class
  const jrkg = await prisma.class.findUnique({ where: { name: 'Jr.KG' } });
  if (!jrkg) { console.log('Jr.KG class not found!'); return; }

  // Find all enrollments for Jr.KG
  const enrollments = await prisma.studentEnrollment.findMany({
    where: { classId: jrkg.id },
    select: { studentId: true }
  });
  const studentIds = [...new Set(enrollments.map(e => e.studentId))];
  console.log(`Found ${studentIds.length} Jr.KG students to delete\n`);

  if (studentIds.length === 0) {
    console.log('No students found. Done.');
    await prisma.$disconnect();
    return;
  }

  // Get student details for logging
  const students = await prisma.student.findMany({
    where: { id: { in: studentIds } },
    select: { id: true, name: true, admissionNo: true, userId: true }
  });

  for (const s of students) {
    console.log(`  Deleting: ${s.name} (${s.admissionNo})`);

    // 1. Delete report card sections & assessments
    const rcs = await prisma.reportCard.findMany({ where: { studentId: s.id }, select: { id: true } });
    const rcIds = rcs.map(r => r.id);
    if (rcIds.length > 0) {
      await prisma.reportCardSection.deleteMany({ where: { reportCardId: { in: rcIds } } });
      await prisma.reportCardAssessment.deleteMany({ where: { reportCardId: { in: rcIds } } });
      await prisma.reportCardVersion.deleteMany({ where: { reportCardId: { in: rcIds } } });
    }

    // 2. Delete report cards
    await prisma.reportCard.deleteMany({ where: { studentId: s.id } });

    // 3. Delete marks
    await prisma.mark.deleteMany({ where: { studentId: s.id } });

    // 4. Delete attendance
    await prisma.attendance.deleteMany({ where: { studentId: s.id } });

    // 5. Delete enrollments
    await prisma.studentEnrollment.deleteMany({ where: { studentId: s.id } });

    // 6. Delete student record
    await prisma.student.delete({ where: { id: s.id } });

    // 7. Delete user account
    if (s.userId) {
      await prisma.user.delete({ where: { id: s.userId } });
    }
  }

  console.log(`\n✓ Deleted ${students.length} Jr.KG students completely!`);
  console.log('Ready for new Excel import.');

  await prisma.$disconnect();
}

deleteJrKGStudents().catch(e => { console.error(e); process.exit(1); });
