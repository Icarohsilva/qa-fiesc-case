# Projeto Cafeteria – Avaliação Prática QA Pleno (FIESC/SENAI - Processo Seletivo 01517/2025)

Este repositório apresenta a solução completa da avaliação prática para a vaga de Analista de Qualidade de Software – Pleno, integrando frontend, backend, banco de dados, Docker, testes automatizados (unitários, API e E2E), plano de testes, especificações Gherkin e relatório de bugs.

## 1. Visão Geral

O sistema permite que clientes personalizem seus cafés por meio da seleção de ingredientes básicos e adicionais, com reconhecimento de sabores clássicos e pedidos persistidos.

Arquitetura geral:

* **Frontend**: HTML, CSS e JavaScript.
* **Backend**: Node.js + Express + Prisma ORM.
* **Banco de Dados**: PostgreSQL.
* **Ambiente**: Docker + Docker Compose.
* **Testes**: Jest, Supertest, Postman/Newman, Cypress.

---

## 2. Execução do Projeto com Docker

### 🧩 Requisitos

Para rodar via Docker (recomendado):

- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

Para rodar localmente (opcional):

- [Node.js](https://nodejs.org/) (versão 18+)
- [PostgreSQL](https://www.postgresql.org/) (porta 5432)
- [Prisma CLI](https://www.prisma.io/docs/cli)

---

### Etapas:

   2.1. **Clone o projeto:**

```bash
git clone https://github.com/SENAI-SD/qa-pleno-01517-2025-128.100.226-74
cd qa-pleno-01517-2025-128.100.226-74
```

---

   2.2. **Configure as variáveis de ambiente:**
      Crie `backend/.env` com:

```
DATABASE_URL=postgres://postgres:postgres@db:5432/cafeteria
JWT_SECRET=<chave_segura>
JWT_EXPIRES_IN=1d
```

#### Em Linux/Mac/WSL/Git Bash:

```bash
cat <<EOF > backend/.env
DATABASE_URL=postgres://postgres:postgres@db:5432/cafeteria
JWT_SECRET=chave-super-secreta
JWT_EXPIRES_IN=1d
EOF
````

#### Em Windows PowerShell:

```powershell
@"
DATABASE_URL=postgres://postgres:postgres@db:5432/cafeteria
JWT_SECRET=chave-super-secreta
JWT_EXPIRES_IN=1d
"@ | Set-Content -Path "backend/.env"
```

---

   2.3. **Suba o ambiente:**

   **Esse comando irá:**
   * Criar e rodar os containers da aplicação
   * Aplicar automaticamente as migrations do banco de dados
   * Executar o seed com dados iniciais (ingredientes, cafés clássicos, etc.)
   * Executar os testes de API e E2E automaticamente

```bash
docker-compose up --build
```

---

   2.4. **Acesse:**

* Frontend: [http://localhost](http://localhost)
* API: [http://localhost:3001](http://localhost:3001)

---

### 🔁 Execução Automática de Testes com Docker

Assim que o sistema é iniciado com `docker-compose`, **os testes automatizados são executados automaticamente** nos containers apropriados, garantindo a qualidade desde o primeiro momento. A arquitetura contempla:

#### 📦 Containers Criados

| Serviço         | Imagem Base                         | Porta(s)  | Função                                                              |
| --------------- | ----------------------------------- | --------- | ------------------------------------------------------------------- |
| `db`            | `postgres:15`                       | 5432:5432 | Banco de dados PostgreSQL                                           |
| `backend`       | `qa-pleno-01517-2025-backend`       | 3001:3001 | API RESTful Node.js com Prisma + testes unitários via Jest          |
| `frontend`      | `qa-pleno-01517-2025-frontend`      | 80:80     | Interface Web estática (HTML/CSS/JS)                                |
| `api-tests`     | `postman/newman:latest`             | —         | Executa os **testes de API** automaticamente com Postman + Newman   |
| `cypress-tests` | `qa-pleno-01517-2025-cypress-tests` | —         | Executa os **testes E2E de interface** com Cypress em headless mode |

#### ⚙️ Funcionamento

* **Testes Unitários:** Executados automaticamente no container `backend` assim que ele é iniciado, via script no `entrypoint.sh`.
* **Testes de API:** Disparados pelo container `api-tests` com base na coleção Postman, sem interação manual.
* **Testes E2E (Cypress):** Rodam de forma headless no container `cypress-tests` após o backend e frontend estarem disponíveis.

#### ✅ Benefícios

* **Zero configuração local:** Todo o ambiente de testes é reproduzido via Docker.
* **Validação contínua:** Qualquer alteração já passa por uma bateria de testes automaticamente.
* **Ambiente replicável:** Mesmo comportamento em diferentes máquinas e ambientes (CI/CD).

---

## 3. Requisitos Não Funcionais (RQNF)

| Código | Descrição                                              | Status                              |
| ------ | ------------------------------------------------------ | ----------------------------------- |
| RQNF01 | Backend em JavaScript com PostgreSQL                   | Atendido                            |
| RQNF02 | Dockerização completa                                  | Atendido                            |
| RQNF03 | Testes unitários de regras de negócio                  | Atendido                            |
| RQNF04 | Proteção do backend via rede interna                   | Atendido                            |
| RQNF05 | Códigos HTTP adequados                                 | Atendido                            |
| RQNF06 | Tratamento de erros no frontend                        | Atendido                            |
| RQNF07 | Migrations automáticas via Prisma                      | Atendido                            |
| RQNF08 | Testes de API automatizados (Jest/Supertest + Postman) | Atendido                            |
| RQNF09 | Testes E2E com Cypress                                 | Atendido                            |
| RQNF10 | Documentação via README                                | Atendido                            |
| RQNF11 | Revisão de código e sugestões de melhorias             | Atendido                            |
| RQNF12 | Integração com SonarQube                               | Não Atendido (Justificativa abaixo) |
| RQNF13 | Especificações Gherkin                                 | Atendido                            |
| RQNF14 | Plano de testes                                        | Atendido                            |
| RQNF15 | Caixa Branca e Caixa Preta                             | Atendido                            |
| RQNF16 | Testes funcionais manuais + categorizados              | Atendido                            |
| RQNF17 | Relatório de bug identificado                          | Atendido                            |
| RQNF18 | Identificação de requisitos não atendidos              | Atendido                            |

---

## 4. Requisitos Funcionais Implementados

Requisitos RF001 a RF006 e Regras RN001 a RN006 foram totalmente implementadas, com destaque para:

* Identificação de cafés clássicos via ingredientes base
* Limite de ingredientes adicionais com feedback ao usuário
* Geração dinâmica do nome e resumo do pedido
* Validações de todos os fluxos

Detalhes completos das regras podem ser consultados no README anterior ou no plano de testes.

---

## 5. Testes Automatizados

### Testes Unitários

* Local: `backend/tests/unit/`
* Validação de funções: identificação de café clássico, autenticação, pedidos

### Testes de API

* Local: `backend/tests/api/`
* Postman + Newman (via Docker)
* Jest + Supertest para testes diretos
* Cobertura de:

  * Login/Registro
  * Identificação de café
  * Criação de pedido
  * Respostas de erro e códigos HTTP

### Testes E2E

* Local: `tests/cypress/e2e/`
* Framework: Cypress
* Casos de teste:

  * Login (positivo, negativo, campo vazio)
  * Registro (validação, sucesso, duplicado)
  * Personalização do café (bases, adicionais, resumo)
  * Confirmação de pedido
  * Validação de limites

---

## 6. Especificações Gherkin

* Local: `/docs/especificacao_com_cafe.feature`
* Cenários:

  * Selecionar ingredientes
  * Identificar café clássico
  * Limite de adicionais
  * Finalização do pedido

---

## 7. Plano de Testes

* Local: `docs/plano_de_testes.md`
* Estratégia por prioridade (API > E2E > Unitário > Funcional)
* Classificação por tipo: caixa branca, preta, unitário, E2E
* Detalhamento de cobertura e justificativas

---

## 8. Relatório de Bug Identificado (RQNF17)

### Botão de confirmação de adicionais não é desabilitado ao exceder limite
* **Problema**: Botão "Confirmar Adicionais" não é desabilitado ao exceder limite
* **Impacto**: Usuário pode tentar enviar dados inválidos
* **Solução sugerida**: desabilitar botão quando limite for atingido


### Modal desalinhado na confirmação do pedido
* **Problema**: Modal de confirmação do pedido aparece no canto superior esquerdo
* **Impacto**: Layout desalinhado pode causar confusão e prejudicar a experiência do usuário
* **Solução sugerida**: Centralizar o modal na tela (horizontal e verticalmente, se possível)

---

## 9. Revisão de Código

### RQNF11 – Revisão de Código

Uma revisão criteriosa foi realizada em toda a aplicação com foco em boas práticas de desenvolvimento, qualidade de código e aderência aos padrões solicitados. A seguir, são apresentadas as observações e sugestões de melhorias identificadas:

#### Pontos Positivos

* **Estrutura clara e organizada**, com separação adequada de responsabilidades no backend (controllers, rotas, middlewares e serviços).
* Uso eficiente do **Prisma ORM**, com migrations e script de seed automatizado.
* Implementação de **validações básicas** com `express-validator`.
* **Frontend funcional, acessível e com boa usabilidade**, utilizando HTML, CSS moderno e JavaScript puro.
* Implementação de testes automatizados cobrindo:

  * **Testes unitários** com Jest
  * **Testes de API** com Postman + Newman
  * **Testes End-to-End (E2E)** com Cypress
* Uso de **Docker Compose** para orquestração dos serviços, facilitando a execução e o ambiente de testes.

#### Sugestões de Melhorias Futuras

| Área                      | Sugestão de Melhoria                                                                                           | Benefício                                              |
| ------------------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| **Frontend (JavaScript)** | Modularizar o código em arquivos separados (ex: `api.js`, `ui.js`, `auth.js`)                                  | Melhora a manutenção, legibilidade e testabilidade     |
| **Validações Backend**    | Adotar bibliotecas como `Joi` ou `Zod` para validação de payloads                                              | Validações mais seguras, tipadas e centralizadas       |
| **Tratamento de Erros**   | Criar um middleware centralizado para tratamento de erros                                                      | Reduz duplicações e padroniza as respostas da API      |
| **Enums e Constantes**    | Extrair strings fixas como tipos (`BASE`, `ADICIONAL`) e status (`RECEBIDO`, etc.) para arquivos de constantes | Evita erros de digitação e facilita futuras alterações |
| **Mensagens do Sistema**  | Centralizar mensagens de feedback em arquivos de idioma (`i18n`)                                               | Facilita a manutenção e internacionalização            |
| **Testes Unitários**      | Criar mocks para o Prisma Client nos testes unitários                                                          | Permite testes mais rápidos, isolados e confiáveis     |

#### Conclusão

O projeto demonstra um excelente nível técnico, com entregas bem estruturadas e funcionais. As sugestões listadas têm foco em **escalabilidade, qualidade contínua e padronização**. São melhorias incrementais que podem ser aplicadas em fases posteriores para transformar essa base sólida em uma aplicação de nível produtivo.

---

## 10. Requisitos Não Atendidos

### RQNF12 - SonarQube

* Não implementado por restrição de tempo e infraestrutura
* Em um projeto real, seria integrado no pipeline CI/CD

---

## 11. Considerações Finais

Este projeto demonstra proficiência em qualidade de software, cobrindo desde testes automatizados até experiência do usuário e arquitetura limpa. Entrega robusta, documentada, com testes em camadas e sugestões de evolução realistas.

> Feito com 💛 por Icaro Henrique para a FIESC/SENAI
