beforeEach(() => {
  cy.visit('/')
})

it('loads', () => {
  cy.contains('h1', 'todos')
})

it('add two items', () => {
  cy.get('input.new-todo')
    .type('first todo{enter}')
  cy.get('li.todo').should('have.length', 1)
})

it('mark completed tasks', () => {
  cy.get('input.new-todo')
    .type('first todo{enter}')
    .type('second todo{enter}')
  cy.get('li.todo').should('have.length', 2)
    .first()
    .find('.toggle')
    .click()
  cy.get('li.todo').first().should('have.class', 'completed')
  cy.get('li.todo')
    .eq(1)
    .should('not.have.class', 'completed')
})

it.only('delete item', () => {
  cy.get('input.new-todo')
    .type('first todo{enter}')
    .type('second todo{enter}')
  cy.get('li.todo').should('have.length', 2)
    .first().find('button.destroy').click({force: true})
  cy.get('li.todo').should('have.length', 1)
  cy.contains('li.todo', 'first todo').should('not.exist')
  cy.contains('li.todo', 'second todo')
  cy.reload()

})