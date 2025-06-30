// File: backend/src/routes/ingredientes.js
import { Router } from 'express';
import { prisma } from '../prisma/client.js';
import { validarTipoIngrediente } from '../middlewares/validacao.js';
import { validarToken } from '../middlewares/auth.js';

const router = Router();

/**
 * @swagger
 * /ingredientes:
 *   get:
 *     summary: Lista todos os ingredientes
 *     tags: [Ingredientes]
 *     parameters:
 *       - in: query
 *         name: tipo
 *         schema:
 *           type: string
 *           enum: [BASE, ADICIONAL]
 *         description: Filtro por tipo de ingrediente
 *     responses:
 *       200:
 *         description: Lista de ingredientes
 */
router.get('/', validarToken, validarTipoIngrediente, async (req, res) => {
  try {
    const { tipo } = req.query;

    const ingredientes = await prisma.ingrediente.findMany({
      where: {
        ativo: true,
        ...(tipo && { tipo })
      },
      select: {
        id: true,
        nome: true,
        tipo: true,
        valor: true,
        disponivel: true,
        criadoEm: true
      }
    });

    res.json(ingredientes);
  } catch (error) {
    console.error('Erro ao buscar ingredientes:', error);
    res.status(500).json({ 
      erro: 'Falha ao carregar ingredientes',
      code: 'INGREDIENTES_FALHA'
    });
  }
});

/**
 * @swagger
 * /ingredientes/disponiveis:
 *   get:
 *     summary: Lista ingredientes disponíveis
 *     tags: [Ingredientes]
 *     responses:
 *       200:
 *         description: Lista de ingredientes disponíveis
 */
router.get('/disponiveis', validarToken, async (req, res) => {
  try {
    const ingredientes = await prisma.ingrediente.findMany({
      where: {
        ativo: true,
        disponivel: true
      },
      select: {
        id: true,
        nome: true,
        tipo: true,
        valor: true
      }
    });

    res.json(ingredientes);
  } catch (error) {
    res.status(500).json({
      erro: 'Falha ao buscar ingredientes disponíveis',
      code: 'INGREDIENTES_DISPONIVEIS_FALHA'
    });
  }
});

export default router;