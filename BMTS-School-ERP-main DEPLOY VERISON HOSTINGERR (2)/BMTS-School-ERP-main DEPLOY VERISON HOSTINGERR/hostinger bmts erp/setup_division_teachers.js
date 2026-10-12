const { PrismaClient } = require('./backend/node_modules/@prisma/client');
const bcrypt = require('./backend/node_modules/bcryptjs');
const prisma = new PrismaClient();

async function setupDivisionTeachers() {
  console.log('=== Setting up Division-wise Teachers ===\n');

  // Get active academic year
  const ay = await prisma.academicYear.findFirst({ where: { isActive: true } });
  if (!ay) { console.error('No active academic year!'); return; }
  console.log('Academic Year:', ay.name);

  // Get all classes with divisions
  const classes = await prisma.class.findMany({ 
    orderBy: { displayOrder: 'asc' },
    include: { divisions: true, subjects: true }
  });

  const facultyHash = await bcrypt.hash('Faculty@123', 10);

  const ALL_TEACHERS = [
    { className: 'Jr.KG', division: 'A', email: 'teacher.jrkg.a@mtfschool.edu', username: 'teacher_jrkg_a', name: 'Mrs. Meena Deshmukh',   phone: '9820010001', department: 'Pre-Primary',   qualification: 'B.A., D.Ed.' },
    { className: 'Jr.KG', division: 'B', email: 'teacher.jrkg.b@mtfschool.edu', username: 'teacher_jrkg_b', name: 'Mrs. Rohini Shinde',   phone: '9820010023', department: 'Pre-Primary',   qualification: 'M.A., Montessori' },
    { className: 'Sr.KG', division: 'A', email: 'teacher.srkg.a@mtfschool.edu', username: 'teacher_srkg_a', name: 'Mrs. Priya Sharma',     phone: '9820010002', department: 'Pre-Primary',   qualification: 'M.A., Montessori' },
    { className: 'Sr.KG', division: 'B', email: 'teacher.srkg.b@mtfschool.edu', username: 'teacher_srkg_b', name: 'Mrs. Sarita Gaikwad',  phone: '9820010024', department: 'Pre-Primary',   qualification: 'B.A., D.Ed.' },
    { className: '1st', division: 'A', email: 'teacher.1a@mtfschool.edu',  username: 'teacher_1a',  name: 'Mrs. Sunita Patil',     phone: '9820010003', department: 'Primary',       qualification: 'B.Sc., B.Ed.' },
    { className: '1st', division: 'B', email: 'teacher.1b@mtfschool.edu',  username: 'teacher_1b',  name: 'Mrs. Kavita Jadhav',    phone: '9820010004', department: 'Primary',       qualification: 'M.Sc., B.Ed.' },
    { className: '2nd', division: 'A', email: 'teacher.2a@mtfschool.edu',  username: 'teacher_2a',  name: 'Mrs. Anjali Shinde',    phone: '9820010005', department: 'Primary',       qualification: 'B.A., B.Ed.' },
    { className: '2nd', division: 'B', email: 'teacher.2b@mtfschool.edu',  username: 'teacher_2b',  name: 'Mr. Rajesh Kulkarni',   phone: '9820010006', department: 'Primary',       qualification: 'M.A., B.Ed.' },
    { className: '3rd', division: 'A', email: 'teacher.3a@mtfschool.edu',  username: 'teacher_3a',  name: 'Mr. Suresh More',       phone: '9820010007', department: 'Primary',       qualification: 'B.Sc., M.Ed.' },
    { className: '3rd', division: 'B', email: 'teacher.3b@mtfschool.edu',  username: 'teacher_3b',  name: 'Mrs. Deepa Joshi',      phone: '9820010008', department: 'Primary',       qualification: 'M.A., B.Ed.' },
    { className: '4th', division: 'A', email: 'teacher.4a@mtfschool.edu',  username: 'teacher_4a',  name: 'Mr. Amol Pawar',        phone: '9820010009', department: 'Primary',       qualification: 'M.Sc., B.Ed.' },
    { className: '4th', division: 'B', email: 'teacher.4b@mtfschool.edu',  username: 'teacher_4b',  name: 'Mrs. Pooja Gaikwad',    phone: '9820010010', department: 'Primary',       qualification: 'B.A., M.Ed.' },
    { className: '5th', division: 'A', email: 'teacher.5a@mtfschool.edu',  username: 'teacher_5a',  name: 'Mr. Nitin Chavan',      phone: '9820010011', department: 'Middle School',  qualification: 'M.Sc., B.Ed.' },
    { className: '5th', division: 'B', email: 'teacher.5b@mtfschool.edu',  username: 'teacher_5b',  name: 'Dr. Sanjay Bhosale',    phone: '9820010012', department: 'Middle School',  qualification: 'Ph.D., M.Ed.' },
    { className: '6th', division: 'A', email: 'teacher.6a@mtfschool.edu',  username: 'teacher_6a',  name: 'Mrs. Rekha Thorat',     phone: '9820010013', department: 'Middle School',  qualification: 'M.A., B.Ed.' },
    { className: '6th', division: 'B', email: 'teacher.6b@mtfschool.edu',  username: 'teacher_6b',  name: 'Mr. Vikas Sonawane',    phone: '9820010014', department: 'Middle School',  qualification: 'B.Sc., B.Ed.' },
    { className: '7th', division: 'A', email: 'teacher.7a@mtfschool.edu',  username: 'teacher_7a',  name: 'Mrs. Swati Kale',       phone: '9820010015', department: 'Middle School',  qualification: 'M.Sc., B.Ed.' },
    { className: '7th', division: 'B', email: 'teacher.7b@mtfschool.edu',  username: 'teacher_7b',  name: 'Mr. Tushar Nikam',      phone: '9820010016', department: 'Middle School',  qualification: 'B.A., M.Ed.' },
    { className: '8th', division: 'A', email: 'teacher.8a@mtfschool.edu',  username: 'teacher_8a',  name: 'Mrs. Manisha Deshpande',phone: '9820010017', department: 'Secondary',     qualification: 'M.A., B.Ed.' },
    { className: '8th', division: 'B', email: 'teacher.8b@mtfschool.edu',  username: 'teacher_8b',  name: 'Mr. Sachin Patil',      phone: '9820010018', department: 'Secondary',     qualification: 'M.Sc., B.Ed.' },
    { className: '9th', division: 'A', email: 'teacher.9a@mtfschool.edu',  username: 'teacher_9a',  name: 'Mrs. Vaishali Mane',    phone: '9820010019', department: 'Secondary',     qualification: 'M.Sc., B.Ed.' },
    { className: '9th', division: 'B', email: 'teacher.9b@mtfschool.edu',  username: 'teacher_9b',  name: 'Mr. Prasad Kadam',      phone: '9820010020', department: 'Secondary',     qualification: 'M.A., M.Ed.' },
    { className: '10th', division: 'A', email: 'teacher.10a@mtfschool.edu', username: 'teacher_10a', name: 'Mrs. Ashwini Salunkhe', phone: '9820010021', department: 'Secondary',     qualification: 'M.Sc., B.Ed.' },
    { className: '10th', division: 'B', email: 'teacher.10b@mtfschool.edu', username: 'teacher_10b', name: 'Mr. Ganesh Wagh',       phone: '9820010022', department: 'Secondary',     qualification: 'Ph.D., M.Ed.' },
  ];

  let created = 0, updated = 0;

  for (const td of ALL_TEACHERS) {
    const cls = classes.find(c => c.name === td.className);
    if (!cls) { console.log(`  ✗ Class ${td.className} not found`); continue; }
    
    const div = cls.divisions.find(d => d.name === td.division);
    if (!div) { console.log(`  ✗ Division ${td.division} not found for ${td.className}`); continue; }

    const firstSubject = cls.subjects[0];
    if (!firstSubject) { console.log(`  ✗ No subjects for ${td.className}`); continue; }

    // Check if user already exists
    let user = await prisma.user.findUnique({ where: { email: td.email } });
    
    if (user) {
      // Update password and ensure active
      await prisma.user.update({ 
        where: { id: user.id }, 
        data: { passwordHash: facultyHash, status: 'ACTIVE' } 
      });
      updated++;
    } else {
      // Create new teacher user
      user = await prisma.user.create({
        data: {
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
        }
      });
      created++;
    }

    // Get teacher record
    const teacher = await prisma.teacher.findUnique({ where: { userId: user.id } });
    if (!teacher) continue;

    // Create assignment if not exists
    const existingAssignment = await prisma.teacherAssignment.findFirst({
      where: { teacherId: teacher.id, classId: cls.id, divisionId: div.id, academicYearId: ay.id }
    });
    if (!existingAssignment) {
      await prisma.teacherAssignment.create({
        data: {
          teacherId: teacher.id,
          classId: cls.id,
          divisionId: div.id,
          subjectId: firstSubject.id,
          academicYearId: ay.id
        }
      });
    }

    console.log(`  ✓ ${td.name} → ${td.className} ${td.division} (${td.email})`);
  }

  console.log(`\n✓ Created ${created} new teachers, updated ${updated} existing`);
  console.log('✓ All 24 division-wise teachers ready!\n');

  // Verify
  const totalFaculty = await prisma.user.count({ where: { role: 'FACULTY', status: 'ACTIVE' } });
  console.log(`Total active FACULTY users: ${totalFaculty}`);

  await prisma.$disconnect();
}

setupDivisionTeachers().catch(e => { console.error(e); process.exit(1); });
