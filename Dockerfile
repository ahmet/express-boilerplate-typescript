FROM node:lts-bookworm-slim as build
RUN mkdir -p /app
WORKDIR /app
ENV NODE_ENV=development
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build
RUN yarn install --production --ignore-scripts --prefer-offline --frozen-lockfile

FROM gcr.io/distroless/nodejs20-debian12
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./
COPY --from=build /app/package.json ./
COPY --from=build /app/yarn.lock ./

USER nonroot
EXPOSE 3000
CMD ["server.js"]
