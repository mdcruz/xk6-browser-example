import { chromium } from 'k6/x/browser'
import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.0/index.js'

export default function () {
  describe('Restful Booker Platform - Make a Booking', () => {
    const browser = chromium.launch({ headless: false })
    const context = browser.newContext()
    const page = context.newPage()

    page.setViewportSize({
      width: 1512,
      height: 945
    })

    page.goto('https://automationintesting.online/', { waitUntil: 'networkidle' })
    page.waitForLoadState();

    // click the book button
    page.$('//button[text()="Book this room"]').click()

    // select today's date
    page.waitForSelector('//button[text()="Today"]')
    page.$('//button[text()="Today"]').click()

    // fill in the form
    page.$('input[name="firstname"]').type('Marie')
    page.$('input[name="lastname"]').type('Drake')
    page.$('input[name="email"]').type('test@123.com')
    page.$('input[name="phone"]').type('01234567890')

    // make the booking
    page.$('.btn-outline-primary.book-room').click()

    // wait for error message (bug in the system)
    page.waitForSelector('.alert-danger')
    expect(page.$('.alert-danger').innerText()).to.contain('must not be null')

    page.screenshot({ path: 'screenshots / 01_room-booking.png' })

    page.close()
    browser.close()
  })
}
