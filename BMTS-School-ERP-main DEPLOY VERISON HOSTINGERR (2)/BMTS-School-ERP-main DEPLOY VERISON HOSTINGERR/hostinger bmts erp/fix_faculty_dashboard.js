const fs = require('fs');
let code = fs.readFileSync('frontend/src/pages/faculty/FacultyDashboard.tsx', 'utf8');

// Top Cards Grid
code = code.replace(
  /<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">/,
  '<div className="grid grid-cols-1 md:grid-cols-3 gap-6">'
);

// Remove the Attendance StatsCard
code = code.replace(
  /\s*<StatsCard\s*title="Attendance"\s*value="Mark Daily"\s*icon=\{ClipboardCheck\}\s*description="Ready for today"\s*\/>/,
  ''
);

// Remove Quick Action Link
code = code.replace(
  /\s*<Link\s*to="\/faculty\/attendance"[\s\S]*?<\/Link>/,
  ''
);

fs.writeFileSync('frontend/src/pages/faculty/FacultyDashboard.tsx', code);
console.log('Faculty Dashboard updated');
