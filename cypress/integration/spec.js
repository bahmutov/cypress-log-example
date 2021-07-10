/// <reference types="cypress" />

it('prints the text', () => {
  cy.visit('index.html')
  // ⛔️ INCORRECT - PRINTS NULL
  let username = null
  cy.get('#username').then(($el) => (username = $el.text()))
  cy.log(username) // always prints null ⚠️
})
