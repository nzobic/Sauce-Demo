describe('Sauce-Demo Test', () => {

    it('Login', () => {

        cy.fixture('sauce-demo-login.json').then((data) => {

        //Login
        cy.visit('https://www.saucedemo.com/')

        // cy.get('#user-name').eq(0).type(data.userData[i].username)

        for (let i = 0; i < data.userData.length; i++) {
            cy.get('#user-name').type(data.userData[i].username)
            cy.get('#password').type(data.userData[i].password)
            cy.get('#login-button').click()

            cy.url().should('contain', '/inventory')
            cy.go('back')
        }
    
        })
    
    })

})