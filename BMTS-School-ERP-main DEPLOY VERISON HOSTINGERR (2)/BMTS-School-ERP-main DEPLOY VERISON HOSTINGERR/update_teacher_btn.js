const fs = require('fs');
let code = fs.readFileSync('frontend/src/pages/faculty/ReportCardDrafting.tsx', 'utf8');

const oldButtonReplacement = `              {EVALUATION_TERMS.map((term) => {
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

const newButtonReplacement = `              {EVALUATION_TERMS.map((term) => {
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
                      variant={evaluationTermId === term.id ? 'primary' : 'outline'}
                      onClick={() => {
                        if (isEnabled) {
                          setEvaluationTermId(term.id);
                        } else {
                          toast.error('Admin has turned this off');
                        }
                      }}
                      className={\`text-[11px] h-7 px-2.5 \${!isEnabled ? 'opacity-50 bg-slate-100 text-slate-400' : (evaluationTermId === term.id ? 'bg-red-900 hover:bg-red-800 text-white' : 'text-slate-600 border-slate-300')}\`}
                    >
                      {term.nameEn}
                    </Button>
                  </div>
                );
              })}`;

if (code.includes(oldButtonReplacement)) {
  code = code.replace(oldButtonReplacement, newButtonReplacement);
  fs.writeFileSync('frontend/src/pages/faculty/ReportCardDrafting.tsx', code);
  console.log('Successfully updated teacher button logic');
} else {
  console.log('Could not find the exact string to replace');
}
