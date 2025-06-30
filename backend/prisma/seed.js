import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10)

  await prisma.usuario.upsert({
    where: { email: 'admin@cafeteria.com' },
    update: {
      senha: hashedPassword,
      nome: 'Administrador',
      role: 'ADMIN'
    },
    create: {
      nome: 'Administrador',
      email: 'admin@cafeteria.com',
      senha: hashedPassword,
      role: 'ADMIN'
    }
  });

  // Ordem correta para evitar violação de constraints
  await prisma.pedidoIngrediente.deleteMany()
  await prisma.pedido.deleteMany()
  await prisma.cafeIngrediente.deleteMany()
  await prisma.cafeClassico.deleteMany()
  await prisma.ingrediente.deleteMany()

  const ingredientesBase = [
    { nome: 'Espresso', tipo: 'BASE', valor: 4.00 },
    { nome: 'Leite', tipo: 'BASE', valor: 3.00 },
    { nome: 'Chocolate', tipo: 'BASE', valor: 3.50 },
    { nome: 'Sorvete de Creme', tipo: 'BASE', valor: 5.00 },
    { nome: 'Espuma', tipo: 'BASE', valor: 2.00 }
  ]

  const ingredientesAdicionais = [
    { nome: 'Canela', tipo: 'ADICIONAL', valor: 1.50 },
    { nome: 'Chantilly', tipo: 'ADICIONAL', valor: 2.00 },
    { nome: 'Caramelo', tipo: 'ADICIONAL', valor: 2.50 }
  ]

  await prisma.ingrediente.createMany({
    data: [...ingredientesBase, ...ingredientesAdicionais],
    skipDuplicates: true
  })

  const saboresClassicos = [
    {
      nome: 'Macchiato',
      descricao: 'Espresso com leite e espuma',
      ingredientes: ['Espresso', 'Leite', 'Espuma']
    },
    {
      nome: 'Latte',
      descricao: 'Espresso e leite',
      ingredientes: ['Espresso', 'Leite']
    },
    {
      nome: 'Mocha',
      descricao: 'Espresso com leite e chocolate',
      ingredientes: ['Espresso', 'Leite', 'Chocolate']
    },
    {
      nome: 'Affogato',
      descricao: 'Sorvete de creme com Espresso',
      ingredientes: ['Sorvete de Creme', 'Espresso']
    }
  ]

  for (const sabor of saboresClassicos) {
    await prisma.cafeClassico.upsert({
      where: { nome: sabor.nome },
      update: {},
      create: {
        nome: sabor.nome,
        descricao: sabor.descricao,
        ingredientes: {
          create: await Promise.all(
            sabor.ingredientes.map(async (ingNome) => {
              const ingrediente = await prisma.ingrediente.findUniqueOrThrow({
                where: { nome: ingNome }
              })
              return { ingredienteId: ingrediente.id }
            })
          )
        }
      }
    })
  }

  console.log('✅ Seed atualizado com sucesso!')
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
