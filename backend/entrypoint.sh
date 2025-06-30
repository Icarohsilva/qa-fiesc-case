#!/bin/bash

set -e

echo "Esperando o banco iniciar..."
while ! nc -z db 5432; do 
  sleep 1
done

echo "Banco pronto. Rodando Prisma..."
npx prisma migrate deploy

echo "Executando seed..."
node --experimental-json-modules prisma/seed.js

echo "Rodando testes unitários..."
npm test || echo "❌ Testes unitários falharam, mas continuando..."

echo "Iniciando servidor..."
exec node src/server.js

# fallback (nunca chega aqui se server.js funcionar)
echo "⚠️ O servidor finalizou inesperadamente."
tail -f /dev/null

echo "⏳ Aguardando o backend estabilizar..."
sleep 10