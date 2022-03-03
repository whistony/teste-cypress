/// <reference types="cypress" />




describe('Realizar login', function() {

    beforeEach(function() {
        cy.visit('https://homologcoral.aluguefoco.com.br/'); //Visistar o site

        cy.fixture('fixtures-demo/loginCredencial').then(credencial =>{
            this.credencial = credencial;

        })
        // cy.get('#user').type('wfn') //busca pelo id do elemento
        // cy.get('#password').type('Wf@2011840')
        // cy.server();
        // cy.route('POST', '**/precificacao').as('homepage')
        // cy.get('span').click()
        // cy.wait(2000)
        // cy.log('Login com Sucesso')

    })

    it('realizar login ', function(){
        cy.get('#user').type(this.credencial.usuario);
        cy.get('#password').type(this.credencial.senha);
        cy.get('span').click()

    });

})
