const puppeteer = require('puppeteer');
const path = require('path');

async function testTeacherReportCard() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.error('PAGE ERROR:', err.message));

  console.log('Navigating to login...');
  await page.goto('http://localhost:3000/login', { waitUntil: 'networkidle0' });

  // Type login credentials
  console.log('Typing credentials...');
  await page.type('input[type="text"], input[name="login"], input[placeholder*="email" i], input[placeholder*="username" i]', 'teacher.3a@mtfschool.edu');
  await page.type('input[type="password"]', 'Faculty@123');

  // Click submit
  console.log('Submitting login...');
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle0' }).catch(() => {}),
    page.click('button[type="submit"]')
  ]);

  console.log('Current URL after login:', page.url());
  await new Promise(r => setTimeout(r, 2000));

  // Navigate to report cards
  console.log('Navigating to /faculty/report-cards...');
  await page.goto('http://localhost:3000/faculty/report-cards', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 2000));

  console.log('Current URL:', page.url());

  const screenshotPath = 'C:\\Users\\chava\\.gemini\\antigravity\\brain\\65ee59f4-a6f9-456b-a722-210bfefd76cb\\teacher_report_cards.png';
  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log('Saved screenshot to:', screenshotPath);

  // Extract page text
  const text = await page.evaluate(() => document.body.innerText);
  console.log('PAGE TEXT SAMPLE:\n', text.substring(0, 1000));

  await browser.close();
}

testTeacherReportCard().catch(console.error);
