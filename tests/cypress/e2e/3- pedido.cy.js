describe('Sistema de Pedidos - Cafeteria ☕', () => {
  const email = 'admin@cafeteria.com';
  const senha = 'admin123';

  beforeEach(() => {
    cy.session([email, senha], () => {
      cy.visit('/login.html');
      cy.get('#email').type(email);
      cy.get('#senha').type(senha);
      cy.get('form').submit();
      cy.get('#overlay-sucesso', { timeout: 10000 }).should('be.visible');
    });

    cy.visit('/pedido.html');
  });

  context('Autenticação e Identificação do Usuário', () => {
    it('Deve exibir o nome do usuário logado no topo', () => {
      cy.get('#usuarioNome').should('contain', 'Olá, Administrador');
    });
  });

  context('Listagem de Ingredientes', () => {
    it('Deve listar ingredientes base e adicionais', () => {
      cy.get('#listaBase .item').should('have.length.at.least', 1);
      cy.get('#listaAdicional .item').should('have.length.at.least', 1);
    });
  });

  context('Validação da Montagem do Pedido', () => {
    it('Deve mostrar alerta ao tentar montar café sem base', () => {
      cy.get('#btnMontar').click();
      cy.get('#alerta').should('be.visible')
        .and('contain', 'Selecione ao menos 1 ingrediente base');
    });

    it('Deve permitir selecionar até 2 adicionais', () => {
      cy.get('#listaBase .item').first().click();
      cy.get('#btnMontar').click();
      cy.get('#listaAdicional .item').eq(0).click();
      cy.get('#listaAdicional .item').eq(1).click();
      cy.get('#listaAdicional .item').eq(2).click();
      cy.get('#listaAdicional .item.selecionado').should('have.length', 2);
    });
  });

  context('Resumo e Confirmação do Pedido', () => {
    it('Deve exibir resumo do pedido com valores e nomes corretos', () => {
      cy.get('#listaBase .item').eq(0).click();
      cy.get('#btnMontar').click();
      cy.get('#listaAdicional .item').eq(0).click();
      cy.get('#confirmarAdicionais').click();
      cy.get('#modal-resumo').should('be.visible');
      cy.get('#infoCafe').should('contain', 'Caf');
      cy.get('#infoIngredientes').should('contain', 'Ingredientes Base');
    });

    it('Deve cancelar adicionais e voltar para seleção de base', () => {
      cy.get('#listaBase .item').eq(1).click();
      cy.get('#btnMontar').click();
      cy.get('#alterarPedido').click();
      cy.get('#modal-confirmacao').should('not.be.visible');
    });

    it('Deve finalizar pedido com sucesso e redirecionar para histórico', () => {
      cy.get('#listaBase .item').first().click();
      cy.get('#btnMontar').click();
      cy.get('#confirmarAdicionais').click();
      cy.get('#confirmarPedido').click();
      cy.get('#overlay-sucesso').should('be.visible');
      cy.url({ timeout: 4000 }).should('include', 'historico.html');
    });
  });

  context('Logout do Sistema', () => {
    it('Deve permitir logout e redirecionar para login', () => {
      cy.get('#logout').click();
      cy.url().should('include', 'login.html');
    });
  });
});
