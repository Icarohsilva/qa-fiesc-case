## 📋 Plano de Testes - Sistema de Cafeteria

### Objetivo

Garantir que o sistema de cafeteria funcione conforme os requisitos funcionais (RF) e regras de negócio (RN), com cobertura ampla de testes automatizados e manuais.

---

## ✅ Estrutura do Teste

### 🔢 Tipos de Teste:

* **Testes Unitários**: Validação de funções isoladas no backend (ex: identificador de café).
* **Testes de Integração**: Verifica a integração entre módulos (API + DB).
* **Testes de API**: Validação via Postman/Newman de todos os endpoints.
* **Testes E2E (Cypress)**: Validação da jornada completa do usuário.
* **Testes Funcionais Manuais**: Exploração via navegador.

---

## 📑 Casos de Teste (Resumo)

### ✅ Testes de Interface - Login

| Cenário                       | Massa de Teste | Passos                                        | Resultado Esperado                       |
| ----------------------------- | -------------- | --------------------------------------------- | ---------------------------------------- |
| Login com credenciais válidas | Email + senha  | Preencher dados e submeter                    | Redirecionar para pedido.html            |
| Login com senha incorreta     | Email + senha  | Preencher dados com senha errada              | Mostrar erro: "Email ou senha inválidos" |
| Login com email inválido      | Email inválido | Submeter com formato inválido ("sem\@arroba") | Mostrar erro: "Email inválido"           |
| Login com campos vazios       | -              | Submeter sem preencher campos                 | Mostrar erros de campo obrigatório       |

### ☕ Testes de Interface - Montar Pedido

| Cenário                      | Massa de Teste               | Passos                                          | Resultado Esperado                                   |
| ---------------------------- | ---------------------------- | ----------------------------------------------- | ---------------------------------------------------- |
| Selecionar ingredientes base | 2 ingredientes base          | Clicar em Espresso + Leite e montar             | Abrir modal de adicionais                            |
| Exceder limite de adicionais | 3 adicionais                 | Selecionar 3 adicionais e confirmar             | Mostrar mensagem de erro                             |
| Confirmar café clássico      | Espresso + Leite             | Selecionar clássico (Latte) + 1 adicional       | Mostrar resumo com nome clássico                     |
| Confirmar café personalizado | Sorvete de Creme + Chantilly | Montar com ingredientes que não formam clássico | Mostrar resumo com nome "Café Personalizado"         |
| Submeter pedido              | Qualquer seleção válida      | Confirmar pedido                                | Exibir tela de sucesso e redirecionar para histórico |

---