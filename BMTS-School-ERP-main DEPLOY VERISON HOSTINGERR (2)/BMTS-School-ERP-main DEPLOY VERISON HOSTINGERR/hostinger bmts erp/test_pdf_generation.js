const http = require('http');
const fs = require('fs');
const path = require('path');

async function testPdfEndpoint() {
  // First login as admin to get auth token
  const loginData = JSON.stringify({ login: 'admin@mtfschool.edu', password: 'Admin@123' });
  const token = await new Promise((resolve, reject) => {
    const req = http.request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/auth/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': loginData.length
      }
    }, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          if (json.success) resolve(json.data.token || json.data.accessToken);
          else reject(new Error(json.error || 'Login failed'));
        } catch (e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.write(loginData);
    req.end();
  });

  console.log('Got auth token successfully');

  // Test downloading PDF for 3rd class student and 10th class student
  const testCases = [
    { class: 'Jr.KG', rcId: '1f08e14d-ffa5-4be2-ab83-5e93868517f3' },
    { class: '3rd', rcId: '0c793850-0113-4377-8813-327f96a417e3' },
    { class: '10th', rcId: '24b76759-6065-49d4-9a4d-582909742fdb' }
  ];

  for (const tc of testCases) {
    console.log(`\nTesting PDF generation for ${tc.class} (ID: ${tc.rcId})...`);
    await new Promise((resolve, reject) => {
      const req = http.request({
        hostname: 'localhost',
        port: 3000,
        path: `/api/pdf/report-card/${tc.rcId}`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }, res => {
        const chunks = [];
        res.on('data', chunk => chunks.push(chunk));
        res.on('end', () => {
          const buffer = Buffer.concat(chunks);
          console.log(`Status: ${res.statusCode}, Content-Type: ${res.headers['content-type']}, Size: ${buffer.length} bytes`);
          if (res.statusCode === 200 && res.headers['content-type']?.includes('application/pdf')) {
            const outPath = path.join(__dirname, `report_card_${tc.class.replace('.', '')}.pdf`);
            fs.writeFileSync(outPath, buffer);
            console.log(`Saved PDF to ${outPath}`);
            resolve();
          } else {
            console.error('Error response:', buffer.toString('utf8'));
            reject(new Error(`Failed with status ${res.statusCode}`));
          }
        });
      });
      req.on('error', reject);
      req.end();
    });
  }

  console.log('\nAll PDF tests passed successfully!');
}

testPdfEndpoint().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
