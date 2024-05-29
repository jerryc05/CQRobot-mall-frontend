import type { product_detail } from '@/api'
import { getBySel, randInt, randStr } from './util'

const product: Awaited<ReturnType<typeof product_detail>> = {
  id: randInt(999),
  model: `model-${randStr(5)}`,
  sku: `sku-${randStr(5)}`,
  mpn: `mpn-${randStr(5)}`,
  quantity: randInt(999),
  stock_status_id: randInt(999),
  image_url:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=',
  manufacturer_id: randInt(999),
  price: randInt(999) + randInt(99) / 100,
  weight_grams: randInt(999) + randInt(99) / 100,
  sold_count: randInt(999),
  date_available: new Date(randInt(9999999999)),
  date_added: new Date(randInt(9999999999)),
  date_modified: new Date(randInt(9999999999)),
}

before(() => {
  cy.intercept('GET', '/api/products/id/1', req => {
    req.reply(product)
  })
})

describe('products api', () => {
  it('correctly show products api return values', () => {
    cy.visit('/products/1')
    getBySel('model').should('have.text', product.model)
    getBySel('sku').should('have.text', product.sku)
    getBySel('mpn').should('have.text', product.mpn)
    getBySel('image_el').should('have.attr', 'src', product.image_url)
    getBySel('price').should('have.text', product.price.toString())
    getBySel('weight_grams').should('have.text', product.weight_grams)
    getBySel('sold_count').should('have.text', product.sold_count)
    getBySel('quantity').should('have.text', product.quantity)
  })
})
