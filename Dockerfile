FROM node:latest

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

COPY ./ ./

RUN npm i -timeout=600000

EXPOSE 3000

CMD [ "npm", "start" ]
