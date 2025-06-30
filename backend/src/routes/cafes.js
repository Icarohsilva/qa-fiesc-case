// backend/src/routes/cafes.js
import { Router } from 'express'
import { prisma } from '../prisma/client.js'
import { validarIngredientes } from '../middlewares/validacao.js'

const router = Router()

router.post('/identificar', validarIngredientes, async (req, res) => {
  const { ingredientesIds } = req.body

  try {
    const cafesClassicos = await prisma.cafeClassico.findMany({
      include: {
        ingredientes: {
          select: { ingredienteId: true }
        }
      }
    })

    const recebidosOrdenados = [...ingredientesIds].sort()
    const cafeIdentificado = cafesClassicos.find(cafe => {
      const idsClassicos = cafe.ingredientes.map(i => i.ingredienteId).sort()
      return JSON.stringify(idsClassicos) === JSON.stringify(recebidosOrdenados)
    })

    if (cafeIdentificado) {
      return res.json({
        nome: cafeIdentificado.nome,
        descricao: cafeIdentificado.descricao,
        tipo: 'CLÁSSICO'
      })
    }

    return res.json({
      nome: 'Café Personalizado',
      descricao: 'Combinação única de ingredientes',
      tipo: 'PERSONALIZADO'
    })
  } catch (error) {
    console.error('Erro ao identificar café:', error)
    res.status(500).json({ erro: 'Erro interno ao identificar café' })
  }
})

export default router
