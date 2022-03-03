/// <reference types="cypress" />

const armazena_reserva = 'cypress/fixtures/fixtures-demo/cod_reserva.json'
const armazena_contrato = 'cypress/fixtures/fixtures-demo/cod_contrato.json'


describe('Teste de Regressão', function () {

    beforeEach(function () {
        cy.visit('https://homologcoral.aluguefoco.com.br/') //Visistar o site
        cy.get('#user').type('wfn') //busca pelo id do elemento
        cy.get('#password').type('Wf@2011840')
        cy.server();
        cy.route('POST', '**/precificacao').as('homepage')
        cy.get('span').click()
        cy.wait(2000)
        cy.log('Login com Sucesso')

       // console.log(Math.floor(100000 + Math.random() * 90000000));

        cy.fixture('fixtures-demo/cod_reserva').then((numeroReserva) => {

            this.numeroReserva = numeroReserva;

        })

        cy.fixture('fixtures-demo/cod_contrato').then((numeroContrato) => {

            this.numeroContrato = numeroContrato;

        })


    })


    it.only('Criar Reserva com ativando a Flag Renovacao', function () {

        cy.log(this.numeroReserva.cod)
        cy.get(':nth-child(6) > a > .fas').as('modulo-reserva').click()
        cy.wait(1000)
        cy.get('#typeahead-http').as('campo-cpf')
            .should('be.empty').type('995.088.710-08')
        cy.get('[type="checkbox"][value="false"]').should('have.value', 'false')
        cy.get('[type="checkbox"]').check('false', { force: true })
        cy.get(':nth-child(1) > :nth-child(1) > .flex-column > .align-items-center > .form-control')
            .as('local-retirada').type('POA10').should('be.visible')
        cy.get('#ngb-typeahead-1-0').click({ multiple: true }) //busca pelo id do elemento
        cy.get(':nth-child(2) > :nth-child(1) > .flex-column > .align-items-center > .form-control')
            .as('local-devolucao').type('POA10').should('be.visible')
        cy.get('#ngb-typeahead-2-0').click({ multiple: true })
        //cy.get(':nth-child(1) > .form-group > :nth-child(1) > :nth-child(1) > .d-flex > :nth-child(2) > .input-group > .input-group-append > .btn > .far')
        //.click({ multiple: true}).should('be.visible')
        cy.get(':nth-child(1) > .form-group > :nth-child(1) > :nth-child(1) > .d-flex > :nth-child(2) > .input-group > .input-group-append > .btn')
            .as('calendario-retirada').should('be.visible').click({ multiple: true })
        cy.get('[aria-label="4/3/2022"] > .btn-light').click()
        cy.get(':nth-child(2) > .form-group > :nth-child(1) > :nth-child(1) > .d-flex > :nth-child(2) > .input-group > .input-group-append > .btn > .far')
            .as('calendario-devolucao').should('be.visible').click({ multiple: true })
        cy.get('[aria-label="6/3/2022"] > .btn-light').click()
        cy.get('.align-items-end > div.w-100 > .btn')
            .click().should('be.visible')
        cy.wait(1000)
        cy.get('.reservation-result-body > :nth-child(4)').click()
        cy.get('[tooltipclass="tooltip-error-content"] > .btn').click()
        cy.get('#ngb-tab-3').click()
        cy.get('input[type="checkbox"][value="true"][id="LDW"]').as('protecao-basica').should('be.checked')
        //cy.get('input[type="checkbox"][value="true"][id="DFCVG"]').as('protecao-especial').should('not.be.checked')
        cy.get('input[type="checkbox"][value="true"][id="FCVG"]').as('protecao-total').should('not.be.checked').check()
        cy.log('@protecao-basica')
        cy.get('foco-confirm-modal > .modal-footer > .btn-primary').should('be.visible').click()
        cy.get('.modal-footer > .btn-primary').click()
        cy.get('.reservation-result-footer > .btn-primary').click()
        // cy.get('input#typeahead-http.form-control.ng-untouched.ng-pristine').should('not.be.enabled')
        cy.get('[class*="ng-pristine"]#typeahead-http').should('not.be.enabled')
        cy.get('#name').type('teste regressao now')
        cy.get('#email').type('teste11@gmail.com')
        cy.get('#phone').type('99999999999999')
        cy.get('.modal-footer > :nth-child(2) > .btn-primary').click()
        cy.get('.modal-footer > .btn-primary').click()
        cy.get('input[id="inputReservationNumber"]')
            .invoke('val')
            .then(reserva => {
                cy.log(reserva)
                cy.writeFile(armazena_reserva, { cod: reserva })
                cy.log(this.numeroReserva.cod)
            })


        cy.get('#inputReservationNumber').should('be.visible') // Validador da criação da reserva 
        cy.get('#ngb-panel-0-header > .align-items-center > .btn > .d-flex > h5').click()
        cy.get('.row > :nth-child(1) > .btn').click()
        cy.get('.modal-footer > .btn').click()
        // cy.readFile(('fixtures-demo/cod_reserva').then(function (numReserva) {
        //     cy.log(numReserva);

        // })



    })

    it('teste', function(){

         cy.readFile(armazena_reserva).then(function(numReserva){
            cy.log(numReserva.cod)

        })

    })

    it.only('Editar Reserva', function () {

        cy.wait(2000)
        cy.log(this.numeroReserva.cod)
        // cy.log(this.numeroReserva)
        cy.get(':nth-child(6) > a > .fas').click()
        cy.get('#tab-list').click()
        cy.wait(900)
        cy.get('.reservation-search-area > .d-flex > .form-control').click()
        //.type('teste cypress{enter}')
        cy.readFile(armazena_reserva).then(function(numReserva){
            cy.log(numReserva.cod)
            cy.get('.reservation-search-area > .d-flex > .form-control').type(numReserva.cod)
            cy.get('.reservation-search-area > .d-flex > .form-control').type('{enter}')
        })
        cy.get('#tableCRUDEdit-0').click()
        // cy.get('foco-confirm-modal').should('not.be.visible')
        // cy.get('.modal-footer > .btn-outline-primary').click()
        //cy.get('[type="checkbox"][value="false"]').should('be.checked')
        cy.get('[type="checkbox"]').uncheck({ force: true })
        cy.get('.customer-area > :nth-child(3) > div > :nth-child(2').contains('99508871008')
        // cy.get(':nth-child(1) > :nth-child(1) > .flex-column > .align-items-center > .form-control')
        //     .as('local-retirada').type('POA10').should('be.visible')
        // cy.get('#ngb-typeahead-1-0').click({ multiple: true }) //busca pelo id do elemento
        // cy.get(':nth-child(2) > :nth-child(1) > .flex-column > .align-items-center > .form-control')
        //     .as('local-devolucao').type('POA10').should('be.visible')
        // cy.get('#ngb-typeahead-2-0').click({ multiple: true })
        cy.get('.align-items-end > div.w-100 > .btn')
            .click().should('be.visible')
        cy.get('.justify-content-between > .d-flex > .btn-sm').click()
        cy.reload()

    })

    it.only('Converter Contrato', function () {
        cy.get(':nth-child(7) > a').click()
        cy.wait(900)
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
        cy.get('foco-confirm-modal').should('be.visible')
        cy.get('.modal-footer > .btn-outline-primary').click()
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
        cy.wait(2000)
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
        //cy.get(':nth-child(1) > .d-flex > :nth-child(1) > .title-4').click()
        cy.get('.ra-customer-cars > :nth-child(1) > .d-flex > :nth-child(3)').click({force: true})
        //cy.get('div .car-card .title-4').contains('RNF5G54').click({force: true})
        cy.get('#currentKm').type('2')
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
            cy.get('#cardName').type('teste regresao')
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
            // cy.get(':nth-child(6) > .to-receive > .ra-resume-value-price').then($valorCaucao => {
            //     const valor_Caucao = $valorCaucao.text().replace('R$', '')
            //     cy.log(valor_Caucao)

            //     cy.get('.align-items-center > .btn-group > .btn-outline-primary').click()
            //     cy.get(':nth-child(2) > foco-form-input > .form-group > .d-flex > #paymentValue').type(valor_Caucao)
            //     cy.get('#transactionNumber').type('356')
            //     cy.get('.justify-content-end > .btn').click()

            // })

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
            cy.wait(9000)
            cy.get('.modal-footer > .btn')
            

        })
    })

    it.only('Editar Contrato', function () {

        //Tela de Busca de um Contrato
        cy.get(':nth-child(7) > a').click()
        cy.get('#tab-ra-list').click()

        cy.readFile(armazena_contrato).then(function(numContrato){
            cy.log(numContrato.cod)
            cy.get('.form-control').type(numContrato.cod)
            cy.get('.form-control').type('{enter}')

        })

        cy.get('#actionsDropdown').click()
        cy.get('.dropdown-menu > :nth-child(1) > span').click()
        cy.get(':nth-child(5) > .step-icon').click()

        //Tela de Dados de Locação
        cy.get('.ra-customer-info-body > .btn').click()
        cy.get(':nth-child(2) > .form-group > :nth-child(1) > :nth-child(1) > .d-flex > :nth-child(2) > .input-group > .input-group-append > .btn > .far')
            .as('data_devolucao').should('be.visible').click({ multiple: true })
        cy.get('[aria-label="10/3/2022"] > .btn-light').click()
        cy.get('.modal-footer > .d-flex > .btn-primary').click()
        cy.get('.col-4 > .mt-3').should('be.visible')
        // cy.get('[tooltipclass="tooltip-error-content"] > .btn').should('be.visible').click() //Botão Itens Extras
        // cy.get('#ngb-tab-5').click()

        // cy.get('tbody > :nth-child(2) > :nth-child(3) > div').then($resumoValor =>{
        //     const fcvgValorText = $resumoValor.text().replace('R$', '').replace('/ Diária', '')
        //     cy.log(fcvgValorText)
        //     cy.get(fcvgValorText).contains(49,90)
        // })

        cy.get(':nth-child(11) > .step-icon').click()

        //Tela de Pagamento

         //Quando a pagamento pendente
        cy.get('.to-paid > .ra-resume-value-price').then($resumoValor =>{
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
        cy.get('#cardCvv').type('789')
        cy.get(':nth-child(2) > foco-form-input > .form-group > .d-flex > #paymentValue').type(resumeValorText)
        cy.get(':nth-child(3) > foco-form-dropdown > .form-group > #paymentInstallments > .d-inline-block > #dropdownBasic1').click()
        cy.get(':nth-child(3) > foco-form-dropdown > .form-group > #paymentInstallments > .d-inline-block > .dropdown-menu > :nth-child(2) > perfect-scrollbar > .ps > .ps-content > :nth-child(1) > div > span').click()
        cy.get('#transactionNumber').type('3256')
        cy.get('.justify-content-end > .btn').click()
        
        // cy.get(':nth-child(2) > .to-receive > .ra-resume-value-price').then($resumoValor =>{
        //     const novoValorText = $resumoValor.text().replace('R$', '')
        //     cy.wrap(novoValorText)
        // })
        cy.get('foco-rent-agreement-payment.w-100 > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(3)').should('be.visible')
        })

        //Quando se tem um valor a Restituir
        // cy.get('.ra-customer-info-body > .justify-content-between > :nth-child(2) > :nth-child(3)').click()
        // cy.get('.justify-content-end > span > .btn').click({ force: true })

        //Caução
        //cy.get('foco-rent-agreement-payment.w-100 > :nth-child(1) > :nth-child(1) > :nth-child(1) > :nth-child(7)').should('be.visible')
        cy.get('.col-12 > .justify-content-between > :nth-child(2) > .btn-primary').click()
        cy.get('foco-confirm-modal').should('be.visible')
        cy.get('.modal-footer > .btn-primary').click()
        cy.get('foco-reservation-created').should('be.visible')
        cy.get('.modal-footer > .btn').click()

        //     cy.get('#ngb-panel-0-header > .align-items-center > .btn > .d-flex').click()
        //     cy.get('.row > :nth-child(1) > .btn').click()
        //     cy.get('.modal-footer > .btn').click()
        // })

    });

    it.only('Encerrar Contrato', function () {
        //Tela de Busca do contrato
        cy.get(':nth-child(7) > a').click()
        cy.get('#tab-ra-list').click()

        cy.readFile(armazena_contrato).then(function(numContrato){
            cy.log(numContrato.cod)
            cy.get('.form-control').type(numContrato.cod)
            cy.get('.form-control').type('{enter}')

        })
       
        cy.get('#tableCRUDEdit-0').click()
        cy.wait(2000)

        //Tela de Dados de Locação
        cy.get('.mx-0 > :nth-child(1) > .btn').as('botao').should('be.visible')
        cy.wait(300)
        cy.get('.mx-0 > :nth-child(1) > .btn').click()
        cy.get('foco-rent-agreement-edit-dates').should('be.visible')
        cy.get(':nth-child(2) > .form-group > :nth-child(1) > :nth-child(1) > .d-flex > :nth-child(2) > .input-group > .input-group-append > .btn > .far')
            .as('data_devolucao').should('be.visible').click({ multiple: true })
        //cy.get('[aria-label="26/3/2022"] > .btn-light').click()
        cy.get('.ngb-dp-today > .btn-light').click({ force: true })
        cy.wait(9000)
        //cy.get('.d-flex > .ng-valid[type="time"]').type(new Date().getHours() + ':' + new Date().getMinutes())
        // cy.get('.d-flex > .ng-valid[type="time"]').click({multiple: true})
        // cy.get(':nth-child(2) > :nth-child(2) > :nth-child(1) > :nth-child(1) > .d-flex > :nth-child(2) > .input-group > .form-control')
        //     .click({multiple: true})
            cy.get('.modal-footer').click({multiple: true})
        //cy.get('.ngb-dp-today > .btn-light').click({ force: true })
        cy.get('.modal-footer > .d-flex > .btn-primary').click()
        cy.get(':nth-child(1) > .step-icon > .step-subicon > .fas').should('be.visible')

        //Tela de Devolução de Carros/Itens
        cy.get('.align-items-center > .fa-car').click()
        cy.get('#currentKm').type('3')
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

    it.only('Pos Contrato', function () {
        //Tela de Busca do contrato
        cy.get(':nth-child(7) > a').click()
        cy.get('#tab-ra-list').click()

        cy.readFile(armazena_contrato).then(function(numContrato){
            cy.log(numContrato.cod)
            cy.get('.form-control').type(numContrato.cod)
            cy.get('.form-control').type('{enter}')

        })
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
        cy.get('.modal-footer > .btn').click()

    })


})