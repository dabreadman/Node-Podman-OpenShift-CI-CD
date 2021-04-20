# covid-vue-app

## Develop in a Containerised Environment

### Prerequisite

- [`docker`](https://docs.docker.com/get-docker/)
- [`docker-compose`](https://docs.docker.com/compose/install/)

This serves a hot reload server serving Vue application in a image, accessible at `localhost:8080`

```shell
docker-compose up
```

Read more on containerisation in `CONTAINER.md` in [`.\docker`](https://github.com/dabreadman/Node-Podman-OpenShift-CI-CD/tree/main/covid-vue-app/docker).

## Development on Local Environment

### Prerequisite

- [`Node.js`](https://nodejs.org/en/)
  
### Project setup

```shell
npm install
```

### Compiles and hot-reloads for development

```shell
npm run serve
```

#### Compiles and minifies for production

```shell
npm run build
```

#### Lints and fixes files

```shell
npm run lint
```
