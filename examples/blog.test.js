import launcher from 'k6/x/browser'
import { describe } from 'https://jslib.k6.io/k6chaijs/4.3.4.0/index.js'

export default function () {
  describe('Blog - navigate to different urls', () => {
    const browser = launcher.launch('chromium', { headless: false })

    const context = browser.newContext()
    const page = context.newPage()

    page.setViewportSize({
      width: 1512,
      height: 945
    })

    page.goto('https://mariedrake.com', { waituntil: 'networkidle' })

    page.screenshot({ path: 'screenshots / 03_blog_homepage.png' })

    // the test is clicking the element but ultimately fails `Exception raised "clicking on element: timed out"`
    page.$('[data-testid="linkElement"][href="https://www.mariedrake.com/courses"]').click()
    page.waitForNavigation()

    page.screenshot({ path: 'screenshots / 04_blog_courses.png' })
  })
}
