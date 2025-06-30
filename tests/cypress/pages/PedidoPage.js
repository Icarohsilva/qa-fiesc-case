class PedidoPage {
  get usuarioNome() {
    return cy.get("#usuarioNome");
  }

  get listaBaseItens() {
    return cy.get("#listaBase .item");
  }

  get listaAdicionalItens() {
    return cy.get("#listaAdicional .item");
  }

  get btnMontar() {
    return cy.get("#btnMontar");
  }

  get alerta() {
    return cy.get("#alerta");
  }

  get confirmarAdicionais() {
    return cy.get("#confirmarAdicionais");
  }

  get modalResumo() {
    return cy.get("#modal-resumo");
  }

  get infoCafe() {
    return cy.get("#infoCafe");
  }

  get infoIngredientes() {
    return cy.get("#infoIngredientes");
  }

  get alterarPedido() {
    return cy.get("#alterarPedido");
  }

  get confirmarPedido() {
    return cy.get("#confirmarPedido");
  }

  get overlaySucesso() {
    return cy.get("#overlay-sucesso");
  }

  get logoutButton() {
    return cy.get("#logout");
  }

  visitar() {
    cy.visit("/pedido.html");
  }

  selecionarBase(index) {
    this.listaBaseItens.eq(index).click();
  }

  selecionarAdicional(index) {
    this.listaAdicionalItens.eq(index).click();
  }

  montarPedido() {
    this.btnMontar.click();
  }

  confirmarAdicionaisSelecionados() {
    this.confirmarAdicionais.click();
  }

  confirmarPedidoFinal() {
    this.confirmarPedido.click();
  }

  fazerLogout() {
    this.logoutButton.click();
  }
}

export default new PedidoPage();

