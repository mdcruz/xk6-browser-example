import { chromium } from 'k6/x/browser'
import { describe } from 'https://jslib.k6.io/k6chaijs/4.3.4.0/index.js'

export default function () {
  describe('Blog - navigate to different urls', () => {
    const browser = chromium.launch({ headless: false })

    const context = browser.newContext()
    const page = context.newPage()

    page.setViewportSize({
      width: 1512,
      height: 945
    })

    page.goto('https://the-internet.herokuapp.com/frames', { waituntil: 'networkidle' })
    page.frame('#mce_0_ifr')

    page.close()
    browser.close()
  })
}
