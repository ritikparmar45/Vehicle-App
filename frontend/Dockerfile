# Build stage
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Serving stage with static preview server
FROM node:20-alpine AS runner
WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY --from=build /app/dist ./dist

EXPOSE 5173

CMD ["npx", "vite", "preview", "--host", "0.0.0.0", "--port", "5173"]
