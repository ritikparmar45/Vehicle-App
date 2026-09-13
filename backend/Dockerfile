# Multi-stage production build for Node.js Express backend
FROM node:20-alpine AS base
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 5000

ENV NODE_ENV=production

CMD ["npm", "start"]
