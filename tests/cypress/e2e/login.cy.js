import LoginPage from "../pages/LoginPage";
import RegistroPage from "../pages/RegistroPage";

describe("Tela de Login - Cafeteria ☕", () => {
  const emailAdmin = "admin@cafeteria.com";
  const senhaAdmin = "admin123";

  beforeEach(() => {
    LoginPage.visitar();
  });

  it("Deve exibir erro ao tentar logar com campos vazios", () => {
    LoginPage.submeterFormulario();
    LoginPage.mensagemErro.should("contain", "⚠️ Email inválido");
  });

  it("Deve exibir erro para email com formato inválido", () => {
    LoginPage.preencherFormulario("email_invalido", "senha123");
    LoginPage.submeterFormulario();
    LoginPage.mensagemErro.should("contain", "⚠️ Email inválido");
  });

  it("Deve exibir erro se a senha estiver vazia", () => {
    LoginPage.emailInput.type("teste@teste.com");
    LoginPage.submeterFormulario();
    LoginPage.mensagemErro.should("contain", "⚠️ Informe a senha");
  });

  it("Deve registrar o usuário Administrador e depois logar com sucesso", () => {
    // Acessa tela de registro
    LoginPage.linkCadastreSe.click();
    cy.url().should("include", "registro.html");

    // Preenche os dados do formulário
    RegistroPage.preencherFormulario("Administrador", emailAdmin, senhaAdmin);
    RegistroPage.submeterFormulario();

    RegistroPage.overlaySucesso.should("be.visible");
    RegistroPage.overlaySucesso.contains("Cadastro realizado com sucesso!");

    cy.wait(1000);

    LoginPage.visitar();
    cy.url().should("include", "login.html");

    // Realiza o login
    LoginPage.preencherFormulario(emailAdmin, senhaAdmin);
    LoginPage.submeterFormulario();

    // Valida redirecionamento e sucesso
    LoginPage.overlaySucesso.should("be.visible");
    cy.url({ timeout: 10000 }).should("include", "pedido.html");
  });

  it("Deve permitir navegação para cadastro e redefinição de senha", () => {
    LoginPage.linkCadastreSe.should("have.attr", "href", "registro.html");
    LoginPage.linkRedefinir.should("have.attr", "href", "reset.html");
  });
});


