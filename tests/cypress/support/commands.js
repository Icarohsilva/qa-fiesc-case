Cypress.Commands.add('loginViaAPI', () => {
  const email = `e2e_${Date.now()}@teste.com`;
  const senha = 'Senha123';
  const nome = 'E2E Teste';

  cy.request('POST', '/api/auth/registrar', { nome, email, senha }).then(() => {
    cy.request('POST', '/api/auth/login', { email, senha }).then((res) => {
      window.localStorage.setItem('token', res.body.token);
      window.localStorage.setItem('nomeUsuario', res.body.usuario.nome);
    });
  });
});

Cypress.Commands.add('logout', () => {
  cy.clearLocalStorage();
  cy.visit('/login.html');
});

Cypress.Commands.add('criarPedidoAPI', (token, ingredientes) => {
  cy.request({
    method: 'POST',
    url: '/api/pedidos',
    headers: { Authorization: `Bearer ${token}` },
    body: {
      nome: 'Pedido Cypress',
      ingredientes
    }
  });
});
