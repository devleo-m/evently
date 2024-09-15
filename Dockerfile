# Use a imagem oficial do Node.js como base
FROM node:18-alpine

# Crie e defina o diretório de trabalho
WORKDIR /app

# Copie o package.json e o package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm ci

# Copie o restante do código para o diretório de trabalho
COPY . .

# Copie o arquivo .env para o diretório de trabalho
COPY .env ./

# Compile o TypeScript
RUN npm run build

# Exponha a porta que o servidor vai usar
EXPOSE 3000

# Defina o comando para iniciar o servidor
CMD ["npm", "start"]