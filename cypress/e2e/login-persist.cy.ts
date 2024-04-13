import { getBySel } from './util'

const access_token = {
  access_token: 'fake_access_token',
  token_type: 'bearer',
}

const me = {
  email: 'email@example.com',
  first_name: 'first_name',
  last_name: 'last_name',
  phone_number: '12312341234',
}

describe('login spec', () => {
  it('persist login state after refresh', () => {
    cy.intercept('POST', '/api/users/login', {
      statusCode: 200,
      body: access_token,
    })

    cy.intercept('GET', '/api/users/me', req => {
      if (
        req.headers.authorization ===
        `${access_token.token_type} ${access_token.access_token}`
      )
        req.reply(me)
      else req.reply(401)
    })

    cy.visit('/login')
    getBySel('email').type(me.email)
    getBySel('password').type('password')
    getBySel('submit').click()

    const check_firstname = () =>
      getBySel('firstname_in_header').should('have.text', me.first_name)

    cy.url().should('eq', `${Cypress.config().baseUrl}/`)
    check_firstname()
    cy.reload()
    check_firstname()
  })
})
