import PedidoPage from "../pages/PedidoPage";

describe("Sistema de Pedidos - Cafeteria ☕", () => {
  const email = "admin@cafeteria.com";
  const senha = "admin123";

  beforeEach(() => {
    cy.session([email, senha], () => {
      cy.visit("/login.html");
      cy.get("#email").type(email);
      cy.get("#senha").type(senha);
      cy.get("form").submit();
      cy.url().should("include", "pedido.html");
    });

    PedidoPage.visitar();
  });

  context("Autenticação e Identificação do Usuário", () => {
    it("Deve exibir o nome do usuário logado no topo", () => {
      PedidoPage.usuarioNome.should("contain", "Olá, Administrador");
    });
  });

  context("Listagem de Ingredientes", () => {
    it("Deve listar ingredientes base e adicionais", () => {
      PedidoPage.listaBaseItens.should("have.length.at.least", 1);
      PedidoPage.listaAdicionalItens.should("have.length.at.least", 1);
    });
  });

  context("Validação da Montagem do Pedido", () => {
    it("Deve mostrar alerta ao tentar montar café sem base", () => {
      PedidoPage.montarPedido();
      PedidoPage.alerta.should("be.visible").and("contain", "Selecione ao menos 1 ingrediente base");
    });

    it("Deve permitir selecionar até 2 adicionais", () => {
      PedidoPage.selecionarBase(0);
      PedidoPage.montarPedido();
      PedidoPage.selecionarAdicional(0);
      PedidoPage.selecionarAdicional(1);
      PedidoPage.selecionarAdicional(2);
      PedidoPage.listaAdicionalItens.filter(".selecionado").should("have.length", 2);
    });
  });

  context("Resumo e Confirmação do Pedido", () => {
    it("Deve exibir resumo do pedido com valores e nomes corretos", () => {
      PedidoPage.selecionarBase(0);
      PedidoPage.montarPedido();
      PedidoPage.selecionarAdicional(0);
      PedidoPage.confirmarAdicionaisSelecionados();
      PedidoPage.modalResumo.should("be.visible");
      PedidoPage.infoCafe.should("contain", "Caf");
      PedidoPage.infoIngredientes.should("contain", "Ingredientes Base");
    });

    it("Deve cancelar adicionais e voltar para seleção de base", () => {
      PedidoPage.selecionarBase(1);
      PedidoPage.montarPedido();
      PedidoPage.alterarPedido.click();
      cy.get("#modal-confirmacao").should("not.be.visible");
    });

    it("Deve finalizar pedido com sucesso e redirecionar para histórico", () => {
      PedidoPage.selecionarBase(0);
      PedidoPage.montarPedido();
      PedidoPage.confirmarAdicionaisSelecionados();
      PedidoPage.confirmarPedidoFinal();
      PedidoPage.overlaySucesso.should("be.visible");
      cy.url({ timeout: 4000 }).should("include", "historico.html");
    });
  });

  context("Logout do Sistema", () => {
    it("Deve permitir logout e redirecionar para login", () => {
      PedidoPage.fazerLogout();
      cy.url().should("include", "login.html");
    });
  });
});


