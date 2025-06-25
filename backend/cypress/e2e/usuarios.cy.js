describe('Testes da API de usuários', () => {
  const apiUrl = 'http://localhost:3000';

  it('Deve cadastrar um usuário com sucesso', () => {
    cy.request('POST', `${apiUrl}/usuarios`, {
      nome: 'Teste Cypress',
      email: `teste${Date.now()}@cypress.com`
    }).then(response => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('id');
      expect(response.body.nome).to.eq('Teste Cypress');
    });
  });

  it('Deve listar usuários', () => {
    cy.request('GET', `${apiUrl}/usuarios`).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
    });
  });
});
