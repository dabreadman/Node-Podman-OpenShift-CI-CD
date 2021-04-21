# covid-vue-app

This application tracks COVID-19 cases across the world. It uses information from a [COVID-19 API](https://rapidapi.com/KishCom/api/covid-19-coronavirus-statistics) and a [Population API](https://world-population.p.rapidapi.com/population) and shows vital information about the virus with the help of bar charts, pie charts, and real time statistics.

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

### Set up API Keys
1. Make a file called `.env` and `.env.production` inside the `covid-vue-app` directory. Get the two API keys needed for this application from the [COVID-19 API](https://rapidapi.com/KishCom/api/covid-19-coronavirus-statistics) and from the [Population API](https://world-population.p.rapidapi.com/population) (They are both free!). Then, put this in both `.env` files:
`VUE_APP_COVIDAPIKEY = 'ENTER_YOUR_API_KEY_HERE'` 
`VUE_APP_POPULATIONAPIKEY = 'ENTER_YOUR_API_KEY_HERE'`
The API keys will now be set.

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
