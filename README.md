# 2021-SWENG-39

## Development
1. Clone this repo with `git clone <url>`.  
2. Cd into `Covid-Application`.  
3. Run `yarn`.  
4. For development uses, run `yarn start:dev`. This will run a [`nodemon`](https://nodemon.io/) server that will reset everything a code change is detected.  
5. To test, run `yarn test`.  
6. To build, run `yarn build`. This is done by [Webpack](https://webpack.js.org/).  
7. To test production code, run `yarn start`.  


## Project specs

A containerised CI/CD pipeline for Kubernetes / OpenShift applications using GitOps
Develop a **persistent application** (in a language of your choice) that consists of a front-end component, a **back-end database** and (optionally) a **messaging system** (Redis, MQ, Kafka, etc). Set up a **CI/CD pipeline** to **BUILD, BAKE and DEPLOY** your application to a container platform using **GitOps methodologies** and approaches (fully automated deployment). Include **scanning of code** , **container images** and **production environments** for best practices and security purposes in your automated process.

## Some helpful resources

[Git](https://git-scm.com/book/en/v2)  
[Docker Docs](https://docs.docker.com/)  
[Kubernetes Docs](https://www.docker.com/products/kubernetes)

## Possible solutions

### Containers

-**Docker**
-Rkt
-LXC

### Container Orchestration

**Kubernetes**

### Monitoring

-**PagerDuty**
-Graphite
-AppDynamics

### Continuous Integration

**-Jenkins**
-Drone

### Web servers

-Apache
-Nginx
-Caddy

### Pipeline Template

-[IBM Kubernetes](https://github.com/actions/starter-workflows/blob/c59b62dee0eae1f9f368b7011cf05c2fc42cf084/ci/ibm.yml)  
-[Docker OpenShift](https://github.com/actions/starter-workflows/blob/c59b62dee0eae1f9f368b7011cf05c2fc42cf084/ci/openshift.yml)

## Author

| Author                                           | Current Year |            Course             |
| :----------------------------------------------- | :----------: | :---------------------------: |
| [Cormac Madden](https://github.com/cormacmadden) |   3rd year   | Computer science and business |
| [Dabreadman](https://github.com/dabreadman)      |   3rd year   |       Computer science        |
| [Neil Shevlin](https://github.com/neilshevlin)   |   2nd year   | Computer science and business |
| [Prathamesh Sai](https://github.com/saisankp)    |   2nd year   |       Computer science        |
| [Emer Murphy](https://github.com/emer289)        |   2nd year   |       Computer science        |
| [Tom Roberts](https://github.com/tomroberts201)  |   2nd year   |       Computer science        |
