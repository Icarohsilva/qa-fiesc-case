// backend/src/middlewares/auth.js
import jwt from 'jsonwebtoken';
import { prisma } from '../prisma/client.js';

export const validarToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ erro: 'Token não fornecido' });
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const usuario = await prisma.usuario.findUnique({ where: { id: decoded.id }, select: { id: true, email: true, nome: true, role: true } });
    if (!usuario) return res.status(401).json({ erro: 'Usuário não encontrado' });
    req.usuario = usuario;
    next();
  } catch (error) {
    return res.status(401).json({ erro: 'Token inválido ou expirado' });
  }
};

export const verificarRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.usuario.role)) return res.status(403).json({ erro: 'Acesso não autorizado' });
    next();
  };
};