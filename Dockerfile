FROM node:22.11-alpine AS dev

WORKDIR /api

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3000
