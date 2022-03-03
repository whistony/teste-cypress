/// <reference types="cypress" />


describe('Coral', () => {

    beforeEach(() => {
        cy.visit('https://homologcoral.aluguefoco.com.br/') //Visistar o site
        cy.get('#user').type('wfn') //busca pelo id do elemento
        cy.get('#password').type('Wf@2011840')
        cy.server();
        cy.route('POST', '**/precificacao').as('homepage')
        cy.get('span').click()
        cy.wait(2000)
        cy.log('Login com Sucesso')
  

    });

    it('Atualizar Itens', () =>{

        cy.get(':nth-child(3) > a > .fas').click()
        cy.wait(700)
        cy.get(':nth-child(1) > foco-dropdown > .d-inline-block > #dropdownBasic1')
            .as('selecionar').click()
        cy.get(':nth-child(3) > div > span')
            .click({ multiple: true})
        cy.get('.ml-2 > .d-inline-block > #dropdownBasic1 > .ellipsis').click()
        cy.get('.dropdown-list > perfect-scrollbar > .ps > .ps-content > :nth-child(5) > div > span')
            .click()
        cy.get('div.table-pricing')
            .should('be.visible')
        cy.get(':nth-child(4) > :nth-child(3) > .align-items-center > span')
            .as('preco-tier-1').type('{selectall}, 10,00')
        cy.get(':nth-child(4) > :nth-child(4) > .align-items-center').click()
        //cy.get(':nth-child(4) > :nth-child(3) > .align-items-center > span').click()
        //cy.get(':nth-child(4) > :nth-child(3) > .align-items-center > span').type('10,00')
        cy.get('.justify-content-end > .btn-primary').click()
        //cy.get('@preco-tier-1').clear().type('10,00') 
    });


});