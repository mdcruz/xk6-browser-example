import { chromium } from 'k6/x/browser'
import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.0/index.js'

export default function () {
  describe('Restful Booker Platform - Submit a form', () => {
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

    page.goto(`${__ENV.BASE_URL}`, { waitUntil: 'networkidle' })
    page.waitForLoadState();

    // fill in the form
    page.$('[data-testid="ContactName"]').type('Marie')
    page.$('[data-testid="ContactEmail"]').type('test@123.com')
    page.$('[data-testid="ContactPhone"]').type('012345678912')
    page.$('[data-testid="ContactSubject"]').type('Booking Enquiry')
    page.$('[data-testid="ContactDescription"]').type('This is an enquiry for a double bed room')

    // submit and wait for confirmation
    page.$('#submitContact').click()
    page.waitForSelector('.row.contact h2')
    expect(page.$('.row.contact h2').innerText()).to.contain('Marie')

    page.screenshot({ path: 'screenshots / 01_submitForm.png' })

    page.close()
    browser.close()
  })
}
