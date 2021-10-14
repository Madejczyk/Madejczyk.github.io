/// <reference types="cypress" />

describe('check page', () => {
  beforeEach(() => {
    cy.visit('https://madejczyk.github.io/')
  })

  it('text should be visible', () => {
    cy.contains('I am also waiting for this...').should('be.visible')
  })
})
