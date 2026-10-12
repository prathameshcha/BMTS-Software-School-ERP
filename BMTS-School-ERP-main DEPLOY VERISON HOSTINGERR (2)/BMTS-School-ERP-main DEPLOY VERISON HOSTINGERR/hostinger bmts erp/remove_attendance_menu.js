const fs = require('fs');

const removeLine = (file, matchStr) => {
  let content = fs.readFileSync(file, 'utf8');
  let lines = content.split('\n');
  lines = lines.filter(l => !l.includes(matchStr));
  fs.writeFileSync(file, lines.join('\n'));
};

const adminFile = 'frontend/src/components/layout/AdminLayout.tsx';
removeLine(adminFile, "label: 'Attendance'");

const facultyFile = 'frontend/src/components/layout/FacultyLayout.tsx';
removeLine(facultyFile, "name: 'Attendance'");

const studentFile = 'frontend/src/components/layout/StudentLayout.tsx';
removeLine(studentFile, "name: 'My Attendance'");

console.log('Done removing attendance from sidebars');
