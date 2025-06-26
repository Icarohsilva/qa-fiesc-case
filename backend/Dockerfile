# Usa imagem leve do Node.js
FROM node:18-alpine

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala todas as dependências (inclusive dev para desenvolvimento)
RUN npm install

# Instala nodemon globalmente (garante que o comando existe)
RUN npm install -g nodemon

# Copia o restante da aplicação
COPY . .

# Expõe a porta 3000
EXPOSE 3000

# Comando para iniciar com nodemon
CMD ["npm", "run", "dev"]