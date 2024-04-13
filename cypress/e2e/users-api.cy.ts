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

before(() => {
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

  cy.intercept('POST', '/api/users/logout', req => {
    if (
      req.headers.authorization ===
      `${access_token.token_type} ${access_token.access_token}`
    )
      req.reply('')
    else req.reply(401)
  })

  cy.intercept('POST', '/api/users/refresh_token', req => {
    if (
      req.headers.authorization ===
      `${access_token.token_type} ${access_token.access_token}`
    ) {
      access_token.access_token += '_'
      req.reply(access_token)
    } else req.reply(401)
  })
})

describe('login api', () => {
  it('persist login/logout state after refresh', () => {
    cy.visit('/login')
    getBySel('email').type(me.email)
    getBySel('password').type('password')
    getBySel('submit').click()

    //
    //

    const check_logged_in_firstname = () =>
      getBySel('firstname_in_header').should('have.text', me.first_name)

    cy.url().should('eq', `${Cypress.config().baseUrl}/`)
    check_logged_in_firstname()
    cy.reload()
    check_logged_in_firstname()

    //
    //

    getBySel('logout').click()
    check_not_logged_in()
    cy.reload()
    check_not_logged_in()
  })

  it('default not logged in', () => {
    cy.visit('/')
    check_not_logged_in()
  })
})

function check_not_logged_in() {
  getBySel('login_in_header').should('exist')
}
