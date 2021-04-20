# Containerisation

There's much to be talked about containerisation, but the core concept would be to ensure the same behaviour everywhere.  
What better way to do that than to run the same code in the exact same enviroment?  
That's where containers come into play.  

Too much?  
Container is a replica your environment, and you can do whatever you want to do to do the things you need to do if you can do it through CLI (generally).  
Nothing more, nothing less.  

## Dockerfile

We have seperated the tasks into multiple [layers](https://docs.docker.com/storage/storagedriver/).  
This allows us to rebuild image much faster by using unmodified cached content (`node_modules` for example)

Let's look at the first layer.

- First Layer

```docker
# Install dev dependencies stage
FROM node:15-alpine as application_modules

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk add --no-cache git

RUN npm install
```

To do anything, we first need an environment.  

We have decided to use `node:15-alpine` image.  
This is an image of Linux distro that contains [`node 15`](https://nodejs.org/en/blog/release/v15.0.0/), and [`alpine`](https://hub.docker.com/_/alpine) images are very compact!  
`FROM <image:tag>`

Then, we specify the `WORKDIR`, think of it as us `cd WORKDIR`, whatever the specified directory is.  
This makes it easier to look at, but functionality-wise, they're the same.  
`WORKDIR <dir>`

We need something to work with, there's currently none of our code in the image!  
We can copy over `package*.json` (which includes `package.json` and `package-lock.json`) into the current layer.  
`COPY <origin> <desitination>`

In this particular project, we have to install `git` to resolve some dependency issues, so let's do it.  
`RUN apk add --no-cache git`  

Now, `apk add` is very much what `apt install` is to `Ubuntu` for `Alpine`, it's a package manager.  
What we are interested in is the `RUN`.  
As you would've thought, it is running a command on CLI, as you'd have to as if it was your OS.  
Similarly, lets say you would like to `sudo rm -r`, because what could go wrong?  
What you need to do is `RUN sudo rm -r`.  
`RUN <something>`

Then, we do `npm install` to download the dependencies.  
Note, we have this suffix on line 2 `as application_modules`.  
We are labelling this layer as `application_modules`.  

Now why?  
This of why we are doing layers in the first place. Yes! It is to cache layers so we can avoid some redundant actions when the source didn't change.  
It is highly unlikely that `node_modules` would get updated often, but the source code would.  
This means that we'll be doing `npm install` every time, eventhough there's no reason to.  

Back to the question, why?  
Well, we can use this layer to do something! We'll see an example later.

- Second Layer

```docker
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
```

As before, we use `node:15-alpine` image, and for the next 4 lines, we see new things!  

Here, we have to introduce build time arguments!  
This allows us to build images without coupling environment variables and secrets in the Dockerfile.  

```docker
ARG input
ENV myVar=${input}
```

Take this example, what it is saying is that we are expecting a build time argument called `input`.  
`ENV myVar=${input}` this line means to set the environment variable `myVar` as the value of the build time argument `input`.  

We can pass in the build time argument by including `--build-arg input=myInput` to specify the `input` as `myInput`.  

And then what is this line `COPY --from=application_modules /usr/src/app/node_modules`?  
Remember us labelling the previous layer?  
Well, this allows us to copy the `node_modules` into here, which is very helpful as if the code in `src` changed, but not the packages, we don't have to install all packages again!

Then we run lint, test and build production code.  
`RUN npm test && npm run lint && npm run build`  
`&&` means to run it sequentially, though this is more `Linux` than container.

- Third Layer

```docker
# Install Server dependencies
FROM node:15-alpine as server_modules

WORKDIR /usr/src/app

COPY ./server/container-package.json ./package.json

COPY ./server/package-lock.json ./package-lock.json

RUN npm install
```

Similar to previous layers, in this layer we are installing the dependencies of `server.js` instead, nothing fancy.

- Final Layer

```docker
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

CMD ["npm", "start"]
```

In our final layer, which is also what the final image/container will be, we are copying the

- `dist` folder that contains production code
- `server.js` that would serve the production code
- `package.json` that defines `server.js` dependencies
- `node_modules` for `server.js`

We `EXPOSE ${APP_PORT}`, allowing connection to the image via the declared port.  
`EXPOSE <port>`

And finally, `CMD ["npm", "start"]`.  
This is equivalent to `npm start` in CLI.  

This would start the server, and serve as the last command to run when you do `docker run <image>`.  
Thus, we can only have a `CMD` declaration in a Dockerfile.  
`CMD [<something>, <else>, <and>, <something>]`.

## docker-compose.yml

We setup a docker-compose file to enable development in a containerise environment to ensure consistency.  

```yaml
version: "3.9"
services:
  web:
    build:
      context: ../
      dockerfile: ./docker/Dockerfiledev
    ports:
      - "8080:8080"
    volumes:
      - ../public:/usr/src/app/public
      - ../src:/usr/src/app/src
      - ../package.json:/usr/src/app/package.json
      - ../package-lock.json:/usr/src/app/package-lock.json
```  

`version` specifies the `docker-compose` version we're using.
`services` is where we specify the `services` (containers).  
We only have one service here, and we label it as `web`.  

Inside each `services`, we can either specify an `image` to use (`node-15:alpine` for example) or we can specify a `Dockerfile`.  
We are developing our code, so we'll be using the `Dockerfile` approach.  

To do that, we need to specify a `dockerfile`.  
In our project, due to the directory, we need to specify the `context`, relative to the location of the `docker-compose.yml`.
We then points to our `Dockerfile`.  
Over here, we are using `Dockerfiledev` that is a simplified version of `Dockerfile`.

We then need to enable [port forwarding](https://docs.docker.com/compose/networking/).  
We specify `8080:8080` so that traffic to container at port 8080 get passed to port 8080 for the application.  

We then specify [volumes](https://docs.docker.com/storage/volumes/), in which we store persistent data.  
Wouldn't want your database be gone when you turn off your container now.  

Over here though, we'll be using the symbolic linking.  
We do this so that we can enable the hot reload property of webpack.  

This will rebuild the code whenever it detects a code change in source. Otherwise, we'll have to either rebuild the image whenever the code changed, or export the code from the container, less than idea.  

We'll have to enable `webpack` polling by configuring the `vue.config.js` which is `webpack` under the hood.  

```yaml
devServer: {
      watchOptions: {
        poll: true,
      },
    },
```

## Dockerfiledev

Over here, we are just trying to run the code in a containerised environment, so we copy over everything, `npm install` and `npm run serve`.

```docker
# Install dev dependencies stage
FROM node:15-alpine

WORKDIR /usr/src/app

COPY . .

RUN apk add --no-cache git

RUN npm install 

ENV PORT=8080

EXPOSE 8080

CMD ["npm", "run", "serve"]
```
