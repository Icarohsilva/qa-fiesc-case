class RegistroPage {
  get nomeInput() {
    return cy.get("#nome");
  }

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

  get toastText() {
    return cy.get("#toast-text");
  }

  get linkEntrar() {
    return cy.contains("Entrar");
  }

  visitar() {
    cy.visit("/registro.html");
  }

  preencherFormulario(nome, email, senha) {
    this.nomeInput.type(nome);
    this.emailInput.type(email);
    this.senhaInput.type(senha);
  }

  submeterFormulario() {
    this.form.submit();
  }
}

export default new RegistroPage();

