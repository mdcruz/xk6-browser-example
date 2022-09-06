import { chromium } from 'k6/x/browser'
import { expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.0/index.js'

export default function () {
  const browser = chromium.launch({ headless: false })
  const page = browser.newPage()

  page.goto('https://todomvc.com/examples/react/#/')

  const newTodo = page.locator('.new-todo')
  newTodo.type('example todo')
  newTodo.press('Enter')

  expect(page.locator('.todo-list li').innerText()).to.equal('example todo')

  page.screenshot({ path: 'screenshots/07_todo-app.png' })
  page.close()
  browser.close()
}