export const getBySel = (selector: string) => cy.get(`[data-test=${selector}]`)

export const getBySelLike = (selector: string) =>
  cy.get(`[data-test*=${selector}]`)

export const randInt = (max: number) => Math.floor(Math.random() * max)

export function randStr(length?: number): string {
  const x = btoa(new Date().toString())
  if (length == null) return x
  if (length <= x.length) return x.substring(0, length)
  return x + randStr(length - x.length)
}
