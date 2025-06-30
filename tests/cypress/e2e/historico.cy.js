import HistoricoPage from "../pages/HistoricoPage";

describe("Histórico de Pedidos ☕", () => {
  const baseUrl = "http://localhost";
  const token = "fake-token";
  const nomeUsuario = "Tester";

  beforeEach(() => {
    cy.session([token, nomeUsuario], () => {
      cy.visit("/login.html");
      window.localStorage.setItem("token", token);
      window.localStorage.setItem("nomeUsuario", nomeUsuario);
    });

    HistoricoPage.visitar();
  });

  it("Redireciona para login se não houver token", () => {
    HistoricoPage.clearLocalStorage();
    HistoricoPage.visitar();
    cy.url().should("include", "login.html");
  });

  it("Exibe o nome do usuário logado", () => {
    HistoricoPage.usuarioNome.should("contain", "Tester");
  });

  it("Carrega os pedidos no histórico", () => {
    HistoricoPage.interceptHistorico(200, [
      {
        id: 1,
        nome: "Latte Especial",
        status: "RECEBIDO",
        ingredientes: [
          { tipo: "BASE", ingrediente: { nome: "Espresso", valor: 4.0 } },
          { tipo: "ADICIONAL", ingrediente: { nome: "Canela", valor: 1.5 } },
        ],
      },
    ], "getHistorico");

    HistoricoPage.reloadPage(); // Garante que a interceptação vale
    HistoricoPage.waitIntercept("@getHistorico");

    HistoricoPage.listaPedidos.children().should("have.length.at.least", 1);
    HistoricoPage.listaPedidos.contains("Latte Especial");
    HistoricoPage.listaPedidos.contains("Status: RECEBIDO");
  });

  it("Avança o status do pedido ao clicar em \"Verificar Status\"", () => {
    HistoricoPage.interceptHistorico(200, [
      {
        id: 2,
        nome: "Macchiato",
        status: "RECEBIDO",
        ingredientes: [
          { tipo: "BASE", ingrediente: { nome: "Leite", valor: 3.0 } },
        ],
      },
    ], "getHistorico");

    HistoricoPage.reloadPage();
    HistoricoPage.waitIntercept("@getHistorico");

    HistoricoPage.clickVerificarStatus();
    HistoricoPage.listaPedidos.contains("Status: PREPARANDO");
  });

  it("Exibe mensagem de erro se a API falhar", () => {
    HistoricoPage.interceptHistorico(500, {}, "getHistoricoErro");

    HistoricoPage.reloadPage();
    HistoricoPage.waitIntercept("@getHistoricoErro");

    HistoricoPage.listaPedidos.contains("Erro ao carregar histórico");
  });

  it("Executa logout corretamente", () => {
    HistoricoPage.clickLogout();
    cy.url().should("include", "login.html");
    cy.window().then((win) => {
      expect(win.localStorage.getItem("token")).to.be.null;
    });
  });
});


