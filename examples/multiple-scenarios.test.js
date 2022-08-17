import launcher from 'k6/x/browser'
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
  scenarios: {
    messages: {
      executor: 'constant-vus',
      exec: 'messages',
      vus: 3,
      duration: '10s',
    },
    news: {
      executor: 'constant-vus',
      exec: 'news',
      vus: 2,
      duration: '5s',
    },
  },
  thresholds: {
    'browser_dom_content_loaded{url:https://test.k6.io/my_messages.php}': ['p(90) < 1000'],
    'browser_dom_content_loaded{url:https://test.k6.io/news.php}': ['p(90) < 800'],
    browser_first_contentful_paint: ['max < 1000']
  }
};

export function messages() {
  const browser = launcher.launch('chromium', { headless: true })
  const context = browser.newContext()
  const page = context.newPage()

  page.goto('https://test.k6.io/my_messages.php', {
    // This custom tag doesn't work as expected
    tags: { customTag: 'messages' },
    waitUntil: 'networkidle'
  })

  page.screenshot({ path: 'screenshots/05_messages.png' })
}

export function news() {
  const browser = launcher.launch('chromium', { headless: true })
  const context = browser.newContext()
  const page = context.newPage()

  page.goto('https://test.k6.io/news.php', {
    // This custom tag doesn't work as expected
    tags: { customTag: 'news' },
    waitUntil: 'networkidle'
  })

  page.screenshot({ path: 'screenshots/06_news.png' })
}

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
  };
}
