import { check } from 'k6';
import { chromium } from 'k6/x/browser';

export const options = {
  stages: [
    { duration: '10m', target: 30 },
    { duration: '10m', target: 30 },
    { duration: '10m', target: 5 }
  ],
  thresholds: {
    'http_req_duration{load_zone:amazon:us:ashburn}': ['p(95)<500'],
    'http_req_duration{load_zone:amazon:ie:dublin}': ['p(95)<800'],
  },
  ext: {
    loadimpact: {
      projectID: 3026,
      distribution: {
        distributionLabel1: { loadZone: 'amazon:us:ashburn', percent: 50 },
        distributionLabel2: { loadZone: 'amazon:ie:dublin', percent: 50 }
      },
      note: 'Marie test'
    }
  }
}

export default function () {
  const browser = chromium.launch({ slowMo: '500ms' });
  const page = browser.newPage();

  page.goto('https://test.k6.io/my_messages.php', { waitUntil: 'networkidle' });

  // Enter login credentials and login
  page.locator('input[name="login"]').type('admin');
  page.locator('input[name="password"]').type('123');
  const submitBtn = page.locator('input[type="submit"]');

  Promise.all([
    page.waitForNavigation(),
    submitBtn.click(),
  ]).then(() => {
    check(page, {
      'header': page.locator('h2').textContent() == 'Welcome, admin!',
    });
  }).finally(() => {
    page.close();
    browser.close();
  });
}