/// <reference types="cypress" />


const armazena_contrato = 'cypress/fixtures/fixtures-demo/cod_contrato.json'

describe('Encerrar um Contrato', function () {

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
        cy.readFile(armazena_contrato).then(function(numContrato){
            cy.log(numContrato.cod)
            cy.get('.form-control').type(numContrato.cod)
            cy.get('.form-control').type('{enter}')
        }) 
        cy.get('#tableCRUDEdit-0').click()
        cy.wait(3000)

        //Tela de Dados de Locação
        cy.get('.mx-0 > :nth-child(1) > .btn').as('botao').should('be.visible')
        cy.wait(300)
        cy.get('.mx-0 > :nth-child(1) > .btn').click()
        cy.get('foco-rent-agreement-edit-dates').should('be.visible')
        cy.get(':nth-child(2) > .form-group > :nth-child(1) > :nth-child(1) > .d-flex > :nth-child(2) > .input-group > .input-group-append > .btn > .far')
            .as('data_devolucao').should('be.visible').click({ multiple: true })
        //cy.get('[aria-label="26/3/2022"] > .btn-light').click()
        cy.get('.ngb-dp-today > .btn-light').click({force: true})
        cy.get('.d-flex > .ng-valid[type="time"]').type('09:41')
        cy.get('.modal-footer > .d-flex > .btn-primary').click()
        cy.get(':nth-child(1) > .step-icon > .step-subicon > .fas').should('be.visible')

        //Tela de Devolução de Carros/Itens
        cy.get('.align-items-center > .fa-car').click()
        cy.get('#currentKm').type('4000')
        cy.get('#currentFuel').type('8')
        cy.get('.rar-result > .w-100 > :nth-child(1)').click()
        cy.get(':nth-child(5) > .step-icon').click()

        //Tela de Pagamento

        //Quando se tem um valor a Restituir
        cy.get('.ra-customer-info-body > .justify-content-between > :nth-child(2) > :nth-child(3)').click()
        cy.get('.justify-content-end > span > .btn').click({ force: true })

        //Quando a pagamento pendente
         // cy.get('.to-paid > .ra-resume-value-price').then($resumoValor =>{
        //     const resumeValorText = $resumoValor.text().replace('R$', '')
        //     cy.log(resumeValorText)
        //     cy.wrap(resumeValorText).as('valorWrap')
        // //cy.get('.ra-customer-info-body > .justify-content-between > :nth-child(2) > :nth-child(2)').click()
        // //cy.get('#discountReasonDescription').type(resumeValorText) 
        // cy.get(':nth-child(2) > .ra-customer-info > .ra-customer-info-body > .justify-content-between > :nth-child(1) > :nth-child(2)').click()
        // cy.get('.col-12 > .btn-group > :nth-child(1)').click()
        // //cy.get('.col-12 > .btn-group > .btn-primary').click()
        // cy.get('#cardName').type('teste')
        // cy.get('#cardNumber').type('4444333322221111')
        // cy.get('#cardExpirationDate').type('1029')
        // cy.get('#cardCvv').type('100')
        // cy.get(':nth-child(2) > foco-form-input > .form-group > .d-flex > #paymentValue').type(resumeValorText)
        // cy.get(':nth-child(3) > foco-form-dropdown > .form-group > #paymentInstallments > .d-inline-block > #dropdownBasic1').click()
        // cy.get(':nth-child(3) > foco-form-dropdown > .form-group > #paymentInstallments > .d-inline-block > .dropdown-menu > :nth-child(2) > perfect-scrollbar > .ps > .ps-content > :nth-child(1) > div > span').click()
        // cy.get('#transactionNumber').type('1632')
        // cy.get('.justify-content-end > .btn').click()
        // cy.get('foco-rent-agreement-payment.w-100 > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(3)').should('be.visible')

        cy.get('.col-12 > .justify-content-between > :nth-child(2) > .btn-primary').click()
        cy.get('foco-confirm-modal').should('be.visible')
        cy.get('.modal-footer > .btn-primary').click()
        cy.get('foco-reservation-created').should('be.visible')
        cy.get('#ngb-panel-1-header > .align-items-center > .btn > .d-flex > h5').click()
        cy.get('.card-body > .row > :nth-child(1) > .btn').click
        cy.get('.modal-footer > .btn').click()


    })

})
