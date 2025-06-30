Cypress.Commands.add("login", (email, password) => {
  cy.session([email, password], () => {
    cy.visit("/login.html");
    cy.get("#email").type(email);
    cy.get("#senha").type(password);
    cy.get("form").submit();
    cy.url().should("include", "pedido.html");
  });
});

Cypress.Commands.add("register", (name, email, password) => {
  cy.visit("/registro.html");
  cy.get("#nome").type(name);
  cy.get("#email").type(email);
  cy.get("#senha").type(password);
  cy.get("form").submit();
});

Cypress.Commands.add("clearAndVisit", (url) => {
  cy.clearLocalStorage();
  cy.visit(url);
});


