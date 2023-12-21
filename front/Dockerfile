# Utilisation d'une image Node.js 18 avec une base Alpine
FROM node:18
# Définir le répertoire de travail à /frontend
WORKDIR /front
# Copier les fichiers nécessaires
COPY package.json  /front/
# Installer les dépendances
RUN npm install
COPY . /front/
# Exposer le port 4200 pour les connexions entrantes
EXPOSE 4200
# Définir la commande de démarrage
CMD ["npm", "run", "start"]
