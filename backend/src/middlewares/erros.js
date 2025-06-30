// backend/src/middlewares/erros.js
export const manipuladorErros = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ erro: err.message || 'Erro interno' });
};