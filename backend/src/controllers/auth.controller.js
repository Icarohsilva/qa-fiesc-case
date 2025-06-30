// backend/src/controllers/auth.controller.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { prisma } from '../prisma/client.js'

// Configurações do JWT

const EXPIRACAO_TOKEN = process.env.JWT_EXPIRES_IN || '1d';
const gerarToken = (usuario) => jwt.sign({ id: usuario.id, email: usuario.email, role: usuario.role || 'CLIENTE' }, process.env.JWT_SECRET, { expiresIn: EXPIRACAO_TOKEN });

export const registrar = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
    const existeUsuario = await prisma.usuario.findUnique({ where: { email } });
    if (existeUsuario) return res.status(400).json({ erro: 'Email já cadastrado' });
    const senhaHash = await bcrypt.hash(senha, 12);
    const usuario = await prisma.usuario.create({ data: { nome, email, senha: senhaHash } });
    const token = gerarToken(usuario);
    const { senha: _, ...usuarioSemSenha } = usuario;
    return res.status(201).json({ usuario: usuarioSemSenha, token, expiraEm: EXPIRACAO_TOKEN });
  } catch (error) {
    return res.status(500).json({ erro: 'Erro ao registrar usuário' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const usuario = await prisma.usuario.findUnique({ where: { email } });
    if (!usuario) return res.status(401).json({ erro: 'Credenciais inválidas' });
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) return res.status(401).json({ erro: 'Credenciais inválidas' });
    const token = gerarToken(usuario);
    const { senha: _, ...usuarioSemSenha } = usuario;
    res.json({ usuario: usuarioSemSenha, token, expiraEm: EXPIRACAO_TOKEN });
  } catch (error) {
    res.status(500).json({ erro: 'Erro durante o login' });
  }
};