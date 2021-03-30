# Workflows

## cicd.yml

We uses the template provided [here](https://www.openshift.com/blog/deploying-to-openshift-using-github-actions) by the [`Red Hat`](https://github.com/redhat-actions).

We start off by naming our workflows

```yaml
name: CI/CD
```

Then we fill in the [environment variables](https://docs.github.com/en/actions/reference/environment-variables) using [`GitHub Action Secrets`](https://docs.github.com/en/actions/reference/encrypted-secrets).  
We can access the secrets using `${{ secrets.MY_SECRET }}`.  
Secrets are [setup](https://docs.github.com/en/actions/reference/encrypted-secrets#creating-encrypted-secrets-for-a-repository) through `Settings->Secrets->New repository secret`.

```yaml
env:
# Using Quay.io
REGISTRY: quay.io
REGISTRY_USERNAME: dabreadman
REGISTRY_PASSWORD: ${{ secrets.REGISTRY_PASSWORD }}

# OpenShift Token
OPENSHIFT_SERVER: ${{ secrets.OPENSHIFT_SERVER }}
OPENSHIFT_TOKEN: ${{ secrets.OPENSHIFT_TOKEN }}
APP_PORT: 8080
OPENSHIFT_NAMESPACE: ${{ secrets.OPENSHIFT_NAMESPACE }}
APP_NAME: "covid-app"
TAG: ""
```

We then setup our workflow triggers, here we have it on `push` to `main` or `pull_request` and [`workflow_dispatch`](https://docs.github.com/en/actions/reference/events-that-trigger-workflows#workflow_dispatch) incase we want to trigger the workflow manually.

```yaml
on:
    push:
        branches:
            - main
  pull_request:
    workflow_dispatch:
```

Then we start a job, call it `dev-deployment` as we are deploying to `dev` environment.  
We name the job, sets the workflow to run on `ubuntu-latest` more options [here](https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners#supported-runners-and-hardware-resources).

We set the right working directory to `./covid-vue-app`, and declare the environment as `development`.

```yaml
jobs:
    dev-deployment:
        name: Build and deploy to OpenShift Dev
        runs-on: ubuntu-latest
        defaults:
        run:
            working-directory: ./covid-vue-app
            environment: development
```

Then, we start with the steps, most of which are from the template mentioned above.  

1. We first check if all the necessary environment variables/secrets are present.

    ```yaml
    steps:
    - name: Check if secrets exists
      uses: actions/github-script@v3
      with:
      script: |
      const secrets = {
        REGISTRY_PASSWORD: `${{ env.REGISTRY_PASSWORD }}`,
        OPENSHIFT_SERVER: `${{ env.OPENSHIFT_SERVER }}`,
        OPENSHIFT_TOKEN: `${{ env.OPENSHIFT_TOKEN }}`,
      };
      const missingSecrets = Object.entries(secrets).filter(([ name, value ]) => {
      if (value.length === 0) {
            core.warning(`Secret "${name}" is not set`);
            return true;
        }
        core.info(`✔️ Secret "${name}" is set`);
        return false;
      });
      if (missingSecrets.length > 0) {
        core.setFailed(`❌ At least one required secret is not set in the repository. \n` +
        "You can add it using:\n" +
        "GitHub UI: https://docs.github.com/en/actions/reference/encrypted-secrets#creating-encrypted-secrets-for-a-repository \n" +
        "GitHub CLI: https://cli.github.com/manual/gh_secret_set \n" +
        "Also, refer to https://github.com/redhat-actions/oc-login#getting-started-with-the-action-or-see-example");
        }
      else {
        core.info(`✅ All the required secrets are set`);
      }`
    ```

1. We checkout the repository

    ```yaml
        - uses: actions/checkout@v2
    ```

1. Assign APP_NAME and TAG is not present using environment variables.  
    `${GITHUB_SHA::7}` for example takes 7 characters for current workflow's SHA.

    ```yaml
        - name: Determine app name
        if: env.APP_NAME == ''
        run: |
            echo "APP_NAME=$(basename $PWD)" | tee -a $GITHUB_ENV
        - name: Determine tag
        if: env.TAG == ''
        run: |
            echo "TAG=${GITHUB_SHA::7}" | tee -a $GITHUB_ENV
    ```

1. We try to retrieve cached docker layers

    ```yaml
        - name: Docker Layer Caching
          uses: satackey/action-docker-layer-caching@v0.0.11
    ```

1. We build image, run tests (we moved all tests inside docker image), and push to image registry.

    ```yaml
        - name: Build image, run lint/test
          run: podman build . --file Dockerfile --tag ${{ env.REGISTRY }}/${{ env.REGISTRY_USERNAME }}/${{ env.APP_NAME }}:${{ env.TAG }}

        - name: Registry Autherisation
          run: podman login -u ${{ env.REGISTRY_USERNAME }} -p ${{ env.REGISTRY_PASSWORD }} quay.io
        
        - name: Push to registry
          run: podman push ${{ env.REGISTRY }}/${{ env.REGISTRY_USERNAME }}/${{ env.APP_NAME }}:${{ env.TAG }}
    ```

1. We login into OpenShift and deploy the application.  
The actions deletes previous deployment if present and deploy the image.

    ```yaml
        - name: Log in to OpenShift
          uses: redhat-actions/oc-login@v1
          with:
                openshift_server_url: ${{ env.OPENSHIFT_SERVER }}
                openshift_token: ${{ env.OPENSHIFT_TOKEN }}
                insecure_skip_tls_verify: true
                namespace: ${{ env.OPENSHIFT_NAMESPACE }}

        - name: Create and expose app
          id: deploy-and-expose
          uses: redhat-actions/oc-new-app@v1
          with:
                app_name: ${{ env.APP_NAME }}
                image: ${{ env.REGISTRY }}/${{ env.REGISTRY_USERNAME }}/${{ env.APP_NAME }}:${{ env.TAG }}
                namespace: ${{ env.OPENSHIFT_NAMESPACE }}
                port: ${{ env.APP_PORT }}
    ```

Few of the modifications are that we uses this actions that caches docker layers for speedup (don't think it benefits much now with the current version tagging.)

```yaml
- name: Docker Layer Caching
```

and this for building and pushing images to registry.

```yaml
- name: Create Image
- name: Registry Autherisation
- name: Push to registry
```

## rollback.yml

We repurpose the previous template.

Similar to `cicd.yml`, we name our workflow.

```yaml
name: Rollback
```

Over here, we only specify `workflow_dispatch` as the trigger, as this is made to only be manually triggered.  
We define `inputs` parameters, and provide descriptions and set `required` to `true` as we need them.

Examples of inputs are:

- app_name: covid-app
- tag: ac09d00
- namespace: mycluster-dev

To deploy to `mycluster-dev` in OpenShift using [this](https://quay.io/repository/dabreadman/covid-app?tag=ac09d00) image.  
(Note that `Server URL` is still defined using `secrets`)

```yaml
on:
  workflow_dispatch:
    inputs:
      app_name:
        description: "Application name for image"
        required: true
      tag:
        description: "Image version tag"
        required: true
      namespace:
        description: "Deployment namespace"
        required: true
```

Over here, we use using [`GitHub Action Secrets`](https://docs.github.com/en/actions/reference/encrypted-secrets), and the inputs from the `workflow_dispatch`.  
We can access the inputs by `${{ github.event.input.INPUT_NAME }}`.  

We set the environment variables here, which keeps the workflow clean and easier to maintain.

```yaml
env:
  # Using Quay.io
  REGISTRY: quay.io
  REGISTRY_USERNAME: dabreadman

  # OpenShift Token
  OPENSHIFT_SERVER: ${{ secrets.OPENSHIFT_SERVER }}
  OPENSHIFT_TOKEN: ${{ secrets.OPENSHIFT_TOKEN }}
  OPENSHIFT_NAMESPACE: ${{ secrets.OPENSHIFT_PROD }}
  APP_PORT: 8080

  APP_NAME: ${{ github.event.input.app_name }}
  TAG: ${{ github.event.input.tag }}
  IMAGE: $${{ env.REGISTRY }}/${{ env.REGISTRY_USERNAME }}/${{ env.APP_NAME }}:${{ env.TAG }}
```

Then we define the `jobs` (only 1 in this workflow) [`rollback`], and the environment.  

```yaml
jobs:
  rollback:
    name: Rollback OpenShift to specific version
    runs-on: ubuntu-latest
    environment: production
```

We then define the `steps`.  

1. We start by pull the image from a registry by the `app_name` and `tag`.

    ```yaml
        steps:
          - name: Download image
            run: podman pull ${{ env.IMAGE }}
          - name: Log in to OpenShift
            uses: redhat-actions/oc-login@v1
            with:
              openshift_server_url: ${{ env.OPENSHIFT_SERVER }}
              openshift_token: ${{ env.OPENSHIFT_TOKEN }}
              insecure_skip_tls_verify: true
              namespace: ${{ env.OPENSHIFT_NAMESPACE }}
    ```

2. We then deploy the image to the specified `namespace` (dev/qa/staging/prod etc).
  
    ```yaml
          - name: Create and expose app
            id: deploy-and-expose
            uses: redhat-actions/oc-new-app@v1
            with:
              app_name: ${{ env.APP_NAME }}
              image: ${{ env.IMAGE }}
              namespace: ${{ env.OPENSHIFT_NAMESPACE }}
              port: ${{ env.APP_PORT }}
    ```
