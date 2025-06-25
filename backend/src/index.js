// Arquivo: backend/src/index.js
// Descrição: Este é o ponto de entrada da aplicação backend. Ele configura o servidor Express

require('dotenv').config(); // Carrega variáveis do .env

const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Testar conexão no start
pool.connect()
  .then(client => {
    console.log('Conectado ao PostgreSQL');
    client.release();
  })
  .catch(err => {
    console.error('Erro ao conectar ao PostgreSQL', err.stack);
  });

// Endpoint raiz para teste
app.get('/', (req, res) => {
  res.send('API está no ar 🚀');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Rota POST /usuarios - cadastrar usuário
app.post('/usuarios', async (req, res) => {
  const { nome, email } = req.body;

  if (!nome || !email) {
    return res.status(400).json({ error: 'Nome e email são obrigatórios' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO usuarios (nome, email) VALUES ($1, $2) RETURNING *',
      [nome, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    if (error.code === '23505') { // Violação de unique (email)
      return res.status(409).json({ error: 'Email já cadastrado' });
    }
    console.error(error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
});

// Rota GET /usuarios - listar todos usuários
app.get('/usuarios', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuarios ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
});