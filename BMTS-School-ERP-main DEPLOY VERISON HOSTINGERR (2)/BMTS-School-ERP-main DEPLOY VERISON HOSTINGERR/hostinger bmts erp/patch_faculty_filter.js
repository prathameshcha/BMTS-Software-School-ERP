const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'backend', 'dist');

// ============================================================
// HELPER: Faculty assignment filter code to inject at top of
// FACULTY-accessible GET routes. This looks up the teacher's
// assignments and restricts classId/divisionId accordingly.
// ============================================================

const FACULTY_FILTER_BLOCK = `
        // === DIVISION-WISE FACULTY FILTER ===
        if (req.user?.role === 'FACULTY') {
            const _teacher = await database_js_1.prisma.teacher.findUnique({ where: { userId: req.user.id } });
            if (_teacher) {
                const _assignments = await database_js_1.prisma.teacherAssignment.findMany({
                    where: { teacherId: _teacher.id },
                    select: { classId: true, divisionId: true }
                });
                if (_assignments.length > 0) {
                    const _classIds = [...new Set(_assignments.map(a => a.classId))];
                    const _divIds = [...new Set(_assignments.map(a => a.divisionId))];
                    if (!classId) classId = _classIds[0];
                    if (!divisionId) divisionId = _divIds[0];
                    // Enforce: teacher can only query their assigned class+division
                    if (!_classIds.includes(String(classId)) || !_divIds.includes(String(divisionId))) {
                        return res.status(403).json({ success: false, error: 'You can only view your assigned class and division.' });
                    }
                }
            }
        }
`;

// 1. Patch students.routes.js — inject filter after query param destructuring
const studentsFile = path.join(distDir, 'routes', 'students.routes.js');
let studentsCode = fs.readFileSync(studentsFile, 'utf8');

const studentsTarget = `        const { classId, divisionId, academicYearId } = req.query;`;
const studentsReplacement = `        let { classId, divisionId, academicYearId } = req.query;` + FACULTY_FILTER_BLOCK;

if (studentsCode.includes(studentsTarget) && !studentsCode.includes('DIVISION-WISE FACULTY FILTER')) {
    studentsCode = studentsCode.replace(studentsTarget, studentsReplacement);
    fs.writeFileSync(studentsFile, studentsCode, 'utf8');
    console.log('✓ Patched students.routes.js — faculty can only see their class+division');
} else {
    console.log('  students.routes.js — already patched or target not found');
}

// 2. Patch reportCards.routes.js — inject filter in the GET / route
const rcFile = path.join(distDir, 'routes', 'reportCards.routes.js');
let rcCode = fs.readFileSync(rcFile, 'utf8');

const rcTarget = `        const { classId, divisionId, academicYearId, status, studentId } = req.query;`;
const rcReplacement = `        let { classId, divisionId, academicYearId, status, studentId } = req.query;` + FACULTY_FILTER_BLOCK;

if (rcCode.includes(rcTarget) && !rcCode.includes('DIVISION-WISE FACULTY FILTER')) {
    rcCode = rcCode.replace(rcTarget, rcReplacement);
    fs.writeFileSync(rcFile, rcCode, 'utf8');
    console.log('✓ Patched reportCards.routes.js — faculty can only see their class+division');
} else {
    console.log('  reportCards.routes.js — already patched or target not found');
}

// 3. Patch marks.routes.js — inject filter in the GET / route
const marksFile = path.join(distDir, 'routes', 'marks.routes.js');
let marksCode = fs.readFileSync(marksFile, 'utf8');

const marksTarget = `        let { examId, classId, divisionId, subjectId, academicYearId } = req.query;`;

const MARKS_FACULTY_FILTER = `
        // === DIVISION-WISE FACULTY FILTER ===
        if (req.user?.role === 'FACULTY') {
            const _teacher = await database_js_1.prisma.teacher.findUnique({ where: { userId: req.user.id } });
            if (_teacher) {
                const _assignments = await database_js_1.prisma.teacherAssignment.findMany({
                    where: { teacherId: _teacher.id },
                    select: { classId: true, divisionId: true }
                });
                if (_assignments.length > 0) {
                    const _classIds = [...new Set(_assignments.map(a => a.classId))];
                    const _divIds = [...new Set(_assignments.map(a => a.divisionId))];
                    if (!classId) classId = _classIds[0];
                    if (!divisionId) divisionId = _divIds[0];
                    if (!_classIds.includes(String(classId)) || !_divIds.includes(String(divisionId))) {
                        return res.status(403).json({ success: false, error: 'You can only view marks for your assigned class and division.' });
                    }
                }
            }
        }
`;

if (marksCode.includes(marksTarget) && !marksCode.includes('DIVISION-WISE FACULTY FILTER')) {
    marksCode = marksCode.replace(marksTarget, marksTarget + MARKS_FACULTY_FILTER);
    fs.writeFileSync(marksFile, marksCode, 'utf8');
    console.log('✓ Patched marks.routes.js — faculty can only see their class+division marks');
} else {
    console.log('  marks.routes.js — already patched or target not found');
}

// 4. Patch attendance.routes.js — inject filter in the GET / route
const attFile = path.join(distDir, 'routes', 'attendance.routes.js');
let attCode = fs.readFileSync(attFile, 'utf8');

const attTarget = `        const { classId, divisionId, date, academicYearId } = req.query;`;
const attReplacement = `        let { classId, divisionId, date, academicYearId } = req.query;` + `
        // === DIVISION-WISE FACULTY FILTER ===
        if (req.user?.role === 'FACULTY') {
            const _teacher = await database_js_1.prisma.teacher.findUnique({ where: { userId: req.user.id } });
            if (_teacher) {
                const _assignments = await database_js_1.prisma.teacherAssignment.findMany({
                    where: { teacherId: _teacher.id },
                    select: { classId: true, divisionId: true }
                });
                if (_assignments.length > 0) {
                    const _classIds = [...new Set(_assignments.map(a => a.classId))];
                    const _divIds = [...new Set(_assignments.map(a => a.divisionId))];
                    if (!classId) classId = _classIds[0];
                    if (!divisionId) divisionId = _divIds[0];
                    if (!_classIds.includes(String(classId)) || !_divIds.includes(String(divisionId))) {
                        return res.status(403).json({ success: false, error: 'You can only view attendance for your assigned class and division.' });
                    }
                }
            }
        }
`;

if (attCode.includes(attTarget) && !attCode.includes('DIVISION-WISE FACULTY FILTER')) {
    attCode = attCode.replace(attTarget, attReplacement);
    fs.writeFileSync(attFile, attCode, 'utf8');
    console.log('✓ Patched attendance.routes.js — faculty can only see their class+division attendance');
} else {
    console.log('  attendance.routes.js — already patched or target not found');
}

console.log('\n✓ All backend routes patched for division-wise faculty access!');
console.log('  Restart the server to apply changes.');
