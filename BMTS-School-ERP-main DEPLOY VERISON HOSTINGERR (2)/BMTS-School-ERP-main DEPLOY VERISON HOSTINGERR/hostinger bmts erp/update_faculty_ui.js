const fs = require('fs');
let code = fs.readFileSync('frontend/src/pages/faculty/ReportCardDrafting.tsx', 'utf8');

// 1. Add settings state
code = code.replace(
  /const \[generating, setGenerating\] = useState\(false\);/,
  'const [generating, setGenerating] = useState(false);\n  const [settings, setSettings] = useState<any>(null);'
);

// 2. Fetch settings in useEffect
const fetchSettingsCode = `
    apiClient.get('/api/settings').then(res => {
      setSettings(res.data.data);
      // Auto-select the first enabled term if default is disabled
      if (res.data.data) {
        if (!res.data.data.firstTermEnabled && evaluationTermId === 'term_1') {
          if (res.data.data.firstUnitTestEnabled) setEvaluationTermId('unit_1');
          else if (res.data.data.secondUnitTestEnabled) setEvaluationTermId('unit_2');
          else if (res.data.data.overallResultEnabled) setEvaluationTermId('overall');
        }
      }
    }).catch(console.error);
`;

code = code.replace(
  /apiClient\.get\('\/remark-bank'\)\s*\.then\(\(res: any\) => \{\s*if \(res\.data\.success\) setDbRemarks\(res\.data\.data\);\s*\}\)\s*\.catch\(console\.error\);/,
  (match) => match + '\n' + fetchSettingsCode
);

// 3. Map term ID to settings key and update the button
const buttonReplacement = `              {EVALUATION_TERMS.map((term) => {
                const termToSettingMap: Record<string, string> = {
                  'unit_1': 'firstUnitTestEnabled',
                  'term_1': 'firstTermEnabled',
                  'unit_2': 'secondUnitTestEnabled',
                  'overall': 'overallResultEnabled',
                };
                const settingKey = termToSettingMap[term.id];
                const isEnabled = settings ? settings[settingKey] : false;
                
                return (
                  <div key={term.id} className="relative group">
                    <Button
                      type="button"
                      size="sm"
                      disabled={!isEnabled}
                      variant={evaluationTermId === term.id ? 'primary' : 'outline'}
                      onClick={() => isEnabled && setEvaluationTermId(term.id)}
                      className={\`text-[11px] h-7 px-2.5 \${!isEnabled ? 'opacity-50 cursor-not-allowed bg-slate-100 text-slate-400' : (evaluationTermId === term.id ? 'bg-red-900 hover:bg-red-800 text-white' : 'text-slate-600 border-slate-300')}\`}
                    >
                      {term.nameEn}
                    </Button>
                    {!isEnabled && (
                      <div className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-slate-800 text-white text-[10px] py-1 px-2 rounded whitespace-nowrap z-50 pointer-events-none">
                        Admin has turned this off
                      </div>
                    )}
                  </div>
                );
              })}`;

code = code.replace(
  /\{EVALUATION_TERMS\.map\(\(term\) => \([\s\S]*?<\/Button>\s*\)\)\}/,
  buttonReplacement
);

fs.writeFileSync('frontend/src/pages/faculty/ReportCardDrafting.tsx', code);
console.log('Faculty Draft updated');
