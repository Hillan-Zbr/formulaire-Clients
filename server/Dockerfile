# Utiliser une version légère de Node.js
FROM node:18-alpine

# Définir le dossier de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install --production

# Copier le reste du code source
COPY . .

# Exposer le port (Fly.io utilise généralement le 8080 ou le port défini par env)
EXPOSE 5000

# Commande de démarrage
CMD ["npm", "start"]

