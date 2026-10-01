import puppeteer from 'puppeteer';
import http from 'http';

// Wait for the Next.js server to be up with a 30s timeout
const waitForServer = (url, timeoutMs = 30000) => new Promise((resolve, reject) => {
  console.log(`Waiting for ${url} to be ready...`);
  const startTime = Date.now();
  const interval = setInterval(() => {
    if (Date.now() - startTime > timeoutMs) {
      clearInterval(interval);
      reject(new Error(`Timed out waiting for server at ${url} after ${timeoutMs / 1000}s`));
      return;
    }

    http.get(url, (res) => {
      if (res.statusCode === 200) {
        clearInterval(interval);
        console.log(`Server at ${url} is ready.`);
        resolve();
      }
    }).on('error', () => {
      // Ignore connection errors and keep retrying until timeout
    });
  }, 1000);
});

async function generatePDF() {
  const port = process.env.PORT || 3000;
  const targetUrl = `http://localhost:${port}/resume`;
  await waitForServer(targetUrl);

  console.log('Generating PDF...');
  
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  
  const page = await browser.newPage();
  
  // Force next-themes to use light mode by setting localStorage before the page loads
  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('theme', 'light');
  });
  
  // Wait until network is idle to ensure fonts and styles are loaded
  await page.goto(targetUrl, { waitUntil: 'networkidle0' });

  // Force light mode to prevent dark background boxes
  await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'light' }]);
  await page.evaluate(() => {
    document.documentElement.classList.remove('dark');
    document.documentElement.style.setProperty('background', '#fff', 'important');
    document.body.style.setProperty('background', '#fff', 'important');
    
    const style = document.createElement('style');
    style.innerHTML = `
      @media print {
        html, body, main {
          background: #fff !important;
        }
      }
    `;
    document.head.appendChild(style);
  });

  // Generate the PDF
  await page.pdf({
    path: 'public/resume.pdf',
    format: 'A4',
    printBackground: true,
    margin: {
      top: '20px',
      bottom: '20px',
      left: '20px',
      right: '20px'
    }
  });

  await browser.close();
  console.log('PDF successfully generated at public/resume.pdf');
}

generatePDF().catch(err => {
  console.error('Failed to generate PDF:', err);
  process.exit(1);
});
