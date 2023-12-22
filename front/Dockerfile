FROM node:18
WORKDIR /front
COPY package.json  /front/
RUN npm install
COPY . /front/
EXPOSE 4200
CMD ["npm", "run", "start"]
