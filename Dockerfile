# Stage 1 building the code
FROM node:14.15-alpine as builder
WORKDIR /usr/app
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn build

# Stage 2 running the code
FROM node:14.15-alpine
WORKDIR /usr/app
COPY package*.json ./
RUN yarn install --production

COPY --from=builder /usr/app/dist ./dist

COPY .env .

EXPOSE 3000

CMD yarn start
