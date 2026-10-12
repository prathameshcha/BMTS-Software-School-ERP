const fs = require('fs');
let code = fs.readFileSync('frontend/src/pages/admin/ReportCardManagement.tsx', 'utf8');

const injection = `
  useEffect(() => {
    apiClient.get('/api/settings').then(res => setSettings(res.data.data)).catch(console.error);
  }, []);
`;

if (!code.includes("apiClient.get('/api/settings')")) {
  code = code.replace(
    /const fetchReportCards = \(\) => \{/,
    injection + '\n  const fetchReportCards = () => {'
  );
  fs.writeFileSync('frontend/src/pages/admin/ReportCardManagement.tsx', code);
  console.log('Injected missing useEffect');
} else {
  console.log('Already there');
}
