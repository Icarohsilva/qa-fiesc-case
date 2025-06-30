FROM node:18

WORKDIR /app

# Instala netcat
RUN apt-get update && apt-get install -y netcat-traditional && rm -rf /var/lib/apt/lists/*

# Instala dependências Node
COPY package*.json ./
RUN npm install
RUN npm install -g newman newman-reporter-html

# Copia o restante do projeto
COPY . .

# Gera o Prisma Client
RUN npx prisma generate

# Copia o entrypoint e converte para Unix LF antes de dar permissão
COPY entrypoint.sh /entrypoint.sh
RUN sed -i 's/\r$//' /entrypoint.sh && chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]