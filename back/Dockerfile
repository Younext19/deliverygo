# Utilisation de l'image Node.js 18
FROM node:18

# Définir le répertoire de travail à /backend
WORKDIR /back
# Copier le fichier package.json et le fichier package-lock.json
RUN ls
RUN pwd
COPY package.json /back/

# Installer les dépendances (en excluant les dépendances de développement)
RUN npm install

# Copier le reste des fichiers dans le conteneur
COPY . /back/

# Transpiler TypeScript en JavaScript
#RUN npm run build

# Exposer le port 8080 pour les connexions entrantes
EXPOSE 8080

# Utiliser node pour exécuter le fichier transpilé (par exemple index.js)
CMD ["npm", "run" , "dev"]
