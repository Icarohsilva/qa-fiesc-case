// backend/src/server.js
import app from './app.js';
const PORT = process.env.PORT || 3001;
try {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  });
} catch (err) {
  console.error('❌ Erro ao iniciar o servidor:', err);
}