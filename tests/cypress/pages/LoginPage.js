class LoginPage {
  get emailInput() {
    return cy.get("#email");
  }

  get senhaInput() {
    return cy.get("#senha");
  }

  get form() {
    return cy.get("form");
  }

  get mensagemErro() {
    return cy.get("#mensagemErro");
  }

  get overlaySucesso() {
    return cy.get("#overlay-sucesso");
  }

  get linkCadastreSe() {
    return cy.contains("Cadastre-se");
  }

  get linkRedefinir() {
    return cy.contains("Redefinir");
  }

  visitar() {
    cy.visit("/login.html");
  }

  preencherFormulario(email, senha) {
    this.emailInput.type(email);
    this.senhaInput.type(senha);
  }

  submeterFormulario() {
    this.form.submit();
  }
}

export default new LoginPage();

