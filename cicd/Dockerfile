FROM node:18.20.4-alpine3.20 as builder

WORKDIR /app

RUN npm install -g pnpm

COPY package*.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm build

FROM node:18.20.4-alpine3.20

WORKDIR /app

COPY --from=builder /src/.next ./.next
COPY --from=builder /src/public ./public
COPY --from=builder /src/node_modules ./node_modules
COPY --from=builder /src/package.json ./package.json

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV PORT=3000

EXPOSE 3000


CMD ["npm", "start"]
