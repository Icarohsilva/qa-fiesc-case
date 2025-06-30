import { Router } from 'express';
import { prisma } from '../prisma/client.js';
import { validarToken } from '../middlewares/auth.js';
import { validarPedido } from '../middlewares/validacao.js';

const router = Router();

// Criar um novo pedido
router.post('/', validarToken, validarPedido, async (req, res) => {
  try {
    const { ingredientesBaseIds, ingredientesAdicionaisIds = [] } = req.body;
    const { id: usuarioId } = req.usuario;

    const todosIds = [...ingredientesBaseIds, ...ingredientesAdicionaisIds];

    // Buscar ingredientes com valores
    const ingredientes = await prisma.ingrediente.findMany({
      where: { id: { in: todosIds }, ativo: true }
    });

    // Validar se existem IDs inválidos
    const idsEncontrados = ingredientes.map(i => i.id);
    const idsInvalidos = todosIds.filter(id => !idsEncontrados.includes(id));
    if (idsInvalidos.length > 0) {
      return res.status(400).json({
        erro: 'IDs inválidos ou inexistentes',
        idsInvalidos
      });
    }

    // Verificar se há ingredientes indisponíveis
    const indisponiveis = ingredientes.filter(i => !i.disponivel);
    if (indisponiveis.length > 0) {
      return res.status(400).json({
        erro: 'Alguns ingredientes estão indisponíveis',
        itens: indisponiveis.map(i => i.nome),
        code: 'INGREDIENTES_INDISPONIVEIS'
      });
    }

    // Verificar se é um café clássico
    const cafesClassicos = await prisma.cafeClassico.findMany({
      include: { ingredientes: { select: { ingredienteId: true } } }
    });

    const ingredientesBaseOrdenados = ingredientesBaseIds.sort().join(',');
    const cafeClassico = cafesClassicos.find(cafe => {
      const cafeIds = cafe.ingredientes.map(i => i.ingredienteId).sort().join(',');
      return cafeIds === ingredientesBaseOrdenados;
    });

    // CALCULAR VALOR TOTAL DO PEDIDO
    const valorTotal = ingredientes.reduce((acc, ing) => acc + ing.valor, 0);

    // Criar pedido com valor somado
    const pedido = await prisma.pedido.create({
      data: {
        usuarioId,
        nome: cafeClassico?.nome || 'Café Personalizado',
        status: 'RECEBIDO',
        valor: valorTotal,
        ingredientes: {
          create: [
            ...ingredientesBaseIds.map(ingredienteId => ({
              ingredienteId,
              tipo: 'BASE'
            })),
            ...ingredientesAdicionaisIds.map(ingredienteId => ({
              ingredienteId,
              tipo: 'ADICIONAL'
            }))
          ]
        }
      },
      include: {
        ingredientes: {
          include: {
            ingrediente: true
          }
        }
      }
    });

    res.status(201).json(pedido);
  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    res.status(500).json({
      erro: 'Falha ao registrar pedido',
      code: 'PEDIDO_FALHA'
    });
  }
});

// Histórico de pedidos
router.get('/historico', validarToken, async (req, res) => {
  try {
    const { id: usuarioId } = req.usuario;

    const pedidos = await prisma.pedido.findMany({
      where: { usuarioId },
      orderBy: { criadoEm: 'desc' },
      include: {
        ingredientes: {
          include: {
            ingrediente: true
          }
        }
      }
    });

    res.json(pedidos);
  } catch (error) {
    res.status(500).json({
      erro: 'Falha ao buscar histórico',
      code: 'HISTORICO_FALHA'
    });
  }
});

export default router;
