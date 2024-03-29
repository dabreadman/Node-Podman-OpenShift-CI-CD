# Install dev dependencies stage
FROM node:15-alpine as application_modules

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk add --no-cache git

RUN npm install

# Test and lint and Prod build

FROM node:15-alpine as prod_build

ARG VUE_APP_COVIDAPIKEY
ARG VUE_APP_POPULATIONAPIKEY

ENV VUE_APP_COVIDAPIKEY=${VUE_APP_COVIDAPIKEY}
ENV VUE_APP_POPULATIONAPIKEY=${VUE_APP_POPULATIONAPIKEY}

WORKDIR /usr/src/app

COPY . . 

COPY --from=application_modules /usr/src/app/node_modules ./node_modules

RUN npm test && npm run lint && npm run build

# Install Server dependencies
FROM node:15-alpine as server_modules

WORKDIR /usr/src/app

COPY ./server/container-package.json ./package.json

COPY ./server/package-lock.json ./package-lock.json

RUN npm install

# Start Server
FROM node:15-alpine

ARG APP_PORT

ENV APP_PORT=${APP_PORT}

WORKDIR /usr/src/app

COPY --from=prod_build /usr/src/app/dist ./dist

COPY --from=server_modules /usr/src/app/node_modules ./node_modules

COPY ./server/server.js ./

COPY ./server/container-package.json ./package.json

EXPOSE ${APP_PORT}

USER node

CMD ["npm", "start"]
