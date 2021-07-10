/// <reference types="cypress" />

it('prints null', () => {
  cy.visit('index.html')
  // ⛔️ INCORRECT - PRINTS NULL
  let username = null
  cy.get('#username').then(($el) => (username = $el.text()))
  cy.log(username) // always prints null ⚠️
})

it('prints null with event trace', () => {
  cy.on('command:enqueued', ({ name, args }) => {
    console.log(`ENQUEUED ${name}: ${args}`)
  })
  cy.on('command:start', ({ attributes: { name, args } }) => {
    console.log(`START ${name}: ${args}`)
  })
  cy.visit('index.html')
  // ⛔️ INCORRECT - PRINTS NULL
  let username = null
  cy.get('#username').then(($el) => (username = $el.text()))
  cy.log(username) // always prints null ⚠️
})

it('prints the text', () => {
  cy.visit('index.html')
  // ✅ CORRECT - prints "Mary"
  let username = null
  cy.get('#username')
    .then(($el) => (username = $el.text()))
    .then(() => {
      // by this point the "username" primitive variable
      // has been set, and the call is made cy.log("Mary")
      cy.log(username)
    })
})

it('prints text with event trace', () => {
  cy.on('command:enqueued', ({ name, args }) => {
    console.log(`ENQUEUED ${name}: ${args}`)
  })
  cy.on('command:start', ({ attributes: { name, args } }) => {
    console.log(`START ${name}: ${args}`)
  })
  cy.visit('index.html')
  // ✅ CORRECT - prints "Mary"
  cy.get('#username')
    .invoke('text')
    // avoid printing internals of cy.log in the trace
    .then((s) => cy.log(s))
})
