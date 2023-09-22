# syntax=docker/dockerfile:1

FROM node:16.17
WORKDIR /SERVER
COPY . .
RUN npm install --production
CMD ["node", "src/index.js"]
EXPOSE 3030