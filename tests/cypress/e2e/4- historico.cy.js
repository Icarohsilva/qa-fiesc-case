describe('Histórico de Pedidos ☕', () => {
  const baseUrl = 'http://localhost';
  const token = 'fake-token';
  const nomeUsuario = 'Tester';

  beforeEach(() => {
    cy.session([token, nomeUsuario], () => {
      cy.visit('/login.html');
      window.localStorage.setItem('token', token);
      window.localStorage.setItem('nomeUsuario', nomeUsuario);
    });

    cy.visit('/historico.html');
  });

  it('Redireciona para login se não houver token', () => {
    cy.clearLocalStorage();
    cy.visit('/historico.html');
    cy.url().should('include', 'login.html');
  });

  it('Exibe o nome do usuário logado', () => {
    cy.get('#usuarioNome').should('contain', 'Tester');
  });

  it('Carrega os pedidos no histórico', () => {
    cy.intercept('GET', '**/pedidos/historico', {
      statusCode: 200,
      body: [
        {
          id: 1,
          nome: 'Latte Especial',
          status: 'RECEBIDO',
          ingredientes: [
            { tipo: 'BASE', ingrediente: { nome: 'Espresso', valor: 4.0 } },
            { tipo: 'ADICIONAL', ingrediente: { nome: 'Canela', valor: 1.5 } }
          ]
        }
      ]
    }).as('getHistorico');

    cy.reload(); // Garante que a interceptação vale
    cy.wait('@getHistorico');

    cy.get('.pedido').should('have.length.at.least', 1);
    cy.contains('Latte Especial');
    cy.contains('Status: RECEBIDO');
  });

  it('Avança o status do pedido ao clicar em "Verificar Status"', () => {
    cy.intercept('GET', '**/pedidos/historico', {
      statusCode: 200,
      body: [
        {
          id: 2,
          nome: 'Macchiato',
          status: 'RECEBIDO',
          ingredientes: [
            { tipo: 'BASE', ingrediente: { nome: 'Leite', valor: 3.0 } }
          ]
        }
      ]
    }).as('getHistorico');

    cy.reload();
    cy.wait('@getHistorico');

    cy.contains('Verificar Status').click();
    cy.contains('Status: PREPARANDO');
  });

  it('Exibe mensagem de erro se a API falhar', () => {
    cy.intercept('GET', '**/pedidos/historico', { statusCode: 500 }).as('getHistoricoErro');

    cy.reload();
    cy.wait('@getHistoricoErro');

    cy.get('#listaPedidos').contains('Erro ao carregar histórico');
  });

  it('Executa logout corretamente', () => {
    cy.get('#logout').click();
    cy.url().should('include', 'login.html');
    cy.window().then(win => {
      expect(win.localStorage.getItem('token')).to.be.null;
    });
  });
});
