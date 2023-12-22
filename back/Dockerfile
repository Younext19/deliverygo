# Utilisation de l'image Node.js 18
FROM node:18
WORKDIR /back
COPY package.json /back/
RUN npm install
COPY . /back/
EXPOSE 8080
CMD ["npm", "run" , "dev"]
