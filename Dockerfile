FROM node:10.13.0

WORKDIR /aws/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080
CMD ["npm", "run", "prod:run"]
