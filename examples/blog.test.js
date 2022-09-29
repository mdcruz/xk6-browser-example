import { chromium } from 'k6/x/browser'
import { describe } from 'https://jslib.k6.io/k6chaijs/4.3.4.0/index.js'
import { sleep } from 'k6'

export default function () {
  describe('Blog - navigate to different urls', () => {
    const browser = chromium.launch({
      headless: false,
      slowMo: '500ms'
    })

    const context = browser.newContext()
    const page = context.newPage()

    page.setViewportSize({
      width: 1512,
      height: 945
    })

    page.goto('https://testingwithmarie.com', { waituntil: 'networkidle' })

    page.screenshot({ path: 'screenshots / 03_blog_homepage.png' })

    const courseButton = page.$('[data-testid="linkElement"][href="https://www.testingwithmarie.com/courses"]')

    Promise.all([
      page.waitForNavigation(),
      courseButton.click(),
    ]).then(() => {
      sleep(1)
      page.screenshot({ path: 'screenshots / 04_courses.png' })
    }).finally(() => {
      page.close();
      browser.close();
    });
  })
}
