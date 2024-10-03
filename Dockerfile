# Use a imagem oficial do Node.js como base
FROM node:16
# Defina o diretório de trabalho dentro do contêiner
WORKDIR /frontend
# Copie o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package.json package-lock.json ./
# Instale as dependências do projeto
RUN npm install
# Copie todo o código-fonte para o diretório de trabalho
COPY . .
# Construa o projeto
RUN npm run build
# Exponha a porta que a aplicação irá rodar
EXPOSE 3000
# Comando para iniciar a aplicação
CMD ["npm", "run", "preview"]