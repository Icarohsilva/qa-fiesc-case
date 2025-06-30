describe('Tela de Login - Cafeteria ☕', () => {
  const email = 'admin@cafeteria.com';
  const senha = 'admin123';

  beforeEach(() => {
    cy.visit('/login.html');
  });

  it('Deve exibir erro ao tentar logar com campos vazios', () => {
    cy.get('form').submit();
    cy.get('#mensagemErro').should('contain', '⚠️ Email inválido');
  });

  it('Deve exibir erro para email com formato inválido', () => {
    cy.get('#email').type('email_invalido');
    cy.get('#senha').type('senha123');
    cy.get('form').submit();
    cy.get('#mensagemErro').should('contain', '⚠️ Email inválido');
  });

  it('Deve exibir erro se a senha estiver vazia', () => {
    cy.get('#email').type('teste@teste.com');
    cy.get('form').submit();
    cy.get('#mensagemErro').should('contain', '⚠️ Informe a senha');
  });


// Descomente este teste se quiser registrar o usuário Administrador e logar com sucesso

//  it('Deve registrar o usuário Administrador e depois logar com sucesso', () => {
//    cy.visit('/registro.html');
//    cy.url().should('include', 'registro.html');
//
//    cy.get('#nome').type('Administrador');
//    cy.get('#email').type('admin@cafeteria.com');
//    cy.get('#senha').type('admin123');
//    cy.get('form').submit();
//
//    // Espera o toast aparecer
//    cy.get('#toast-text').should('contain', 'Cadastro realizado com sucesso!');
//
//    cy.wait(5000); // Espera o redirecionamento
//
//
//    cy.visit('/login.html');
//
//    // Faz login
//    cy.get('#email').type('admin@cafeteria.com');
//    cy.get('#senha').type('admin123');
//    cy.get('form').submit();
//
//    cy.get('#overlay-sucesso', { timeout: 10000 }).should('be.visible');
//  });


  it('Deve permitir navegação para cadastro e redefinição de senha', () => {
    cy.contains('Cadastre-se').should('have.attr', 'href', 'registro.html');
    cy.contains('Redefinir').should('have.attr', 'href', 'reset.html');
  });
});
