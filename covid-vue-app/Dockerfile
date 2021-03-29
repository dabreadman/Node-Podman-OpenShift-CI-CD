# Install dev dependencies stage
FROM node:12-alpine as application_modules

WORKDIR /usr/src/app

RUN ls

COPY package*.json ./

RUN npm install

# Test and lint and Prod build
FROM node:12-alpine as prod_build

WORKDIR /usr/src/app

RUN ls

COPY . . 

COPY --from=application_modules /usr/src/app/node_modules ./node_modules

RUN npm test && npm run lint && npm run build

# Install Server dependencies
FROM node:12-alpine as server_modules

WORKDIR /usr/src/app

RUN ls

COPY container-package.json ./package.json

RUN npm install

# Start Server
FROM node:12-alpine

WORKDIR /usr/src/app

RUN ls

COPY --from=prod_build /usr/src/app/dist ./dist

COPY --from=server_modules /usr/src/app/node_modules ./node_modules

COPY server.js ./

COPY container-package.json ./package.json

ENV PORT=8080

EXPOSE 8080

CMD ["npm", "start"]
