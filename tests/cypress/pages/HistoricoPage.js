class HistoricoPage {
  get usuarioNome() {
    return cy.get("#usuarioNome");
  }

  get listaPedidos() {
    return cy.get("#listaPedidos");
  }

  get verificarStatusButton() {
    return cy.contains("Verificar Status");
  }

  get logoutButton() {
    return cy.get("#logout");
  }

  visitar() {
    cy.visit("/historico.html");
  }

  clearLocalStorage() {
    cy.clearLocalStorage();
  }

  interceptHistorico(statusCode, body, alias) {
    cy.intercept("GET", "**/pedidos/historico", {
      statusCode: statusCode,
      body: body,
    }).as(alias);
  }

  reloadPage() {
    cy.reload();
  }

  waitIntercept(alias) {
    cy.wait(alias);
  }

  clickVerificarStatus() {
    this.verificarStatusButton.click();
  }

  clickLogout() {
    this.logoutButton.click();
  }
}

export default new HistoricoPage();

