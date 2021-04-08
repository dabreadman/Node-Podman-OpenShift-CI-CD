# Install dev dependencies stage
FROM node:12-alpine as application_modules

COPY . . 

RUN npm install

RUN npm test && npm run lint && npm run build

# Start Server
FROM node:12-alpine

COPY server.js ./

COPY container-package.json ./package.json

COPY --from=application_modules /dist ./dist

RUN npm install

ENV PORT=8080

EXPOSE 8080

CMD ["npm", "start"]