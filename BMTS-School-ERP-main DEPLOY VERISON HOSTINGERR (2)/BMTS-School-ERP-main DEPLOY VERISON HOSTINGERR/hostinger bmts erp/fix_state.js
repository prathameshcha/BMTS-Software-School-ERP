const fs = require('fs');
let code = fs.readFileSync('frontend/src/pages/faculty/ReportCardDrafting.tsx', 'utf8');

// 1. Initial State change
code = code.replace(
  /const \[evaluationTermId, setEvaluationTermId\] = useState<string>\('term_1'\);/,
  "const [evaluationTermId, setEvaluationTermId] = useState<string>('');"
);

// 2. Remove auto-selection logic inside settings fetch completely
const fetchCode = `    apiClient.get('/settings').then(res => {
      setSettings(res.data.data);
    }).catch(console.error);`;

code = code.replace(
  /apiClient\.get\('\/settings'\)\.then\(res => \{[\s\S]*?\}\)\.catch\(console\.error\);/,
  fetchCode
);

fs.writeFileSync('frontend/src/pages/faculty/ReportCardDrafting.tsx', code);
console.log('Fixed state and fetch logic');
