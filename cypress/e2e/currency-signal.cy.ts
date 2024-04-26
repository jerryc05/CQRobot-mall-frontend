import { getBySel, getBySelLike } from './util'

describe('currency signal', () => {
  it('currency text in checkout should change once modified', () => {
    cy.visit('/')

    getBySel('currency-selected').then(el => {
      verify(el.text())
    })

    getBySelLike('currency-btn-').then(btns => {
      for (const btn of btns) {
        getBySel(`currency-btn-${btn.textContent}`).click({ force: true })
        verify(btn.textContent || '')
      }
    })
  })
})

function verify(text: string) {
  getBySel('currency-in-checkout').should('have.text', text)
  getBySel(`currency-btn-${text}`).should('have.class', 'hidden')
}
