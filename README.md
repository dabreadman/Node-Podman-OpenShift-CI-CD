# Node-Podman-OpenShift-CI-CD

## Project Specification

A containerised CI/CD pipeline for **OpenShift** applications using **Github Actions** containerised using **Podman**.

Develop a **persistent application** (in a language of your choice) that consists of a front-end component.  
Set up a **CI/CD pipeline** to **BUILD, BAKE and DEPLOY** your application to a container platform using **GitOps methodologies** and approaches (fully automated deployment).  
Include **scanning of code** , **container images** and **production environments** for best practices and security purposes in your automated process.

## Development

This project is of a two part project.

- **Pipeline**
- **Application**  
  For application related documentation, refer to the `README.MD` in [`covid-vue-app`](https://github.com/dabreadman/Node-Podman-OpenShift-CI-CD/tree/main/covid-vue-app)

### Pipeline

There are two different pipelines.

- **Continuous Integration**
- **Continuous Deployment**
  <sub>And **Continuous Delivery** which we do not implement here.  
  A team normally has to choose between **Deployment** or **Delivery**.  
  **Continuous Delivery** is basically **Continuous Deployment** with an extra step of needing **deployment approval**.</sub>

---

## Continuous Integration

An example of **Continuous Integration** pipeline is [this](https://github.com/dabreadman/Node-Podman-OpenShift-CI-CD/blob/3d502434fd4edbf433f45945ca151c0c91cd2994/.github/workflows/node.js.yml).

We will be explaining using [this](https://github.com/dabreadman/Node-Podman-OpenShift-CI-CD/tree/3d502434fd4edbf433f45945ca151c0c91cd2994) branch where we have `test` and `linting` outside of a container.

In **Github Actions**, we define the pipeline in a `YAML`file (**indentation strict**), which is also supported by other pipelining solutions.

We first define the name of this pipeline (or `workflow` in **Github Actions**),

```yaml
name: Node.js CI
```

Then, we define the trigger condition, this would trigger on `push`,

```yaml
on: [push]
```

configure triggers on multiple `events`, (list of events [here](https://docs.github.com/en/actions/reference/events-that-trigger-workflows))

```yaml
on: [push, pull_request]
```

We could also restrict the workflow to trigger on certain `branches`, this triggers on `push` and `pull_request` to the `main` branch.

```yaml
on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main
```

Then we specify the `job` (or `actions`), we first make a `job` called `build`.  
We specify the [runner environment](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idruns-on) (where the code would be running), we have it running on `ubuntu-latest`.

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
```

Due to the structure of our code, we have our application in [`Covid-Application`](https://github.com/dabreadman/Node-Podman-OpenShift-CI-CD/tree/3d502434fd4edbf433f45945ca151c0c91cd2994/Covid-Application), so we need to move to the correct directory.

```yaml
defaults:
  run:
    working-directory: ./Covid-Application
```

<sub>I was led to believe that `cd Covid-Application/` would work.</sub>  
Now that we're in the correct directory, let's start to do something.

We define steps (`actions`) here, which would mimic _someone_ typing this into the terminal of this runner environment.  
We could name our `actions` with `- name: <name>` for clarity, and our `actions` would usually be in the form of

- `- uses: <some actions>`
- `- run: <some command>`
  <sub>Find premade `actions` [here](https://github.com/marketplace/actions)</sub>

This is part checkouts the code of our `repo` to this runner environment.

```yaml
steps:
  - uses: actions/checkout@v2
```

This part here declare the `Node.js` version (`12.x`) and install it into the current runner environment.  
We named this `action` "Use Node.js".

```yaml
- name: Use Node.js
  uses: actions/setup-node@v1
  with:
    node-version: "12.x"
```

This part here declare the `actions` (commands to run), in which we execute these commands respectively.  
`Yarn` is supported out of the box with `Node.js`
Read more [here](https://docs.github.com/en/actions/guides/building-and-testing-nodejs) (also includes boilerplate).

```
yarn # npm install
yarn lint # npm run lint
yarn build # npm run build
yarn test # npm test
```

```yaml
- name: Install dependencies with Yarn
  run: yarn
- name: Lint with eslint
  run: yarn lint
- name: Build with Webpack
  run: yarn build
- name: Run tests
  run: yarn test
```

If there were any errors from these steps, the pipeline will fail and the developers would be notified.

## Resources

[Git](https://git-scm.com/book/en/v2)

[Docker Docs](https://docs.docker.com/)

[Kubernetes Docs](https://www.docker.com/products/kubernetes)

## Possible Solutions

### Containers

- **Podman**

### Container Orchestration

- **OpenShift**

### Monitoring

- **PagerDuty**

- Graphite

- AppDynamics

### Continuous Integration

- **Github Actions**

### Web servers

- **Nginx**

- Apache

- Caddy

### Pipeline Template

- [IBM Kubernetes](https://github.com/actions/starter-workflows/blob/c59b62dee0eae1f9f368b7011cf05c2fc42cf084/ci/ibm.yml)

- [Docker OpenShift](https://github.com/actions/starter-workflows/blob/c59b62dee0eae1f9f368b7011cf05c2fc42cf084/ci/openshift.yml)

## Author

| Author                                           | Current Year |            Course             |
| :----------------------------------------------- | :----------: | :---------------------------: |
| [Cormac Madden](https://github.com/cormacmadden) |   3rd year   | Computer science and business |
| [Dabreadman](https://github.com/dabreadman)      |   3rd year   |       Computer science        |
| [Neil Shevlin](https://github.com/neilshevlin)   |   2nd year   | Computer science and business |
| [Prathamesh Sai](https://github.com/saisankp)    |   2nd year   |       Computer science        |
| [Emer Murphy](https://github.com/emer289)        |   2nd year   |       Computer science        |
| [Tom Roberts](https://github.com/tomroberts201)  |   2nd year   |       Computer science        |
