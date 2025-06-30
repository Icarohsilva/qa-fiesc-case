-- CreateEnum
CREATE TYPE "TipoIngrediente" AS ENUM ('BASE', 'ADICIONAL');

-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'CLIENTE',
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ingrediente" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "disponivel" BOOLEAN NOT NULL DEFAULT true,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ingrediente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cafeClassico" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,

    CONSTRAINT "cafeClassico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pedido" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL DEFAULT 'Pedido Anônimo',
    "usuarioId" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'RECEBIDO',
    "valor" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pedido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pedidoIngrediente" (
    "id" SERIAL NOT NULL,
    "pedidoId" INTEGER NOT NULL,
    "ingredienteId" INTEGER NOT NULL,
    "tipo" "TipoIngrediente" NOT NULL,

    CONSTRAINT "pedidoIngrediente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cafeIngrediente" (
    "cafeClassicoId" INTEGER NOT NULL,
    "ingredienteId" INTEGER NOT NULL,

    CONSTRAINT "cafeIngrediente_pkey" PRIMARY KEY ("cafeClassicoId","ingredienteId")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ingrediente_nome_key" ON "ingrediente"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "cafeClassico_nome_key" ON "cafeClassico"("nome");

-- AddForeignKey
ALTER TABLE "pedido" ADD CONSTRAINT "pedido_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedidoIngrediente" ADD CONSTRAINT "pedidoIngrediente_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "pedido"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedidoIngrediente" ADD CONSTRAINT "pedidoIngrediente_ingredienteId_fkey" FOREIGN KEY ("ingredienteId") REFERENCES "ingrediente"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cafeIngrediente" ADD CONSTRAINT "cafeIngrediente_cafeClassicoId_fkey" FOREIGN KEY ("cafeClassicoId") REFERENCES "cafeClassico"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cafeIngrediente" ADD CONSTRAINT "cafeIngrediente_ingredienteId_fkey" FOREIGN KEY ("ingredienteId") REFERENCES "ingrediente"("id") ON DELETE CASCADE ON UPDATE CASCADE;
