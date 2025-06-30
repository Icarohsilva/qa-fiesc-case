import RegistroPage from "../pages/RegistroPage";

describe("Tela de Registro - Cafeteria ☕", () => {
  beforeEach(() => {
    RegistroPage.visitar();
  });

  it("Deve exibir erro se tentar registrar com campos vazios", () => {
    RegistroPage.submeterFormulario();
    RegistroPage.mensagemErro.should("contain", "⚠️ Nome deve ter pelo menos 3 letras");
  });

  it("Deve exibir erro se nome for menor que 3 caracteres", () => {
    RegistroPage.preencherFormulario("Jo", "jo@teste.com", "1234567");
    RegistroPage.submeterFormulario();
    RegistroPage.mensagemErro.should("contain", "⚠️ Nome deve ter pelo menos 3 letras");
  });

  it("Deve exibir erro para email inválido", () => {
    RegistroPage.preencherFormulario("João Teste", "emailinvalido", "1234567");
    RegistroPage.submeterFormulario();
    RegistroPage.mensagemErro.should("contain", "⚠️ Email inválido");
  });

  it("Deve exibir erro se senha for menor que 6 caracteres", () => {
    RegistroPage.preencherFormulario("João Teste", "joao@teste.com", "123");
    RegistroPage.submeterFormulario();
    RegistroPage.mensagemErro.should("contain", "⚠️ Senha deve ter 6+ caracteres");
  });

  it("Deve exibir erro se senha não tiver número", () => {
    RegistroPage.preencherFormulario("João Teste", "joao@teste.com", "senhasemnumero");
    RegistroPage.submeterFormulario();
    RegistroPage.mensagemErro.should("contain", "⚠️ Senha deve ter 6+ caracteres e ao menos 1 número");
  });

  it("Deve registrar com sucesso e redirecionar para login", () => {
    const email = `teste_${Date.now()}@teste.com`;
    RegistroPage.preencherFormulario("João da Silva", email, "teste123");
    RegistroPage.submeterFormulario();
    RegistroPage.toastText.should("contain", "Cadastro realizado com sucesso!");
  });

  it("Deve redirecionar para tela de login ao clicar no link", () => {
    RegistroPage.linkEntrar.click();
    cy.url().should("include", "login.html");
  });
});


