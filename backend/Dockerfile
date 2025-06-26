# Imagem base oficial do Node.js
FROM node:18-alpine

# Define ambiente como desenvolvimento para instalar nodemon
ENV NODE_ENV=development

# Define o diretório de trabalho no container
WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala todas as dependências, incluindo as de desenvolvimento
RUN npm install

# Copia o restante do código
COPY . .

# Expõe a porta 3000
EXPOSE 3000

# Comando que inicia o servidor com nodemon
CMD ["npm", "run", "dev"]