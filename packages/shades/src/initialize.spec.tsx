/* eslint-disable prefer-destructuring */
/* eslint-disable no-global-assign */
import { Injector } from '@furystack/inject'
import { usingAsync } from '@furystack/utils'
import '@furystack/logging'
import { createComponent, initializeShadeRoot } from './'
import { JSDOM } from 'jsdom'

describe('Initialize', () => {
  it('Should work with a text node', async () => {
    await usingAsync(new Injector(), async (i) => {
      const dom = new JSDOM('<div id="root"></div>', {})
      document = dom.window.document
      customElements = dom.window.customElements
      i.useLogging()
      initializeShadeRoot({
        injector: i,
        rootElement: document.getElementById('root') as HTMLElement,
        jsxElement: <div id="hello">Hello</div>,
      })
      const element = document.getElementById('hello')
      expect(element).toBeInstanceOf(HTMLElement)
      expect(element?.innerText).toBe('Hello')
    })
  })
})
