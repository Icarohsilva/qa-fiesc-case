import { prisma } from '../../src/prisma/client.js';

describe('Pedidos', () => {
  let usuario;

  beforeAll(async () => {
    await prisma.pedidoIngrediente.deleteMany();
    await prisma.pedido.deleteMany();
    usuario = await prisma.usuario.findFirst();
  });

  test('cria pedido com ingredientes válidos', async () => {
    const ingredientesBase = await prisma.ingrediente.findMany({ where: { tipo: 'BASE', disponivel: true } });
    const adicionais = await prisma.ingrediente.findMany({ where: { tipo: 'ADICIONAL', disponivel: true } });

    const pedido = await prisma.pedido.create({
      data: {
        usuarioId: usuario.id,
        nome: 'Café Teste',
        ingredientes: {
          create: [
            { ingredienteId: ingredientesBase[0].id, tipo: 'BASE' },
            { ingredienteId: adicionais[0].id, tipo: 'ADICIONAL' }
          ]
        }
      },
      include: {
        ingredientes: true
      }
    });

    expect(pedido).toHaveProperty('id');
    expect(pedido.ingredientes.length).toBeGreaterThanOrEqual(2);
  });

  test('falha se ingrediente não existir', async () => {
    try {
      await prisma.pedido.create({
        data: {
          usuarioId: usuario.id,
          nome: 'Falha',
          ingredientes: {
            create: [
              { ingredienteId: 9999, tipo: 'BASE' }
            ]
          }
        }
      });
    } catch (err) {
      expect(err.code).toBe('P2003');
    }
  });
});
