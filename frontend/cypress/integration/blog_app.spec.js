describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'superuser',
      username: 'gaurav987',
      password: 'test'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function() {
    cy.contains('login')
  })

describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login')
        .click()
      cy.get('#username')
        .type('gaurav987')
      cy.get('#password')
        .type('test')
      cy.get('#login')
        .click()
      cy.contains('superuser logged-in')
    })

    it('login fails with wrong password', function() {
      cy.contains('login')
        .click()
      cy.get('#username')
        .type('gaurav987')
      cy.get('#password')
        .type('wrong')
      cy.get('#login')
        .click()

      cy.get('html').should('not.contain', 'superuser logged-in')
    })
  })

  Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', 'http://localhost:3003/api/login', {
      username, password
    }).then(({ body }) => {
      localStorage.setItem('loggedNoteappUser', JSON.stringify(body))
      cy.visit('http://localhost:3000')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'gaurav987', password: 'test' })
    })

    it('a blog can be created', function() {
      cy.get('#newBlog')
        .click()
      cy.get('#title').type('First class tests')
      cy.get('#author').type('Edsger W. Dijkstra')
      cy.get('#url').type('http://www.google.Harmful.html')
      cy.contains('save')
        .click()

      cy.contains('First class tests - Edsger W. Dijkstra')
    })

    it('user can like a blog', function() {
      cy.get('#newBlog')
        .click()
      cy.get('#title')
        .type('First class tests')
      cy.get('#author')
        .type('Edsger W. Dijkstra')
      cy.get('#url')
        .type('http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html')
      cy.contains('save')
        .click()

      cy.contains('First class tests - Edsger W. Dijkstra')
        .click()
      cy.contains('show')
        .click()
      cy.contains('0')
      cy.get('#like')
        .click()
      cy.contains('1')
    })

      
  })
  
     
})