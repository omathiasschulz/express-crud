# dev mode
FROM node:22.11-alpine AS dev

ENV TZ=UTC-3

WORKDIR /api

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3000
