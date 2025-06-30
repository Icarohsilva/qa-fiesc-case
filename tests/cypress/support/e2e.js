// Importa comandos personalizados definidos em commands.js
import './commands'

// Configuração global opcional

// Ignora erros de exceções não tratadas na aplicação que não afetam os testes
Cypress.on('uncaught:exception', (err, runnable) => {
  console.warn('Erro não tratado ignorado:', err.message)
  return false // Impede que o teste falhe
})

// Se quiser manter o estado do localStorage entre testes, ative abaixo:
// Requer instalação do pacote cypress-localstorage-commands:
// npm install --save-dev cypress-localstorage-commands

// import "cypress-localstorage-commands"
// beforeEach(() => {
//   cy.restoreLocalStorage()
// })
// afterEach(() => {
//   cy.saveLocalStorage()
// })