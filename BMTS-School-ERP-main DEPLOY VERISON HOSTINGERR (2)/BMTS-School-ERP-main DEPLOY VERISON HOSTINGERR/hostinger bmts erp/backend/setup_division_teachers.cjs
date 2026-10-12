require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

const classConfigs = [
  { className: 'Jr.KG', prefix: 'jrkg', teacherA: 'Mrs. Meena Deshmukh', teacherB: 'Mrs. Rohini Shinde' },
  { className: 'Sr.KG', prefix: 'srkg', teacherA: 'Mrs. Priya Sharma', teacherB: 'Mrs. Sarita Gaikwad' },
  { className: '1st', prefix: '1', teacherA: 'Mrs. Sunita Patil', teacherB: 'Mrs. Kavita Jadhav' },
  { className: '2nd', prefix: '2', teacherA: 'Mrs. Anjali Shinde', teacherB: 'Mr. Rajesh Kulkarni' },
  { className: '3rd', prefix: '3', teacherA: 'Mr. Suresh More', teacherB: 'Mrs. Deepa Joshi' },
  { className: '4th', prefix: '4', teacherA: 'Mr. Amol Pawar', teacherB: 'Mrs. Pooja Gaikwad' },
  { className: '5th', prefix: '5', teacherA: 'Mr. Nitin Chavan', teacherB: 'Dr. Sanjay Bhosale' },
  { className: '6th', prefix: '6', teacherA: 'Mrs. Rekha Thorat', teacherB: 'Mr. Vikas Sonawane' },
  { className: '7th', prefix: '7', teacherA: 'Mrs. Swati Kale', teacherB: 'Mr. Tushar Nikam' },
  { className: '8th', prefix: '8', teacherA: 'Mrs. Manisha Deshpande', teacherB: 'Mr. Sachin Patil' },
  { className: '9th', prefix: '9', teacherA: 'Mrs. Vaishali Mane', teacherB: 'Mr. Prasad Kadam' },
  { className: '10th', prefix: '10', teacherA: 'Mrs. Ashwini Salunkhe', teacherB: 'Mr. Ganesh Wagh' },
];

