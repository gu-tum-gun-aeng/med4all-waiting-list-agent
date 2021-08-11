# Stage 1: Build 
FROM node:16-alpine AS BUILDER

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --force

COPY . .
RUN npm run build
RUN npm prune --production

# Stage 2: Bundle 
FROM node:16-alpine

WORKDIR /usr/src/app

COPY --from=BUILDER /usr/src/app/build ./build
COPY --from=BUILDER /usr/src/app/node_modules ./node_modules

CMD ["node", "build/main/index"]
