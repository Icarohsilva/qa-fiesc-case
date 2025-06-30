import { prisma } from '../../src/prisma/client.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.test' });

beforeAll(async () => {
  await prisma.pedidoIngrediente.deleteMany();
  await prisma.pedido.deleteMany();
  await prisma.usuario.deleteMany();
});

describe('Auth: registro e login', () => {
  const dadosUsuario = {
    nome: 'Maria Teste',
    email: 'maria@teste.com',
    senha: '1234567' 
  };

  test('registro com dados válidos', async () => {
    const senhaHash = await bcrypt.hash(dadosUsuario.senha, 10);
    const usuario = await prisma.usuario.create({
      data: {
        nome: dadosUsuario.nome,
        email: dadosUsuario.email,
        senha: senhaHash
      }
    });

    expect(usuario).toHaveProperty('id');
    expect(usuario.email).toBe(dadosUsuario.email);
  });

  test('falha ao registrar email duplicado', async () => {
    try {
      await prisma.usuario.create({
        data: {
          nome: 'Outro',
          email: dadosUsuario.email,
          senha: '1234567'
        }
      });
    } catch (error) {
      expect(error.code).toBe('P2002'); // Violação de unique
    }
  });

  test('login com senha correta retorna token', async () => {
    const usuario = await prisma.usuario.findUnique({
      where: { email: dadosUsuario.email }
    });

    const valido = await bcrypt.compare(dadosUsuario.senha, usuario.senha);
    expect(valido).toBe(true);

    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET);
    expect(token).toBeDefined();
  });

  test('login com senha errada falha', async () => {
    const usuario = await prisma.usuario.findUnique({
      where: { email: dadosUsuario.email }
    });

    const valido = await bcrypt.compare('senhaErrada', usuario.senha);
    expect(valido).toBe(false);
  });
});

