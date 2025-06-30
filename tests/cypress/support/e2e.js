import './commands'

Cypress.on('uncaught:exception', (err, runnable) => {
  // Retornar false aqui impede que o Cypress falhe o teste em caso de exceções não tratadas
  // Útil para ignorar erros de bibliotecas de terceiros que não afetam o teste
  return false
})


