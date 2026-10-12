import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const KG_CLASSES = ['Jr.KG', 'Sr.KG'];
const ALL_CLASS_NAMES = ['Jr.KG', 'Sr.KG', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th'];
const DIVISIONS = ['A', 'B'];

// Jr.KG and Sr.KG only have Division A (1 teacher each)
const KG_DIVISIONS = ['A'];
// 1st to 10th have Division A & B (2 teachers each = 20 teachers + 2 KG = 22 total)
const PRIMARY_DIVISIONS = ['A', 'B'];

const JR_KG_SUBJECTS = [
  'English Reading', 'English Writing', 'English Recitation',
  'Hindi', 'Maths (Numeracy)',
  'Environment Studies', 'Social Emotional', 'Drawing'
];

const SR_KG_SUBJECTS = [
  'English Reading', 'English Writing', 'English Recitation',
  'Hindi', 'Marathi', 'Maths (Numeracy)',
  'Environment Studies', 'Social Emotional', 'Drawing'
];

const STD_1_AND_2_SUBJECTS = ['English', 'Hindi', 'Marathi', 'Maths', 'G.Science', 'So.Science', 'Drawing', 'Computer'];
const STD_3_TO_7_SUBJECTS = ['English', 'Hindi', 'Marathi', 'Maths', 'G.Science', 'So.Science', 'Art', 'Computer', 'Phy.Edu.', 'G.K & Value Edu.'];
const STD_8_SUBJECTS = ['English', 'Hindi', 'Marathi', 'Math', 'G.Science', 'So.Science', 'Health & Physical Education', 'G.K/LBV', 'Computer', 'Art'];
const STD_9_AND_10_SUBJECTS = ['English', 'Hindi', 'Marathi', 'Math I & II', 'Science & Technology', 'So.Science', 'Health & Physical Education', 'Self Development & Art Appriciation', 'Water Security'];

const PRIMARY_SUBJECTS_BY_CLASS: Record<string, string[]> = {
  '1st':  STD_1_AND_2_SUBJECTS,
  '2nd':  STD_1_AND_2_SUBJECTS,
  '3rd':  STD_3_TO_7_SUBJECTS,
  '4th':  STD_3_TO_7_SUBJECTS,
  '5th':  STD_3_TO_7_SUBJECTS,
  '6th':  STD_3_TO_7_SUBJECTS,
  '7th':  STD_3_TO_7_SUBJECTS,
  '8th':  STD_8_SUBJECTS,
  '9th':  STD_9_AND_10_SUBJECTS,
  '10th': STD_9_AND_10_SUBJECTS,
};

// All classes have Division A and Division B
const ALL_DIVISIONS = ['A', 'B'];

// Helper: get divisions for a class (all classes now have A and B)
function getDivisionsForClass(_className: string): string[] {
  return ALL_DIVISIONS;
}

// 24 Teachers — 1 teacher per division across all 12 classes (Jr.KG to 10th, Div A & B each)
const ALL_TEACHERS = [
  // Jr.KG — A & B
  { className: 'Jr.KG', division: 'A', email: 'teacher.jrkg.a@mtfschool.edu', username: 'teacher_jrkg_a', name: 'Mrs. Meena Deshmukh',   phone: '9820010001', department: 'Pre-Primary',   qualification: 'B.A., D.Ed.' },
  { className: 'Jr.KG', division: 'B', email: 'teacher.jrkg.b@mtfschool.edu', username: 'teacher_jrkg_b', name: 'Mrs. Rohini Shinde',   phone: '9820010023', department: 'Pre-Primary',   qualification: 'M.A., Montessori' },
  // Sr.KG — A & B
  { className: 'Sr.KG', division: 'A', email: 'teacher.srkg.a@mtfschool.edu', username: 'teacher_srkg_a', name: 'Mrs. Priya Sharma',     phone: '9820010002', department: 'Pre-Primary',   qualification: 'M.A., Montessori' },
  { className: 'Sr.KG', division: 'B', email: 'teacher.srkg.b@mtfschool.edu', username: 'teacher_srkg_b', name: 'Mrs. Sarita Gaikwad',  phone: '9820010024', department: 'Pre-Primary',   qualification: 'B.A., D.Ed.' },
  // 1st — A & B
  { className: '1st', division: 'A', email: 'teacher.1a@mtfschool.edu',  username: 'teacher_1a',  name: 'Mrs. Sunita Patil',     phone: '9820010003', department: 'Primary',       qualification: 'B.Sc., B.Ed.' },
  { className: '1st', division: 'B', email: 'teacher.1b@mtfschool.edu',  username: 'teacher_1b',  name: 'Mrs. Kavita Jadhav',    phone: '9820010004', department: 'Primary',       qualification: 'M.Sc., B.Ed.' },
  // 2nd — A & B
  { className: '2nd', division: 'A', email: 'teacher.2a@mtfschool.edu',  username: 'teacher_2a',  name: 'Mrs. Anjali Shinde',    phone: '9820010005', department: 'Primary',       qualification: 'B.A., B.Ed.' },
  { className: '2nd', division: 'B', email: 'teacher.2b@mtfschool.edu',  username: 'teacher_2b',  name: 'Mr. Rajesh Kulkarni',   phone: '9820010006', department: 'Primary',       qualification: 'M.A., B.Ed.' },
  // 3rd — A & B
  { className: '3rd', division: 'A', email: 'teacher.3a@mtfschool.edu',  username: 'teacher_3a',  name: 'Mr. Suresh More',       phone: '9820010007', department: 'Primary',       qualification: 'B.Sc., M.Ed.' },
  { className: '3rd', division: 'B', email: 'teacher.3b@mtfschool.edu',  username: 'teacher_3b',  name: 'Mrs. Deepa Joshi',      phone: '9820010008', department: 'Primary',       qualification: 'M.A., B.Ed.' },
  // 4th — A & B
  { className: '4th', division: 'A', email: 'teacher.4a@mtfschool.edu',  username: 'teacher_4a',  name: 'Mr. Amol Pawar',        phone: '9820010009', department: 'Primary',       qualification: 'M.Sc., B.Ed.' },
  { className: '4th', division: 'B', email: 'teacher.4b@mtfschool.edu',  username: 'teacher_4b',  name: 'Mrs. Pooja Gaikwad',    phone: '9820010010', department: 'Primary',       qualification: 'B.A., M.Ed.' },
  // 5th — A & B
  { className: '5th', division: 'A', email: 'teacher.5a@mtfschool.edu',  username: 'teacher_5a',  name: 'Mr. Nitin Chavan',      phone: '9820010011', department: 'Middle School',  qualification: 'M.Sc., B.Ed.' },
  { className: '5th', division: 'B', email: 'teacher.5b@mtfschool.edu',  username: 'teacher_5b',  name: 'Dr. Sanjay Bhosale',    phone: '9820010012', department: 'Middle School',  qualification: 'Ph.D., M.Ed.' },
  // 6th — A & B
  { className: '6th', division: 'A', email: 'teacher.6a@mtfschool.edu',  username: 'teacher_6a',  name: 'Mrs. Rekha Thorat',     phone: '9820010013', department: 'Middle School',  qualification: 'M.A., B.Ed.' },
  { className: '6th', division: 'B', email: 'teacher.6b@mtfschool.edu',  username: 'teacher_6b',  name: 'Mr. Vikas Sonawane',    phone: '9820010014', department: 'Middle School',  qualification: 'B.Sc., B.Ed.' },
  // 7th — A & B
  { className: '7th', division: 'A', email: 'teacher.7a@mtfschool.edu',  username: 'teacher_7a',  name: 'Mrs. Swati Kale',       phone: '9820010015', department: 'Middle School',  qualification: 'M.Sc., B.Ed.' },
  { className: '7th', division: 'B', email: 'teacher.7b@mtfschool.edu',  username: 'teacher_7b',  name: 'Mr. Tushar Nikam',      phone: '9820010016', department: 'Middle School',  qualification: 'B.A., M.Ed.' },
  // 8th — A & B
  { className: '8th', division: 'A', email: 'teacher.8a@mtfschool.edu',  username: 'teacher_8a',  name: 'Mrs. Manisha Deshpande',phone: '9820010017', department: 'Secondary',     qualification: 'M.A., B.Ed.' },
  { className: '8th', division: 'B', email: 'teacher.8b@mtfschool.edu',  username: 'teacher_8b',  name: 'Mr. Sachin Patil',      phone: '9820010018', department: 'Secondary',     qualification: 'M.Sc., B.Ed.' },
  // 9th — A & B
  { className: '9th', division: 'A', email: 'teacher.9a@mtfschool.edu',  username: 'teacher_9a',  name: 'Mrs. Vaishali Mane',    phone: '9820010019', department: 'Secondary',     qualification: 'M.Sc., B.Ed.' },
  { className: '9th', division: 'B', email: 'teacher.9b@mtfschool.edu',  username: 'teacher_9b',  name: 'Mr. Prasad Kadam',      phone: '9820010020', department: 'Secondary',     qualification: 'M.A., M.Ed.' },
  // 10th — A & B
  { className: '10th', division: 'A', email: 'teacher.10a@mtfschool.edu', username: 'teacher_10a', name: 'Mrs. Ashwini Salunkhe', phone: '9820010021', department: 'Secondary',     qualification: 'M.Sc., B.Ed.' },
  { className: '10th', division: 'B', email: 'teacher.10b@mtfschool.edu', username: 'teacher_10b', name: 'Mr. Ganesh Wagh',       phone: '9820010022', department: 'Secondary',     qualification: 'Ph.D., M.Ed.' },
];

// Student First & Last names template
const FIRST_NAMES = [
  'Aarav', 'Aditi', 'Rahul', 'Pooja', 'Rohan', 
  'Sneha', 'Arjun', 'Tanvi', 'Omkar', 'Ananya',
  'Sahil', 'Riya', 'Vedant', 'Isha', 'Atharva',
  'Gauri', 'Pranav', 'Shreya', 'Siddharth', 'Bhavna'
];

const LAST_NAMES = [
  'Deshmukh', 'Sharma', 'Verma', 'Patil', 'Shinde',
  'Kulkarni', 'Desai', 'Joshi', 'More', 'Pawar',
  'Gaikwad', 'Bhosale', 'Jadhav', 'Chavan', 'Wagh',
  'Suryavanshi', 'Kadam', 'Bonde', 'Salunkhe', 'Mane'
];

const OCCUPATIONS = [
  'Business Owner', 'Software Engineer', 'Teacher', 'Farmer',
  'Doctor', 'Government Officer', 'Bank Manager', 'Civil Engineer',
  'Homemaker', 'Accountant', 'Professor', 'Advocate'
];

const BLOOD_GROUPS = ['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-'];

async function main() {
  console.log('═══════════════════════════════════════════════');
  console.log('  Bharat Ratna Mother Teresa English School');
  console.log('  Full Database Seed — 12 Classes, 120 Students');
  console.log('  Report Cards for All + Teaching Logs + Attendance');
  console.log('═══════════════════════════════════════════════');

  // ── Settings ──────────────────────────────────────────────
  const existingSettings = await prisma.schoolSettings.findFirst();
  const settingsData = {
    schoolName: 'Bharat Ratna Mother Teresa English School',
    address: 'Gangapur Dist. Chha. Sambhajinagar - 431109',
    phone: '+91 9876543210',
    email: 'contact@mtfschool.edu',
    principalName: 'Dr. S. K. Sharma',
    hmName: 'Mrs. A. R. Kulkarni',
    motto: 'Education for Excellence',
  };
  if (existingSettings) {
    await prisma.schoolSettings.update({ where: { id: existingSettings.id }, data: settingsData });
  } else {
    await prisma.schoolSettings.create({ data: settingsData });
  }
  console.log('✓ School settings updated');

  // ── Admin User ────────────────────────────────────────────
  const adminHash = await bcrypt.hash('Admin@123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@mtfschool.edu' },
    update: { passwordHash: adminHash, status: 'ACTIVE' },
    create: {
      email: 'admin@mtfschool.edu', username: 'admin', passwordHash: adminHash,
      role: 'ADMIN', status: 'ACTIVE',
      admin: { create: { name: 'Super Admin', phone: '0000000000' } }
    }
  });
  console.log('✓ Admin user ready (admin@mtfschool.edu / Admin@123)');

  // ── Academic Year ─────────────────────────────────────────
  let ay = await prisma.academicYear.findUnique({ where: { name: '2026-2027' } });
  if (!ay) {
    ay = await prisma.academicYear.create({
      data: { name: '2026-2027', startDate: new Date('2026-06-15'), endDate: new Date('2027-04-30'), isActive: true }
    });
  }
  console.log(`✓ Academic Year: ${ay.name}`);

  // ── Classes, Divisions, Subjects ─────────────────────────
  const classMap: Record<string, string> = {};
  const divisionMap: Record<string, string> = {};
  const subjectsMap: Record<string, any[]> = {};

  for (let i = 0; i < ALL_CLASS_NAMES.length; i++) {
    const name = ALL_CLASS_NAMES[i];
    const isKG = KG_CLASSES.includes(name);

    const usesKGTemplate = isKG || ['1st', '2nd'].includes(name);

    let cls = await prisma.class.findUnique({ where: { name } });
    if (!cls) {
      cls = await prisma.class.create({
        data: {
          name,
          displayOrder: i + 1,
          reportCardTemplate: usesKGTemplate ? 'KG' : 'PRIMARY_SECONDARY'
        }
      });
    } else {
      await prisma.class.update({
        where: { id: cls.id },
        data: { displayOrder: i + 1, reportCardTemplate: usesKGTemplate ? 'KG' : 'PRIMARY_SECONDARY' }
      });
    }
    classMap[name] = cls.id;

    // Divisions — KG gets only A; 1st–10th get A & B
    const classDivisions = getDivisionsForClass(name);
    for (const divName of classDivisions) {
      const divExists = await prisma.division.findUnique({
        where: { classId_name: { classId: cls.id, name: divName } }
      });
      let div;
      if (!divExists) {
        div = await prisma.division.create({ data: { name: divName, classId: cls.id } });
      } else {
        div = divExists;
      }
      divisionMap[`${name}|${divName}`] = div.id;
    }

    // Subjects
    const subjects = name === 'Jr.KG' ? JR_KG_SUBJECTS : name === 'Sr.KG' ? SR_KG_SUBJECTS : (PRIMARY_SUBJECTS_BY_CLASS[name] || []);
    subjectsMap[name] = [];
    for (let subIdx = 0; subIdx < subjects.length; subIdx++) {
      const subName = subjects[subIdx];
      let sub = await prisma.subject.findUnique({
        where: { classId_name: { classId: cls.id, name: subName } }
      });
      if (!sub) {
        sub = await prisma.subject.create({
          data: { name: subName, classId: cls.id, maxMarks: 100, passingMarks: 35, displayOrder: subIdx + 1 }
        });
      }
      subjectsMap[name].push(sub);
    }

    console.log(`  ✓ Class ${name} — Divs: ${classDivisions.join(',')} — Subjects: ${subjects.length}`);
  }

  // ── 22 Teachers ───────────────────────────────────────────
  const facultyHash = await bcrypt.hash('Faculty@123', 10);
  const teacherIdMap: Record<string, string> = {}; // key: "className|division"

  for (const td of ALL_TEACHERS) {
    const u = await prisma.user.upsert({
      where: { email: td.email },
      update: { passwordHash: facultyHash, status: 'ACTIVE' },
      create: {
        email: td.email,
        username: td.username,
        passwordHash: facultyHash,
        role: 'FACULTY',
        status: 'ACTIVE',
        teacher: {
          create: {
            name: td.name,
            phone: td.phone,
            department: td.department,
            qualification: td.qualification,
            canFinalizeReportCards: true
          }
        }
      },
      include: { teacher: true }
    });

    if (u.teacher) {
      teacherIdMap[`${td.className}|${td.division}`] = u.teacher.id;
    }
  }
  console.log(`✓ ${ALL_TEACHERS.length} Faculty accounts ready (Password: Faculty@123)`);

  // ── Assign Teachers — each to their OWN class+division only ──
  for (const td of ALL_TEACHERS) {
    const cId = classMap[td.className];
    const tId = teacherIdMap[`${td.className}|${td.division}`];
    if (!cId || !tId) continue;

    const firstSub = subjectsMap[td.className]?.[0];
    if (!firstSub) continue;

    const dId = divisionMap[`${td.className}|${td.division}`];
    if (!dId) continue;

    const exists = await prisma.teacherAssignment.findFirst({
      where: { teacherId: tId, classId: cId, divisionId: dId, academicYearId: ay.id }
    });
    if (!exists) {
      await prisma.teacherAssignment.create({
        data: { teacherId: tId, classId: cId, divisionId: dId, subjectId: firstSub.id, academicYearId: ay.id }
      });
    }
  }
  console.log(`✓ ${ALL_TEACHERS.length} Teachers — each assigned to their own class & division only`);

  // ── Grade Rules ───────────────────────────────────────────
  const gradeRules = [
    { name: 'A+', minPercentage: 90, maxPercentage: 100, displayOrder: 1 },
    { name: 'A',  minPercentage: 80, maxPercentage: 89.99, displayOrder: 2 },
    { name: 'B+', minPercentage: 70, maxPercentage: 79.99, displayOrder: 3 },
    { name: 'B',  minPercentage: 60, maxPercentage: 69.99, displayOrder: 4 },
    { name: 'C',  minPercentage: 50, maxPercentage: 59.99, displayOrder: 5 },
    { name: 'D',  minPercentage: 35, maxPercentage: 49.99, displayOrder: 6 },
    { name: 'E',  minPercentage: 0,  maxPercentage: 34.99, displayOrder: 7 },
  ];

  for (const gr of gradeRules) {
    const existing = await prisma.gradeRule.findFirst({ where: { name: gr.name } });
    if (!existing) {
      await prisma.gradeRule.create({ data: gr });
    }
  }
  console.log('✓ Grade rules configured');

  // ── 10 Students for Each of 12 Classes (120 Students Total) ──
  const studentHash = await bcrypt.hash('Student@123', 10);
  let totalStudentsCreated = 0;
  let totalReportCardsCreated = 0;

  const sampleRemarks = {
    A: {
      prog: 'Demonstrates excellent motor coordination and active physical agility.\nMaintains good posture and clean hygiene habits.',
      chal: 'Encouraged to practice daily physical exercises.\nNeeds continued attention to neat paper craft.'
    },
    B: {
      prog: 'Helpful and polite towards teachers and classmates.\nShares learning materials willingly with peers.',
      chal: 'Encouraged to express opinions more assertively.\nPractice active listening during group games.'
    },
    C: {
      prog: 'Quick grasp of logical patterns and core mathematical concepts.\nCurious and observant during science and nature topics.',
      chal: 'Needs more practice with multi-step problem solving.\nEncourage asking questions when in doubt.'
    },
    D: {
      prog: 'Fluent oral reading and clear recitation of poems in English and Marathi.\nNeat, legible handwriting with good spacing.',
      chal: 'Daily oral reading practice recommended at home.\nExpand sentence vocabulary in creative writing.'
    },
    E: {
      prog: 'Creative imagination shown in coloring, art, and craft models.\nActive and joyful participation in singing and dance.',
      chal: 'Encouraged to try new color blending techniques.\nEnhance stage confidence in group drama.'
    },
  };

  for (let cIdx = 0; cIdx < ALL_CLASS_NAMES.length; cIdx++) {
    const className = ALL_CLASS_NAMES[cIdx];
    const cId = classMap[className];
    const classSubs = subjectsMap[className] || [];
    const classDivs = getDivisionsForClass(className);

    // 4 Standard Examination Terms requested:
    // 1. First Unit Test
    // 2. First Term
    // 3. Second Unit Test
    // 4. Second Term
    const EXAM_DEFINITIONS = [
      { name: 'First Unit Test', startDate: new Date('2025-08-10'), endDate: new Date('2025-08-18') },
      { name: 'First Term', startDate: new Date('2025-10-15'), endDate: new Date('2025-10-25') },
      { name: 'Second Unit Test', startDate: new Date('2026-01-12'), endDate: new Date('2026-01-20') },
      { name: 'Second Term', startDate: new Date('2026-03-20'), endDate: new Date('2026-03-31') },
    ];

    const examsList: any[] = [];
    for (const ed of EXAM_DEFINITIONS) {
      let ex = await prisma.exam.findFirst({
        where: { classId: cId, academicYearId: ay.id, name: ed.name }
      });
      if (!ex) {
        ex = await prisma.exam.create({
          data: {
            name: ed.name,
            classId: cId,
            academicYearId: ay.id,
            startDate: ed.startDate,
            endDate: ed.endDate,
            isActive: true,
          }
        });
      }
      examsList.push(ex);
    }
    const exam = examsList[0]; // default reference

    const baseAge = cIdx + 4; // Jr.KG: 4, Sr.KG: 5, 1st: 6, ... 10th: 15
    const birthYear = 2025 - baseAge;

    for (let sIdx = 1; sIdx <= 10; sIdx++) {
      // Distribute students across divisions: students 1-5 in A, 6-10 in B for all classes
      const divName = sIdx <= 5 ? 'A' : 'B';
      const dId = divisionMap[`${className}|${divName}`];
      const tId = teacherIdMap[`${className}|${divName}`];
      const rollNo = String(sIdx);
      const paddedIdx = String(cIdx * 10 + sIdx).padStart(3, '0');
      const admissionNo = `ADM${paddedIdx}`;

      const fName = FIRST_NAMES[(cIdx * 3 + sIdx) % FIRST_NAMES.length];
      const lName = LAST_NAMES[(cIdx * 2 + sIdx) % LAST_NAMES.length];
      const fullName = `${fName} ${lName}`;
      const gender = sIdx % 2 === 0 ? 'FEMALE' : 'MALE';
      const fatherName = `Mr. Ramesh ${lName}`;
      const motherName = `Mrs. Sunita ${lName}`;
      const fatherOcc = OCCUPATIONS[(sIdx * 2) % OCCUPATIONS.length];
      const motherOcc = OCCUPATIONS[(sIdx * 3) % OCCUPATIONS.length];
      const bloodGroup = BLOOD_GROUPS[sIdx % BLOOD_GROUPS.length];
      const height = `${100 + cIdx * 5 + sIdx} cm`;
      const weight = `${16 + cIdx * 3 + sIdx} kg`;
      const motherTongue = sIdx % 4 === 0 ? 'Hindi' : sIdx % 5 === 0 ? 'English' : 'Marathi';
      const dob = new Date(`${birthYear}-0${(sIdx % 9) + 1}-15`);
      const parentContact = `98210${String(cIdx).padStart(2, '0')}${String(sIdx).padStart(3, '0')}`;
      const address = `Plot No. ${sIdx * 12}, Near Shivaji Chowk, Gangapur, Sambhajinagar`;

      // Upsert Student User & Profile
      const studentEmail = `${admissionNo.toLowerCase()}@student.mtfschool.edu`;
      const username = admissionNo.toLowerCase();

      let studentRecord = await prisma.student.findUnique({ where: { admissionNo } });
      if (!studentRecord) {
        const user = await prisma.user.create({
          data: {
            email: studentEmail,
            username,
            passwordHash: studentHash,
            role: 'STUDENT',
            status: 'ACTIVE',
            student: {
              create: {
                admissionNo,
                rollNo,
                name: fullName,
                surname: lName,
                gender: gender as any,
                parentContact,
                parentEmail: `parent.${admissionNo.toLowerCase()}@gmail.com`,
                fatherName,
                fatherOccupation: fatherOcc,
                motherName,
                motherOccupation: motherOcc,
                motherTongue,
                bloodGroup,
                height,
                weight,
                dob,
                age: baseAge,
                address,
              }
            }
          },
          include: { student: true }
        });
        studentRecord = user.student;
      } else {
        await prisma.student.update({
          where: { id: studentRecord.id },
          data: {
            rollNo,
            name: fullName,
            surname: lName,
            fatherName,
            fatherOccupation: fatherOcc,
            motherName,
            motherOccupation: motherOcc,
            motherTongue,
            bloodGroup,
            height,
            weight,
            dob,
            age: baseAge,
            address,
            parentContact,
          }
        });
      }

      if (!studentRecord) continue;
      totalStudentsCreated++;

      // Enrollment
      const enroll = await prisma.studentEnrollment.findFirst({
        where: { studentId: studentRecord.id, academicYearId: ay.id }
      });
      if (!enroll) {
        await prisma.studentEnrollment.create({
          data: {
            studentId: studentRecord.id,
            classId: cId,
            divisionId: dId,
            academicYearId: ay.id,
            rollNo,
            status: 'ENROLLED'
          }
        });
      }

      // Seed Marks for this Student across all 4 examination terms
      if (examsList.length > 0 && classSubs.length > 0) {
        for (let eIndex = 0; eIndex < examsList.length; eIndex++) {
          const exm = examsList[eIndex];
          const marksToCreate = classSubs.map((sub) => {
            // Variation per exam term
            const baseScore = 65 + ((sIdx * 4 + cIdx * 3 + eIndex * 5) % 30);
            return {
              studentId: studentRecord.id,
              examId: exm.id,
              subjectId: sub.id,
              classId: cId,
              divisionId: dId,
              academicYearId: ay.id,
              marksObtained: Math.min(sub.maxMarks, Math.max(35, baseScore)),
              enteredById: tId,
            };
          });
          for (const markData of marksToCreate) {
            try {
              await prisma.mark.create({ data: markData });
            } catch (e: any) {
              if (!e.code || e.code !== 'P2002') throw e;
            }
          }
        }
      }

      // Pre-Generate Report Card for Every Student
      let rc = await prisma.reportCard.findFirst({
        where: { studentId: studentRecord.id, academicYearId: ay.id }
      });

      if (!rc) {
        rc = await prisma.reportCard.create({
          data: {
            studentId: studentRecord.id,
            classId: cId,
            divisionId: dId,
            academicYearId: ay.id,
            status: 'DRAFT',
            sections: {
              create: [
                { sectionKey: 'A', sectionTitle: 'Physical Development', progressShown: sampleRemarks.A.prog, challengesFaced: sampleRemarks.A.chal },
                { sectionKey: 'B', sectionTitle: 'Social Emotional Development', progressShown: sampleRemarks.B.prog, challengesFaced: sampleRemarks.B.chal },
                { sectionKey: 'C', sectionTitle: 'Cognitive Development', progressShown: sampleRemarks.C.prog, challengesFaced: sampleRemarks.C.chal },
                { sectionKey: 'D', sectionTitle: 'Language & Literacy Development', progressShown: sampleRemarks.D.prog, challengesFaced: sampleRemarks.D.chal },
                { sectionKey: 'E', sectionTitle: 'Creative & Aesthetic Development', progressShown: sampleRemarks.E.prog, challengesFaced: sampleRemarks.E.chal },
              ]
            },
            assessment: {
              create: {
                allRoundDevelopment: 'YES',
                strengthIdentified: 'Observant, polite, active participant in class discussions, and neat handwriting.',
                additionalSupportNeeded: 'Encouraged to practice daily mental arithmetic and expand vocabulary through oral reading.'
              }
            }
          }
        });
        totalReportCardsCreated++;
      }

      // Seed Attendance for Last 5 Days in Bulk
      const dates = [
        new Date('2026-08-18'),
        new Date('2026-08-19'),
        new Date('2026-08-20'),
        new Date('2026-08-21'),
        new Date('2026-08-22'),
      ];

      const attToCreate = dates.map((attDate) => ({
        studentId: studentRecord.id,
        classId: cId,
        divisionId: dId,
        academicYearId: ay.id,
        date: attDate,
        status: (sIdx === 7 && attDate.getDay() === 3 ? 'ABSENT' : 'PRESENT') as any,
        markedById: tId,
      }));
      for (const attData of attToCreate) {
        try {
          await prisma.attendance.create({ data: attData });
        } catch (e: any) {
          // Skip duplicates
          if (!e.code || e.code !== 'P2002') throw e;
        }
      }
    }

    // Seed Sample Daily Teaching Log for each class-division
    for (const divName of classDivs) {
      const divTId = teacherIdMap[`${className}|${divName}`];
      const divDId = divisionMap[`${className}|${divName}`];
      if (divTId && divDId) {
        const todayDate = new Date('2026-08-22');
        const logExists = await prisma.dailyTeachingLog.findFirst({
          where: { classId: cId, divisionId: divDId, date: todayDate }
        });
        if (!logExists) {
          await prisma.dailyTeachingLog.create({
            data: {
              classId: cId,
              divisionId: divDId,
              teacherId: divTId,
              subjectId: classSubs[0]?.id || null,
              date: todayDate,
              topicTaught: `Unit 3 — Essential Concepts & Classroom Exercises for Class ${className} (${divName})`,
              homeworkGiven: 'Complete Exercise Questions 1 to 5 in Notebook',
              remarks: 'All students actively participated and completed initial classwork on time.',
            }
          });
        }
      }
    }

    console.log(`  ✓ Class ${className} — 10 Students Enrolled & 10 Report Cards Generated!`);
  }

  // ── Seed Remark Bank ─────────────────────────────────────
  const remarkCount = await prisma.remarkBank.count();
  if (remarkCount === 0) {
    console.log('Seeding Remark Bank options...');
    const adminUser = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
    const adminId = adminUser?.id || null;

    const defaultRemarks = [
      // Section A Progress
      { fieldKey: 'kg_sec_a_progress', textEn: 'Shows good physical coordination' },
      { fieldKey: 'kg_sec_a_progress', textEn: 'Participates actively in physical activities' },
      { fieldKey: 'kg_sec_a_progress', textEn: 'Demonstrates good motor skills' },
      { fieldKey: 'kg_sec_a_progress', textEn: 'Maintains good physical fitness' },
      { fieldKey: 'kg_sec_a_progress', textEn: 'Participates enthusiastically' },
      { fieldKey: 'kg_sec_a_progress', textEn: 'Shows improvement in motor activities' },
      { fieldKey: 'kg_sec_a_progress', textEn: 'Good hand-eye coordination' },
      { fieldKey: 'kg_sec_a_progress', textEn: 'Excellent physical development' },
      { fieldKey: 'kg_sec_a_progress', textEn: 'Very good progress' },
      { fieldKey: 'kg_sec_a_progress', textEn: 'Good progress' },
      { fieldKey: 'kg_sec_a_progress', textEn: 'Satisfactory progress' },

      // Section A Challenges
      { fieldKey: 'kg_sec_a_challenges', textEn: 'Needs regular physical activity' },
      { fieldKey: 'kg_sec_a_challenges', textEn: 'Needs improvement in coordination' },
      { fieldKey: 'kg_sec_a_challenges', textEn: 'Needs more participation' },
      { fieldKey: 'kg_sec_a_challenges', textEn: 'Requires additional practice' },
      { fieldKey: 'kg_sec_a_challenges', textEn: 'Needs encouragement' },
      { fieldKey: 'kg_sec_a_challenges', textEn: 'Needs to improve motor skills' },
      { fieldKey: 'kg_sec_a_challenges', textEn: 'Needs improvement in physical activities' },
      { fieldKey: 'kg_sec_a_challenges', textEn: 'Requires regular exercise' },
      { fieldKey: 'kg_sec_a_challenges', textEn: 'Needs better coordination' },

      // Section B Progress
      { fieldKey: 'kg_sec_b_progress', textEn: 'Demonstrates good behaviour' },
      { fieldKey: 'kg_sec_b_progress', textEn: 'Works well with others' },
      { fieldKey: 'kg_sec_b_progress', textEn: 'Shows respect towards teachers' },
      { fieldKey: 'kg_sec_b_progress', textEn: 'Shows respect towards classmates' },
      { fieldKey: 'kg_sec_b_progress', textEn: 'Cooperates with peers' },
      { fieldKey: 'kg_sec_b_progress', textEn: 'Participates actively in group activities' },
      { fieldKey: 'kg_sec_b_progress', textEn: 'Shows confidence' },
      { fieldKey: 'kg_sec_b_progress', textEn: 'Takes responsibility' },
      { fieldKey: 'kg_sec_b_progress', textEn: 'Demonstrates leadership qualities' },
      { fieldKey: 'kg_sec_b_progress', textEn: 'Shows empathy' },
      { fieldKey: 'kg_sec_b_progress', textEn: 'Maintains positive relationships' },
      { fieldKey: 'kg_sec_b_progress', textEn: 'Follows classroom rules' },

      // Section B Challenges
      { fieldKey: 'kg_sec_b_challenges', textEn: 'Needs to improve communication' },
      { fieldKey: 'kg_sec_b_challenges', textEn: 'Needs to participate more in group activities' },
      { fieldKey: 'kg_sec_b_challenges', textEn: 'Needs more confidence' },
      { fieldKey: 'kg_sec_b_challenges', textEn: 'Needs to improve cooperation' },
      { fieldKey: 'kg_sec_b_challenges', textEn: 'Needs to follow classroom rules' },
      { fieldKey: 'kg_sec_b_challenges', textEn: 'Needs to improve social interaction' },
      { fieldKey: 'kg_sec_b_challenges', textEn: 'Needs encouragement' },
      { fieldKey: 'kg_sec_b_challenges', textEn: 'Needs to develop leadership skills' },
      { fieldKey: 'kg_sec_b_challenges', textEn: 'Needs to improve emotional expression' },

      // Section C Progress
      { fieldKey: 'kg_sec_c_progress', textEn: 'Understands concepts well' },
      { fieldKey: 'kg_sec_c_progress', textEn: 'Demonstrates logical thinking' },
      { fieldKey: 'kg_sec_c_progress', textEn: 'Shows good problem-solving skills' },
      { fieldKey: 'kg_sec_c_progress', textEn: 'Learns quickly' },
      { fieldKey: 'kg_sec_c_progress', textEn: 'Demonstrates curiosity' },
      { fieldKey: 'kg_sec_c_progress', textEn: 'Applies knowledge effectively' },
      { fieldKey: 'kg_sec_c_progress', textEn: 'Participates actively in discussions' },
      { fieldKey: 'kg_sec_c_progress', textEn: 'Shows good concentration' },
      { fieldKey: 'kg_sec_c_progress', textEn: 'Demonstrates analytical thinking' },
      { fieldKey: 'kg_sec_c_progress', textEn: 'Excellent academic progress' },

      // Section C Challenges
      { fieldKey: 'kg_sec_c_challenges', textEn: 'Needs more practice' },
      { fieldKey: 'kg_sec_c_challenges', textEn: 'Needs to improve concentration' },
      { fieldKey: 'kg_sec_c_challenges', textEn: 'Needs help understanding concepts' },
      { fieldKey: 'kg_sec_c_challenges', textEn: 'Requires regular revision' },
      { fieldKey: 'kg_sec_c_challenges', textEn: 'Needs to improve problem-solving skills' },
      { fieldKey: 'kg_sec_c_challenges', textEn: 'Needs individual attention' },
      { fieldKey: 'kg_sec_c_challenges', textEn: 'Needs to participate more actively' },
      { fieldKey: 'kg_sec_c_challenges', textEn: 'Needs improvement in analytical thinking' },

      // Section D Progress
      { fieldKey: 'kg_sec_d_progress', textEn: 'Reads fluently' },
      { fieldKey: 'kg_sec_d_progress', textEn: 'Good vocabulary' },
      { fieldKey: 'kg_sec_d_progress', textEn: 'Communicates clearly' },
      { fieldKey: 'kg_sec_d_progress', textEn: 'Good handwriting' },
      { fieldKey: 'kg_sec_d_progress', textEn: 'Writes independently' },
      { fieldKey: 'kg_sec_d_progress', textEn: 'Understands instructions' },
      { fieldKey: 'kg_sec_d_progress', textEn: 'Participates in language activities' },
      { fieldKey: 'kg_sec_d_progress', textEn: 'Good pronunciation' },
      { fieldKey: 'kg_sec_d_progress', textEn: 'Good reading comprehension' },
      { fieldKey: 'kg_sec_d_progress', textEn: 'Expresses ideas clearly' },

      // Section D Challenges
      { fieldKey: 'kg_sec_d_challenges', textEn: 'Needs reading practice' },
      { fieldKey: 'kg_sec_d_challenges', textEn: 'Needs handwriting improvement' },
      { fieldKey: 'kg_sec_d_challenges', textEn: 'Needs vocabulary development' },
      { fieldKey: 'kg_sec_d_challenges', textEn: 'Needs pronunciation practice' },
      { fieldKey: 'kg_sec_d_challenges', textEn: 'Needs improvement in writing' },
      { fieldKey: 'kg_sec_d_challenges', textEn: 'Needs more reading practice' },
      { fieldKey: 'kg_sec_d_challenges', textEn: 'Needs to improve grammar' },
      { fieldKey: 'kg_sec_d_challenges', textEn: 'Needs to improve sentence formation' },
      { fieldKey: 'kg_sec_d_challenges', textEn: 'Needs encouragement to speak' },

      // Section E Progress
      { fieldKey: 'kg_sec_e_progress', textEn: 'Shows creativity' },
      { fieldKey: 'kg_sec_e_progress', textEn: 'Demonstrates artistic ability' },
      { fieldKey: 'kg_sec_e_progress', textEn: 'Participates actively in art activities' },
      { fieldKey: 'kg_sec_e_progress', textEn: 'Shows imagination' },
      { fieldKey: 'kg_sec_e_progress', textEn: 'Enjoys creative activities' },
      { fieldKey: 'kg_sec_e_progress', textEn: 'Demonstrates good drawing skills' },
      { fieldKey: 'kg_sec_e_progress', textEn: 'Shows interest in music' },
      { fieldKey: 'kg_sec_e_progress', textEn: 'Participates enthusiastically' },
      { fieldKey: 'kg_sec_e_progress', textEn: 'Expresses ideas creatively' },

      // Section E Challenges
      { fieldKey: 'kg_sec_e_challenges', textEn: 'Needs more creative practice' },
      { fieldKey: 'kg_sec_e_challenges', textEn: 'Needs encouragement in art activities' },
      { fieldKey: 'kg_sec_e_challenges', textEn: 'Needs to participate more' },
      { fieldKey: 'kg_sec_e_challenges', textEn: 'Needs improvement in drawing skills' },
      { fieldKey: 'kg_sec_e_challenges', textEn: 'Needs more exposure to creative activities' },
      { fieldKey: 'kg_sec_e_challenges', textEn: 'Needs encouragement to express ideas' },

      // Section G Strengths
      { fieldKey: 'kg_sec_g_strength', textEn: 'Academic performance' },
      { fieldKey: 'kg_sec_g_strength', textEn: 'Communication' },
      { fieldKey: 'kg_sec_g_strength', textEn: 'Leadership' },
      { fieldKey: 'kg_sec_g_strength', textEn: 'Creativity' },
      { fieldKey: 'kg_sec_g_strength', textEn: 'Sports' },
      { fieldKey: 'kg_sec_g_strength', textEn: 'Discipline' },
      { fieldKey: 'kg_sec_g_strength', textEn: 'Teamwork' },
      { fieldKey: 'kg_sec_g_strength', textEn: 'Problem solving' },
      { fieldKey: 'kg_sec_g_strength', textEn: 'Confidence' },
      { fieldKey: 'kg_sec_g_strength', textEn: 'Regular attendance' },
      { fieldKey: 'kg_sec_g_strength', textEn: 'Positive attitude' },

      // Section G Additional Support
      { fieldKey: 'kg_sec_g_support', textEn: 'Reading' },
      { fieldKey: 'kg_sec_g_support', textEn: 'Writing' },
      { fieldKey: 'kg_sec_g_support', textEn: 'Mathematics' },
      { fieldKey: 'kg_sec_g_support', textEn: 'Science' },
      { fieldKey: 'kg_sec_g_support', textEn: 'Language' },
      { fieldKey: 'kg_sec_g_support', textEn: 'Communication' },
      { fieldKey: 'kg_sec_g_support', textEn: 'Concentration' },
      { fieldKey: 'kg_sec_g_support', textEn: 'Behaviour' },
      { fieldKey: 'kg_sec_g_support', textEn: 'Social Skills' },
      { fieldKey: 'kg_sec_g_support', textEn: 'Physical Development' },
      { fieldKey: 'kg_sec_g_support', textEn: 'Creative Activities' },
      { fieldKey: 'kg_sec_g_support', textEn: 'Attendance' },
      { fieldKey: 'kg_sec_g_support', textEn: 'Homework' },
      { fieldKey: 'kg_sec_g_support', textEn: 'Other' },

      // Section G Areas for Improvement
      { fieldKey: 'kg_sec_g_improvement', textEn: 'Reading' },
      { fieldKey: 'kg_sec_g_improvement', textEn: 'Writing' },
      { fieldKey: 'kg_sec_g_improvement', textEn: 'Mathematics' },
      { fieldKey: 'kg_sec_g_improvement', textEn: 'Grammar' },
      { fieldKey: 'kg_sec_g_improvement', textEn: 'Handwriting' },
      { fieldKey: 'kg_sec_g_improvement', textEn: 'Concentration' },
      { fieldKey: 'kg_sec_g_improvement', textEn: 'Communication' },
      { fieldKey: 'kg_sec_g_improvement', textEn: 'Discipline' },
      { fieldKey: 'kg_sec_g_improvement', textEn: 'Time management' },
      { fieldKey: 'kg_sec_g_improvement', textEn: 'Homework' },
      { fieldKey: 'kg_sec_g_improvement', textEn: 'Participation' },
      { fieldKey: 'kg_sec_g_improvement', textEn: 'Confidence' },
      { fieldKey: 'kg_sec_g_improvement', textEn: 'Social interaction' },
      { fieldKey: 'kg_sec_g_improvement', textEn: 'Physical activity' }
    ];

    for (const r of defaultRemarks) {
      await prisma.remarkBank.create({
        data: {
          fieldKey: r.fieldKey,
          textEn: r.textEn,
          active: true,
          createdBy: adminId
        }
      });
    }
    console.log(`  ✓ Seeded ${defaultRemarks.length} default remark options!`);
  }

  console.log(`\n═══════════════════════════════════════════════`);
  console.log(`  Seeding Complete!`);
  console.log(`  Total Students: ${totalStudentsCreated}`);
  console.log(`  Total Report Cards Ready: ${totalReportCardsCreated}`);
  console.log('═══════════════════════════════════════════════');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
