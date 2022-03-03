/// <reference types="cypress" />


const armazena_reserva = 'cypress/fixtures/fixtures-demo/cod_reserva.json'

describe('Criar Reserva', function () {

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


    it.only('Criar Reserva com ativando a Flag Renovacao', function () {

        cy.get(':nth-child(6) > a > .fas').as('modulo-reserva').click()
        cy.get('#typeahead-http').as('campo-cpf')
            .should('be.empty').type('824.085.240-83')
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
        cy.get('[aria-label="3/3/2022"] > .btn-light').click()
        cy.get(':nth-child(2) > .form-group > :nth-child(1) > :nth-child(1) > .d-flex > :nth-child(2) > .input-group > .input-group-append > .btn > .far')
            .as('calendario-devolucao').should('be.visible').click({ multiple: true })
        cy.get('[aria-label="4/3/2022"] > .btn-light').click()
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
        cy.get('#name').type('teste ckeckin')
        cy.get('#email').type('teste@gmail.com')
        cy.get('#phone').type('99999999999999')
        cy.get('.modal-footer > :nth-child(2) > .btn-primary').click()
        cy.get('.modal-footer > .btn-primary').click()
        cy.get('input[id="inputReservationNumber"]')
            .invoke('val')
            .then(reserva => {
                cy.log(reserva)
                cy.writeFile(armazena_reserva, { cod: reserva })
            })


        cy.get('#inputReservationNumber').should('be.visible') // Validador da criação da reserva 
        cy.get('#ngb-panel-0-header > .align-items-center > .btn > .d-flex > h5').click()
        cy.get('.row > :nth-child(1) > .btn').click()
        cy.get('.modal-footer > .btn').click()



    })

    it('Editar Reserva', function () {
        // cy.log(armazena_reserva)
        // cy.log(this.numeroReserva)
        cy.get(':nth-child(6) > a > .fas').click()
        cy.get('#tab-list').click()
        cy.wait(3000)
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
        cy.get('.customer-area > :nth-child(3) > div > :nth-child(2').contains('34733021046')
        cy.get('.align-items-end > div.w-100 > .btn')
            .click().should('be.visible')
        cy.get('.justify-content-between > .d-flex > .btn-sm').click()

    })


})


