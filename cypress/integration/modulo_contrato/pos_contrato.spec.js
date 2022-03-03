/// <reference types="cypress" />


describe('Coral', function () {

    beforeEach(function () {
        cy.visit('https://homologcoral.aluguefoco.com.br/') //Visistar o site
        cy.get('#user').type('wfn') //busca pelo id do elemento
        cy.get('#password').type('Wf@2011840')
        cy.server();
        cy.route('POST', '**/precificacao').as('homepage')
        cy.get('span').click()
        cy.wait(2000)
        cy.log('Login com Sucesso')

        cy.fixture('fixtures-demo/cod_contrato').then(numeroContrato => {

            this.numeroContrato = numeroContrato;

        })



    })

    it('Encerrar Contrato', function () {
        //Tela de Busca do contrato
        cy.get(':nth-child(7) > a').click()
        cy.get('#tab-ra-list').click()
        cy.get('.form-control').type(this.numeroContrato.cod)
        cy.get('.form-control').type('{enter}')
        cy.get('#tableCRUDEdit-0 > .fas').click()
        cy.wait(3000)
        cy.get('.new-items-header > .btn').click()
        cy.get('foco-reservation-extra-items').should('be.visible')
        cy.get('#ngb-tab-4').click()
        cy.get('[type="checkbox"]').check({ force: true })
        cy.get('[type="checkbox"]').should('be.checked')
        cy.get('#ngb-tab-4-panel > .item-tab > table > tbody > tr > :nth-child(5) > .form-control').type('90')
        cy.get('.modal-footer > .btn-primary').click()
        cy.get(':nth-child(3) > .step-icon').click()
        cy.get(':nth-child(2) > .ra-customer-info > .ra-customer-info-title').should('be.visible')

        //Tela de Pagamento

        //Quando a pagamento pendente
        cy.get('.to-paid > .ra-resume-value-price').then($resumoValor => {
            const resumeValorText = $resumoValor.text().replace('R$', '')
            cy.log(resumeValorText)
            cy.wrap(resumeValorText).as('valorWrap')
            //cy.get('.ra-customer-info-body > .justify-content-between > :nth-child(2) > :nth-child(2)').click()
            //cy.get('#discountReasonDescription').type(resumeValorText) 
            cy.get(':nth-child(2) > .ra-customer-info > .ra-customer-info-body > .justify-content-between > :nth-child(1) > :nth-child(2)').click()
            cy.get('.col-12 > .btn-group > :nth-child(1)').click()
            //cy.get('.col-12 > .btn-group > .btn-primary').click()
            cy.get('#cardName').type('teste')
            cy.get('#cardNumber').type('4444333322221111')
            cy.get('#cardExpirationDate').type('1029')
            cy.get('#cardCvv').type('364')
            cy.get(':nth-child(2) > foco-form-input > .form-group > .d-flex > #paymentValue').type(resumeValorText)
            cy.get(':nth-child(3) > foco-form-dropdown > .form-group > #paymentInstallments > .d-inline-block > #dropdownBasic1').click()
            cy.get(':nth-child(3) > foco-form-dropdown > .form-group > #paymentInstallments > .d-inline-block > .dropdown-menu > :nth-child(2) > perfect-scrollbar > .ps > .ps-content > :nth-child(1) > div > span').click()
            cy.get('#transactionNumber').type('859')
            cy.get('.justify-content-end > .btn').click()
            cy.get('foco-rent-agreement-payment.w-100 > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(3)').should('be.visible')
        })
        cy.get('.justify-content-between > :nth-child(2) > .btn-primary').click()
        cy.get('foco-confirm-modal').should('be.visible')
        cy.get('.modal-footer > .btn-primary').click()
        cy.get('foco-reservation-created').should('be.visible')
        cy.get('#ngb-panel-1-header > .align-items-center > .btn > .d-flex > h5').click()
        cy.get('.card-body > .row > :nth-child(1) > .btn').click
        cy.get('.row > :nth-child(1) > .btn').click()

    })

})