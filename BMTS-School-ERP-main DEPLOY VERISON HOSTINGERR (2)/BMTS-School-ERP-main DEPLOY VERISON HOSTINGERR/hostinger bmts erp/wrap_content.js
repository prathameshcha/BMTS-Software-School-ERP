const fs = require('fs');
let code = fs.readFileSync('frontend/src/pages/faculty/ReportCardDrafting.tsx', 'utf8');

const injection = `{/* Main Content Area */}
      {!evaluationTermId ? (
        <div className="py-20 text-center bg-slate-50 border border-dashed border-slate-300 rounded-xl mt-6">
          <div className="text-slate-500 font-medium text-lg">Please select a Term option above to begin.</div>
          <div className="text-slate-400 text-sm mt-2">Only terms enabled by the Admin are available.</div>
        </div>
      ) : !reportCard ? (`;

code = code.replace(
  /\{\/\* Main Content Area \*\/\}\s*\{\!reportCard \? \(/,
  injection
);

fs.writeFileSync('frontend/src/pages/faculty/ReportCardDrafting.tsx', code);
console.log('Wrapped Main Content Area');
