# Install dev dependencies stage
FROM node:12-alpine as application_modules

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk add --no-cache git

RUN npm install

# Test and lint and Prod build

FROM node:12-alpine as prod_build

ARG VUE_APP_COVIDAPIKEY
ARG VUE_APP_POPULATIONAPIKEY

ENV VUE_APP_COVIDAPIKEY = ${VUE_APP_COVIDAPIKEY}
ENV VUE_APP_POPULATIONAPIKEY = ${VUE_APP_POPULATIONAPIKEY}

WORKDIR /usr/src/app

COPY . . 

COPY --from=application_modules /usr/src/app/node_modules ./node_modules

RUN npm test && npm run lint && npm run build

# Install Server dependencies
FROM node:12-alpine as server_modules

WORKDIR /usr/src/app

COPY container-package.json ./package.json

RUN npm install

# Start Server
FROM node:12-alpine

WORKDIR /usr/src/app

COPY --from=prod_build /usr/src/app/dist ./dist

COPY --from=server_modules /usr/src/app/node_modules ./node_modules

COPY server.js ./

COPY container-package.json ./package.json

ENV PORT=8080

EXPOSE 8080

CMD ["npm", "start"]