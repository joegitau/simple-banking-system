FROM node:17-alpine

WORKDIR /app

RUN npm install -g ts-node-dev

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]
