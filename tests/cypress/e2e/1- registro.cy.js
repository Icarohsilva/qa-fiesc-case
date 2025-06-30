describe('Tela de Registro - Cafeteria ☕', () => {
  beforeEach(() => {
    cy.visit('/registro.html');
  });

  it('Deve exibir erro se tentar registrar com campos vazios', () => {
    cy.get('form').submit();
    cy.get('#mensagemErro').should('contain', '⚠️ Nome deve ter pelo menos 3 letras');
  });

  it('Deve exibir erro se nome for menor que 3 caracteres', () => {
    cy.get('#nome').type('Jo');
    cy.get('#email').type('jo@teste.com');
    cy.get('#senha').type('1234567');
    cy.get('form').submit();
    cy.get('#mensagemErro').should('contain', '⚠️ Nome deve ter pelo menos 3 letras');
  });

  it('Deve exibir erro para email inválido', () => {
    cy.get('#nome').type('João Teste');
    cy.get('#email').type('emailinvalido');
    cy.get('#senha').type('1234567');
    cy.get('form').submit();
    cy.get('#mensagemErro').should('contain', '⚠️ Email inválido');
  });

  it('Deve exibir erro se senha for menor que 6 caracteres', () => {
    cy.get('#nome').type('João Teste');
    cy.get('#email').type('joao@teste.com');
    cy.get('#senha').type('123');
    cy.get('form').submit();
    cy.get('#mensagemErro').should('contain', '⚠️ Senha deve ter 6+ caracteres');
  });

  it('Deve exibir erro se senha não tiver número', () => {
    cy.get('#nome').type('João Teste');
    cy.get('#email').type('joao@teste.com');
    cy.get('#senha').type('senhasemnumero');
    cy.get('form').submit();
    cy.get('#mensagemErro').should('contain', '⚠️ Senha deve ter 6+ caracteres e ao menos 1 número');
  });

  it('Deve registrar com sucesso e redirecionar para login', () => {
    const email = `teste_${Date.now()}@teste.com`;

    cy.get('#nome').type('João da Silva');
    cy.get('#email').type(email);
    cy.get('#senha').type('teste123');
    cy.get('form').submit();

    cy.get('#toast-text').should('contain', 'Cadastro realizado com sucesso!');
  });

  it('Deve redirecionar para tela de login ao clicar no link', () => {
    cy.contains('Entrar').click();
    cy.url().should('include', 'login.html');
  });
});
