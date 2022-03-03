/// <reference types="cypress" />



describe('Flag Renovacao', function() {

    beforeEach(function() {
        cy.visit('https://homologcoral.aluguefoco.com.br/') //Visistar o site
        cy.get('#user').type('wfn') //busca pelo id do elemento
        cy.get('#password').type('Wf@2011840')
        cy.server();
        cy.route('POST', '**/precificacao').as('homepage')
        cy.get('span').click()
        cy.wait(2000)
        cy.log('Login com Sucesso')

        cy.fixture('fixtures-demo/cod_reserva').then(numeroReserva => {
            
            this.numeroReserva = numeroReserva;

        })


    })


    it('Editar Reserva', function() {

        cy.get(':nth-child(6) > a > .fas').click()
        cy.get('#tab-list').click()
        cy.wait(3000)
        cy.get('.reservation-search-area > .d-flex > .form-control').click()
        cy.get('.reservation-search-area > .d-flex > .form-control').type(this.numeroReserva.cod)
        cy.get('.reservation-search-area > .d-flex > .form-control').type('{enter}')
        cy.get('#tableCRUDEdit-0').click()
        // cy.get('foco-confirm-modal').should('be.visible')
        // cy.get('.modal-footer > .btn-outline-primary').click()
        //cy.get('[type="checkbox"][value="false"]').should('be.checked')
        cy.get('[type="checkbox"]').uncheck({ force: true })
        cy.get('.customer-area > :nth-child(3) > div > :nth-child(2').contains('34733021046')
        cy.get('.align-items-end > div.w-100 > .btn')
            .click().should('be.visible')
        cy.get('.justify-content-between > .d-flex > .btn-sm').click()

    })


})