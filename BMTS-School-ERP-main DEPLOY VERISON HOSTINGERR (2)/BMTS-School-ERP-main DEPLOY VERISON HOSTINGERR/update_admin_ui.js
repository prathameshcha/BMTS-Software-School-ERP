const fs = require('fs');
let code = fs.readFileSync('frontend/src/pages/admin/ReportCardManagement.tsx', 'utf8');

// 1. Add states
const statesInjection = `
  const [settings, setSettings] = useState<any>(null);
  const [savingSettings, setSavingSettings] = useState(false);
`;

code = code.replace(
  /const \[generating, setGenerating\] = useState\(false\);/,
  'const [generating, setGenerating] = useState(false);\n' + statesInjection
);

// 2. Fetch settings in useEffect
const fetchSettingsInjection = `
      apiClient.get('/api/settings').then(res => setSettings(res.data.data)).catch(console.error);
`;

code = code.replace(
  /fetchReportCards\(\);\r?\n\s*\}\r?\n\s*\}, \[selectedYearId, selectedClassId, selectedDivisionId, selectedStatus\]\);/,
  (match) => match + '\n\n  useEffect(() => {\n' + fetchSettingsInjection + '  }, []);\n'
);

// 3. Toggle Handler
const toggleHandler = `
  const togglePermission = async (field: string, value: boolean) => {
    if (!settings) return;
    const newSettings = { ...settings, [field]: value };
    setSettings(newSettings);
    setSavingSettings(true);
    try {
      await apiClient.put('/api/settings', newSettings);
      toast.success('Permission updated');
    } catch (err) {
      toast.error('Failed to update permission');
      setSettings(settings); // revert
    } finally {
      setSavingSettings(false);
    }
  };

  const TermToggle = ({ label, field }: { label: string, field: string }) => {
    const isEnabled = settings?.[field] || false;
    return (
      <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200 shadow-sm transition-colors hover:border-indigo-300">
        <span className="text-sm font-semibold text-slate-700">{label}</span>
        <button
          onClick={() => togglePermission(field, !isEnabled)}
          className={\`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none \${isEnabled ? 'bg-indigo-600' : 'bg-slate-300'}\`}
        >
          <span className={\`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform \${isEnabled ? 'translate-x-4' : 'translate-x-1'}\`} />
        </button>
      </div>
    );
  };
`;

code = code.replace(
  /const fetchReportCards = \(\) => \{/,
  toggleHandler + '\n  const fetchReportCards = () => {'
);

// 4. JSX Injection
const jsxInjection = `
      {/* Term Permissions */}
      {settings && (
        <Card className="border-indigo-100 bg-indigo-50/50 shadow-sm">
          <CardHeader className="pb-3 border-b border-indigo-100/50">
            <CardTitle className="text-sm font-bold text-indigo-900 flex items-center justify-between">
              <span>Teacher Term Access Permissions</span>
              {savingSettings && <span className="text-xs text-indigo-500 font-normal animate-pulse">Saving...</span>}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <TermToggle label="First Unit Test" field="firstUnitTestEnabled" />
              <TermToggle label="First Term" field="firstTermEnabled" />
              <TermToggle label="Second Unit Test" field="secondUnitTestEnabled" />
              <TermToggle label="Overall Result" field="overallResultEnabled" />
            </div>
          </CardContent>
        </Card>
      )}
`;

code = code.replace(
  /\{\/\* Filter Bar \*\/\}/,
  jsxInjection + '\n\n      {/* Filter Bar */}'
);

fs.writeFileSync('frontend/src/pages/admin/ReportCardManagement.tsx', code);
console.log('Admin UI updated');
