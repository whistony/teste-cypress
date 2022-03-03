/// <reference types="cypress" />

const armazena_reserva = 'cypress/fixtures/fixtures-demo/cod_reserva.json'
const armazena_contrato = 'cypress/fixtures/fixtures-demo/cod_contrato.json'
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

        cy.fixture('fixtures-demo/cod_reserva').then(numeroReserva => {

            this.numeroReserva = numeroReserva;

        })


    })


    it('Converter Contrato', function () {
        cy.get(':nth-child(7) > a').click()
        cy.wait(600)
        cy.get('#tab-list').click()
        cy.readFile(armazena_reserva).then(function(numReserva){
            cy.log(numReserva.cod)
            cy.get('.form-control').type(numReserva.cod)
            cy.get('.form-control').type('{enter}')
        })
        
        cy.get('#tableCRUDEdit-0').click()
        //Tela dados Cadastral
        //cy.get('foco-confirm-modal').should('be.visible')
        //cy.get('.modal-footer > .btn-outline-primary').click()
        cy.wait(1000)
        cy.get('#nationality > .d-inline-block > #dropdownBasic1')
            .click().should('be.visible')
        cy.get('span')
            .contains('Afghanistan').click()
        cy.get(':nth-child(6) > foco-form-date > .form-group > foco-date > #datePicker > .form-control')
            .type('10-03-1995')
        cy.get('#alias').type('SR')
        cy.get('#driverLicense').type('11111111111')
        cy.get(':nth-child(2) > foco-form-date > .form-group > foco-date > #datePicker > .form-control').type('10-05-2021')
        cy.get(':nth-child(3) > foco-form-date > .form-group > foco-date > #datePicker > .form-control').type('10-05-2025')
        cy.get('#cep').type('50830630')
        //cy.get('#cep').invoke('attr', '#cep').then(
        //resumeValue => cy.log(resumeValue)
        //)
        cy.wait(700);
        cy.get('.align-items-start > .btn > .fas')
            .should('be.visible').click()
        //cy.wait(2000); 
        cy.get('#number').type('01')
        cy.get('.reservation-tab-footer > .col-12 > .justify-content-between > :nth-child(2) > :nth-child(2)').as('botao-consulta').click()
        cy.get('.col-12 > .justify-content-between > :nth-child(2) > .btn-primary').click()
        cy.get('.ra-customer-info-body > .btn').click()
        cy.get('span > :nth-child(2) > strong').click()
        cy.get('.reservation-result-body-item').should('be.visible').click()
        cy.get('.col-12 > .justify-content-between > :nth-child(2) > .btn-primary').click()
        cy.wait(6000)
        cy.get('[tooltipclass="tooltip-error-content"] > .btn').should('be.visible').click() //Botão Itens Extras
        cy.get('#ngb-tab-5').click()
        //cy.get('@protecao-total').check()
        //cy.get('input[type="checkbox"][value="true"][id="FCVG"]').as('protecao-total').check()
        //cy.get(':nth-child(3) > :nth-child(1) > :nth-child(1) > .align-items-center > div > label').click()
        //cy.get('foco-confirm-modal')
        //.should('be.visible').click()
        //cy.get('foco-confirm-modal > .modal-footer > .btn-primary').click()
        cy.get('.modal-footer > .btn-primary').click()
        cy.get('.col-12 > .justify-content-between > :nth-child(2) > .btn-primary').click()
        cy.get('.ra-customer-cars > :nth-child(1) > .d-flex')
        //.should('be.visible')
        // cy.get(':nth-child(1) > .d-flex > :nth-child(1) > .title-4').click()
        cy.get('div .car-card .title-4').contains('RNF5E87').click()
        // cy.get(' div .form-area-current')
        //     .invoke('text')
        //     .then(valorKM => {
        //         cy.log(valorKM)
        //         // cy.writeFile(armazena_reserva, { cod: reserva })
        //     })
        cy.get('#currentKm').type('2600')
        cy.get('#currentFuel').type('8')
        // cy.get(':nth-child(2) > .form-area-current').invoke('val').then(valorKM => 
        //     cy.log(valorKM))
        //     //cy.get('#currentKm').type(valorKM + 1))
        //     cy.get(':nth-child(3) > .form-area-current')
        //     .invoke('val')
        //     .then(valorCB => 
        //     cy.log(valorCB))
        //cy.get('#currentFuel').type(valorCB)
        cy.get('.col-12 > .justify-content-between > :nth-child(2) > .btn-primary').click()

        //valor a pagar 
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
            cy.get('#cardCvv').type('123')
            cy.get(':nth-child(2) > foco-form-input > .form-group > .d-flex > #paymentValue').type(resumeValorText)
            cy.get(':nth-child(3) > foco-form-dropdown > .form-group > #paymentInstallments > .d-inline-block > #dropdownBasic1').click()
            cy.get(':nth-child(3) > foco-form-dropdown > .form-group > #paymentInstallments > .d-inline-block > .dropdown-menu > :nth-child(2) > perfect-scrollbar > .ps > .ps-content > :nth-child(1)').click({ multiple: true })
            cy.get('#transactionNumber').type('1247')
            cy.get('.justify-content-end > .btn').click()
            cy.get('tr.ng-star-inserted > :nth-child(2) > :nth-child(1)').should('be.visible')

            //Valor do Caução
            cy.get(':nth-child(6) > .to-receive > .ra-resume-value-price').then($valorCaucao => {
                const valor_Caucao = $valorCaucao.text().replace('R$', '')
                cy.log(valor_Caucao)

                cy.get('.align-items-center > .btn-group > .btn-outline-primary').click()
                cy.get(':nth-child(2) > foco-form-input > .form-group > .d-flex > #paymentValue').type(valor_Caucao)
                cy.get('#transactionNumber').type('356')
                cy.get('.justify-content-end > .btn').click()

            })

            cy.get('.col-12 > .justify-content-between > :nth-child(2) > .btn-primary').click()
            cy.get('foco-confirm-modal').should('be.visible')
            cy.get('.modal-footer > .btn-primary').click()

            cy.get('foco-reservation-created').should('be.visible')
            cy.get('#inputReservationNumber')
                .invoke('val')
                .then(contrato => {
                    cy.log(contrato)
                    cy.writeFile(armazena_contrato, { cod: contrato })
                })


            cy.get('#ngb-panel-0-header > .align-items-center > .btn > .d-flex').click()
            cy.get('.row > :nth-child(1) > .btn').click()
            cy.get('.modal-footer > .btn').click()


            //cy.get(':nth-child(2) > :nth-child(1) > .ra-resume-value-price').should('eq', resumeValorText)
        })

        //cy.log(this.valorWrap)
        //cy.get('.to-paid > .ra-resume-value-price').invoke('text').as('resumoValor')
        //cy.log(this.resumoValor)
        //cy.get('.to-paid > .ra-resume-value-price').invoke('text').then(
        //resumeValue => cy.log(resumeValue)
        //).should()
        //cy.get('#paymentValueMoney').type('@valor')    
        //cy.getCookie('.to-paid > .ra-resume-value-price').log()
        //cy.get('.ra-customer-cars > :nth-child(1) > .d-flex > :nth-child(1)').should('be.visible').click()
    })



})
