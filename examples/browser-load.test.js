import launcher from 'k6/x/browser'

export const options = {
  stages: [
    { duration: '30s', target: 5 },
    { duration: '1m', target: 10 },
    { duration: '30s', target: 0 }
  ],
  thresholds: {
    browser_dom_content_loaded: ['p(90) < 4000'],
    browser_first_contentful_paint: ['max < 4000']
  }
}

export default function () {
  const browser = launcher.launch('chromium', { headless: true })
  const context = browser.newContext()
  const page = context.newPage()

  page.goto('https://mariedrake.com', { waituntil: 'networkidle' })
}