const fs = require('fs');
let code = fs.readFileSync('frontend/src/pages/admin/AdminDashboard.tsx', 'utf8');

// Row 1
code = code.replace(
  /<div className="grid grid-cols-2 md:grid-cols-4 gap-4">\s*(<StatCard[\s\S]*?title="Total Students"[\s\S]*?\/>)\s*(<StatCard[\s\S]*?title="Total Teachers"[\s\S]*?\/>)\s*(<StatCard[\s\S]*?title="Total Classes"[\s\S]*?\/>)\s*<StatCard[\s\S]*?title="Avg Attendance"[\s\S]*?\/>\s*<\/div>/,
  '<div className="grid grid-cols-1 md:grid-cols-3 gap-4">\n        $1\n        $2\n        $3\n      </div>'
);

// Row 2
code = code.replace(
  /<div className="grid grid-cols-2 md:grid-cols-4 gap-4">\s*<StatCard[\s\S]*?title="Present Today"[\s\S]*?\/>\s*<StatCard[\s\S]*?title="Absent Today"[\s\S]*?\/>\s*(<StatCard[\s\S]*?title="At-Risk Students"[\s\S]*?\/>)\s*(<StatCard[\s\S]*?title="Report Cards"[\s\S]*?\/>)\s*<\/div>/,
  '<div className="grid grid-cols-1 md:grid-cols-2 gap-4">\n        $1\n        $2\n      </div>'
);

// Charts Row
// We'll just replace from `{/* Attendance Trend */}` to `</Card>\n\n        {/* Class-wise Student Count */}`
code = code.replace(
  /\{\/\* Attendance Trend \*\/\}[\s\S]*?<\/Card>\s*\{\/\* Class-wise Student Count \*\/\}/,
  '{/* Class-wise Student Count */}'
);

// Also change grid-cols-2 to grid-cols-1
code = code.replace(
  /<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">\s*\{\/\* Class-wise Student Count \*\/\}/,
  '<div className="grid grid-cols-1 gap-6">\n        {/* Class-wise Student Count */}'
);

fs.writeFileSync('frontend/src/pages/admin/AdminDashboard.tsx', code);
console.log('Admin Dashboard updated');
