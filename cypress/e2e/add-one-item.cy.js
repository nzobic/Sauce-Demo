describe('Sauce-Demo Test', () => {

    it('Add One Item to the Cart and Proceed to Checkout', () => {

        //Login
        cy.visit('https://www.saucedemo.com/')
        cy.get('#user-name').type('standard_user')
        cy.get('#password').type('secret_sauce')
        cy.get('#login-button').click()

        //Add Item to the Cart
        cy.get('.inventory_list div:nth-child(3) button').click()

        //Click the Cart
        cy.get('.shopping_cart_link').click()

        //Assert: Price
        cy.get('.inventory_item_price').should('have.text', '$15.99')

        //Proceed to Checkout
        cy.get('#checkout').click()

        //Enter Checkout Information
        cy.get('#first-name').type('Jane')
        cy.get('#last-name').type('Walmart')
        cy.get('#postal-code').type('12345')
        cy.get('[data-test="continue"]').click()

        //Chekout Overview: Assert Price, Tax and Total Price
        cy.get('.summary_subtotal_label').then((Price) => {
            var subtotal = parseFloat(Price.text().replace('Item total: $', ''))
            //   cy.log(subtotal);
            //   cy.log(typeof subtotal)

            var tax = (subtotal / 100) * 8
            tax = parseFloat(tax.toFixed(2))

            var total = subtotal + tax
            cy.get('div.summary_total_label').should('have.text', 'Total: $' + total)
        })

        //Finish Checkout
        cy.get('#finish').click()

        //Assert: Order is Finished
        cy.get('.complete-header').should('have.text', 'THANK YOU FOR YOUR ORDER')
        cy.get('#back-to-products').should('exist')

    })
    
})
