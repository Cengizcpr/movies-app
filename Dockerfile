FROM node:21-alpine3.18

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start"]
