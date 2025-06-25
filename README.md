
# Estudo de Caso - Analista de Qualidade de Software (FIESC)

Este projeto simula uma API RESTful construída para o estudo de caso da vaga de Analista de Qualidade de Software (Pleno) - FIESC.

## 🛠️ Tecnologias utilizadas

- Node.js (Express)
- PostgreSQL
- Docker e Docker Compose
- Cypress (testes E2E)
- dotenv

## 📁 Estrutura do projeto

```
qa-fiesc-case/
├── backend/
│   ├── src/
│   │   └── index.js
│   ├── db/
│   │   └── init.sql
│   ├── cypress/
│   │   └── e2e/usuarios.spec.js
│   ├── .env
│   ├── Dockerfile
│   ├── package.json
│   └── cypress.config.js
├── docker-compose.yml
```

## 🚀 Como rodar o projeto

### Pré-requisitos

- Docker e Docker Compose instalados
- Node.js v18+ instalado para rodar localmente (opcional)
- Conta no GitHub

### 1. Clone o projeto

```bash
git clone https://github.com/seu-usuario/qa-fiesc-case.git
cd qa-fiesc-case
```

### 2. Suba os containers com Docker

```bash
docker compose up --build
```

### 3. Verifique se a API está no ar

Acesse `http://localhost:3000` → Deve mostrar: `API está no ar 🚀`

## 🧪 Como rodar os testes E2E (Cypress)

Dentro da pasta `backend`, execute:

```bash
npx cypress run
```

Ou use a interface visual com:

```bash
npx cypress open
```

## 🧰 Endpoints disponíveis

### `GET /usuarios`
Lista todos os usuários cadastrados.

### `POST /usuarios`
Cadastra um novo usuário.

**Corpo da requisição:**
```json
{
  "nome": "Ícaro Silva",
  "email": "icarosilva@example.com"
}
```

## 🗃️ Banco de dados

Banco PostgreSQL rodando via Docker. O script `init.sql` cria a tabela `usuarios` automaticamente na primeira execução.

## 📄 Variáveis de ambiente (`.env`)

```env
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=qa_fiesc
PORT=3000
```

## ✅ Checklist completo

- [x] Backend funcional com rotas REST
- [x] Banco de dados conectado via Docker
- [x] Tabela `usuarios` criada automaticamente
- [x] Testes automatizados com Cypress
- [x] Documentação pronta para entrega

## 👨‍💻 Autor
Para dúvidas ou sugestões, entre em contato com:
Ícaro Henrique Nunes Viana Silva
Email:contatoicarosilva@outlook.com
LinkedIn: https://www.linkedin.com/in/icarosilvaqa/