async function main() {
  console.log('--- Step 1: Remove Division C and clean up Div C assignments ---');
  const divCs = await prisma.division.findMany({
    where: { name: 'C' },
    include: { _count: { select: { enrollments: true, assignments: true } } }
  });

  for (const div of divCs) {
    if (div._count.enrollments === 0) {
      // Remove assignments on Div C
      await prisma.teacherAssignment.deleteMany({ where: { divisionId: div.id } });
      await prisma.timetable.deleteMany({ where: { divisionId: div.id } });
      await prisma.attendance.deleteMany({ where: { divisionId: div.id } });
      await prisma.division.delete({ where: { id: div.id } });
      console.log(`Deleted Division C for classId: ${div.classId}`);
    } else {
      console.warn(`Division C has ${div._count.enrollments} enrollments! Skipping delete.`);
    }
  }

  console.log('\n--- Step 2: Ensure Division A & B exist for all classes ---');
  const classes = await prisma.class.findMany({ orderBy: { displayOrder: 'asc' } });
  const academicYears = await prisma.academicYear.findMany();
  const defaultPasswordHash = await bcrypt.hash('Teacher@123', 10);

  const teacherAccountsSummary = [];

  for (const config of classConfigs) {
    const cls = classes.find(c => c.name.toLowerCase() === config.className.toLowerCase());
    if (!cls) {
      console.warn(`Class ${config.className} not found in DB!`);
      continue;
    }

    // Ensure Division A
    let divA = await prisma.division.findFirst({ where: { classId: cls.id, name: 'A' } });
    if (!divA) {
      divA = await prisma.division.create({ data: { name: 'A', classId: cls.id } });
      console.log(`Created Division A for Class ${cls.name}`);
    }

    // Ensure Division B
    let divB = await prisma.division.findFirst({ where: { classId: cls.id, name: 'B' } });
    if (!divB) {
      divB = await prisma.division.create({ data: { name: 'B', classId: cls.id } });
      console.log(`Created Division B for Class ${cls.name}`);
    }

    // Fetch subjects for this class to link
    const subjects = await prisma.subject.findMany({ where: { classId: cls.id }, orderBy: { displayOrder: 'asc' } });
    const primarySubject = subjects[0] || null;

    // --- Configure Teacher for Division A ---
    const usernameA = `teacher_${config.prefix}a`;
    const emailA = `teacher.${config.prefix}a@mtfschool.edu`;
    const userA = await prisma.user.upsert({
      where: { username: usernameA },
      update: {
        passwordHash: defaultPasswordHash,
        status: 'ACTIVE',
        role: 'FACULTY',
      },
      create: {
        username: usernameA,
        email: emailA,
        passwordHash: defaultPasswordHash,
        role: 'FACULTY',
        status: 'ACTIVE',
      }
    });

    let teacherObjA = await prisma.teacher.findUnique({ where: { userId: userA.id } });
    if (!teacherObjA) {
      teacherObjA = await prisma.teacher.create({
        data: {
          userId: userA.id,
          name: config.teacherA,
          department: 'Primary/Secondary',
          qualification: 'B.Ed / M.A',
          canFinalizeReportCards: true
        }
      });
    } else {
      await prisma.teacher.update({
        where: { id: teacherObjA.id },
        data: { name: config.teacherA, canFinalizeReportCards: true }
      });
    }

    // Assign Teacher A to Class + Div A for all academic years
    for (const ay of academicYears) {
      if (primarySubject) {
        await prisma.teacherAssignment.upsert({
          where: {
            teacherId_classId_divisionId_subjectId_academicYearId: {
              teacherId: teacherObjA.id,
              classId: cls.id,
              divisionId: divA.id,
              subjectId: primarySubject.id,
              academicYearId: ay.id
            }
          },
          update: {},
          create: {
            teacherId: teacherObjA.id,
            classId: cls.id,
            divisionId: divA.id,
            subjectId: primarySubject.id,
            academicYearId: ay.id
          }
        });
      }
    }

    teacherAccountsSummary.push({
      class: cls.name,
      division: 'A',
      name: config.teacherA,
      username: usernameA,
      password: 'Teacher@123'
    });

    // --- Configure Teacher for Division B ---
    const usernameB = `teacher_${config.prefix}b`;
    const emailB = `teacher.${config.prefix}b@mtfschool.edu`;
    const userB = await prisma.user.upsert({
      where: { username: usernameB },
      update: {
        passwordHash: defaultPasswordHash,
        status: 'ACTIVE',
        role: 'FACULTY',
      },
      create: {
        username: usernameB,
        email: emailB,
        passwordHash: defaultPasswordHash,
        role: 'FACULTY',
        status: 'ACTIVE',
      }
    });

    let teacherObjB = await prisma.teacher.findUnique({ where: { userId: userB.id } });
    if (!teacherObjB) {
      teacherObjB = await prisma.teacher.create({
        data: {
          userId: userB.id,
          name: config.teacherB,
          department: 'Primary/Secondary',
          qualification: 'B.Ed / M.Sc',
          canFinalizeReportCards: true
        }
      });
    } else {
      await prisma.teacher.update({
        where: { id: teacherObjB.id },
        data: { name: config.teacherB, canFinalizeReportCards: true }
      });
    }

    // Assign Teacher B to Class + Div B for all academic years
    for (const ay of academicYears) {
      if (primarySubject) {
        await prisma.teacherAssignment.upsert({
          where: {
            teacherId_classId_divisionId_subjectId_academicYearId: {
              teacherId: teacherObjB.id,
              classId: cls.id,
              divisionId: divB.id,
              subjectId: primarySubject.id,
              academicYearId: ay.id
            }
          },
          update: {},
          create: {
            teacherId: teacherObjB.id,
            classId: cls.id,
            divisionId: divB.id,
            subjectId: primarySubject.id,
            academicYearId: ay.id
          }
        });
      }
    }

    teacherAccountsSummary.push({
      class: cls.name,
      division: 'B',
      name: config.teacherB,
      username: usernameB,
      password: 'Teacher@123'
    });
  }

  console.log('\n--- SETUP COMPLETED SUCCESSFULLY ---');
  console.log('Configured ' + teacherAccountsSummary.length + ' division teacher accounts.\n');
  console.table(teacherAccountsSummary);
}

main().catch(console.error).finally(() => prisma.$disconnect());
