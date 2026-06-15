import puppeteer from 'puppeteer';
import http from 'http';

// Simple wait for the Next.js server to be up
const waitForServer = (url) => new Promise((resolve) => {
  console.log(`Waiting for ${url} to be ready...`);
  const interval = setInterval(() => {
    http.get(url, (res) => {
      if (res.statusCode === 200) {
        clearInterval(interval);
        console.log(`Server at ${url} is ready.`);
        resolve();
      }
    }).on('error', () => {
      // Ignore errors and keep trying
    });
  }, 1000);
});

async function generatePDF() {
  const targetUrl = 'http://localhost:3000/resume';
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
