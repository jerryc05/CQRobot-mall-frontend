export const getBySel = (selector: string) => cy.get(`[data-test=${selector}]`)

export const getBySelLike = (selector: string) =>
  cy.get(`[data-test*=${selector}]`)
