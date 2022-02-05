FROM arm64v8/node:latest

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

COPY ./ ./

RUN npm i

EXPOSE 3000

CMD [ "npm", "start" ]
