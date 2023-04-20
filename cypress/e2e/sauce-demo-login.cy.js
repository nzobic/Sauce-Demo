describe('Sauce-Demo Test', () => {
  
it('Login', () => {
    
    cy.fixture('sauce-demo-login.json').then((data) => {

//Login
    
    cy.visit('https://www.saucedemo.com/')
    
    for (let i = 0; i<data.credentials.length; i++) {     
        cy.get('#user-name').eq(i).type(data.credentials[i].username)
        cy.get('#password').eq(i).type(data.credentials[i].password)
        cy.get('#login-button').click()

        cy.go('back')
    }

    })

    

})

})