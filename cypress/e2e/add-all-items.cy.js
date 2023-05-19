describe('Sauce-Demo Test', () => {

    it('Add All Items to the Cart and Proceed to Checkout', () => {

        cy.fixture('sauce-demo-items.json').then((data) => {

        //Login
        cy.visit('https://www.saucedemo.com/')
        cy.get('#user-name').type('standard_user')
        cy.get('#password').type('secret_sauce')
        cy.get('#login-button').click()

        //Add All Items to the Cart
        cy.get('.btn_inventory').then((listing) => {
            let count = listing.length
            for (let i = 0; i < count; i++) {
                    cy.get('.btn_inventory').eq(i).click()
            }
        })

        //Click the Cart
        cy.get('.shopping_cart_link').click()

        //Assert: Item Names and Prices

        for (let i = 0; i < data.items.length; i++) {
            cy.get('.inventory_item_name').eq(i).should('have.text', data.items[i].name)
            cy.get('.inventory_item_price').eq(i).should('have.text', data.items[i].price)
        }

        //Proceed to Checkout
        cy.get('#checkout').click()

        //Enter Checkout Information
        cy.get('#first-name').type('Jane')
        cy.get('#last-name').type('Walmart')
        cy.get('#postal-code').type('12345')
        cy.get('[data-test="continue"]').click()

        //Chekout Overview: Assert Items Price, Tax and Total Price

        let ItemsTotal = 0
        for (let i = 0; i < data.items.length; i++) {
            ItemsTotal += parseFloat((data.items[i].price).replace('$', ''))
            cy.log(ItemsTotal)
        }

        cy.get('.summary_subtotal_label').should('have.text', 'Item total: $' + ItemsTotal)

        var tax = (ItemsTotal / 100) * 8
        tax = parseFloat(tax.toFixed(2))

        var total = ItemsTotal + tax
        cy.get('.summary_info_label.summary_total_label').should('have.text', 'Total: $' + total)


        //Finish Checkout
        cy.get('#finish').click()

        //Assert: Order is Finished
        cy.get('.complete-header').should('have.text', 'Thank you for your order!')
        cy.get('#back-to-products').should('exist')

        })

    })
    
})