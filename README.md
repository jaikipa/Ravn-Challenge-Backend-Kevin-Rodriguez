<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

# Ravn Challenge Backend

## Description

Simple API endpoint that optionally accepts an author’s name and returns a JSON.

## Table of Contents

- [Before Install](#before-install)
- [Installation](#installation)
- [Running the app](#running-the-app)
- [Test](#test)
- [Challenge Resolution](#challenge-resolution)

## Before Install

Make sure you have NodeJS, npm, Docker and docker-compose installed.

Before install our project, env variables must be set.

<center>

| Environment Variable Key  | Environment Variable Value         |
| ------------------------- | ---------------------------------- |
| PORT                      | 3000                               |
| API_PREFIX                | api/v1                             |
| ORM_CONNECTION            | postgres                           |
| ORM_HOST                  | localhost                          |
| ORM_USERNAME              | [Your DB Username]                 |
| ORM_PASSWORD              | [Your DB Password]                 |
| ORM_PORT                  | 5432                               |
| ORM_DATABASE              | postgres                           |
| ORM_TEST_DATABASE         | test                               |
| ORM_SCHEMA                | public                             |
| ORM_MIGRATIONS_TABLE_NAME | migrations                         |
| ORM_MIGRATIONS            | dist/migrations/\*.js              |
| ORM_MIGRATIONS_DIR        | migrations                         |
| ORM_MIGRATIONS_RUN        | true                               |
| ORM_SEEDS                 | src/seeds/\*_/_{.ts,.js}           |
| ORM_FACTORIES             | src/seeds/factories/\*_/_{.ts,.js} |
| REDIS_HOST                | redis                              |
| REDIS_PORT                | 6379                               |
| REDIS_TTL                 | 1800                               |

</center>

Both setups, docker and local, will be shown here.

## Installation

#### Local

```bash
$ npm i
```

#### Docker

```bash
$ docker-compose build
```

## Running the app

Make sure the env variables are correct.

#### Local

```bash
# production
$ npm run start

# development
$ npm run start:dev
```

#### Docker

```bash
$ docker-compose up
```

## Test

#### Local

Running tests

```bash
# run all tests only once
$ npm run test

# run tests with a watcher
$ npm run test:watch
```

### Docker

There are two options to run the tests with Docker. They can be called from the outside of the container, or they can be called from the inside the bash console of container.

_Outside of the container_

```bash
# run all tests only once
$ docker-compose run api npm run test

# run tests with a watcher
$ docker-compose run api npm run test:watch
```

_Inside of the container_

First, enter to bash console

```bash
$ docker-compose run api bash
```

Inside of the container run the same commands as they are being ran in local.

```bash
# run all tests only once
$ npm run test

# run tests with a watcher
$ npm run test:watch
```

## Team

<table>
   <tr>
      <td align="center">
         <a href="https://github.com/KevinARE29">
         <img src="https://avatars1.githubusercontent.com/u/22019795?v=4" width="250" />
         <br />
         <sub>Kevin Rodríguez</sub>
         </a>
      </td>
   </tr>
</table>

## API Documentation

Swagger documentation can be found at /api/v1/docs.

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Challenge Resolution

### Part 1: SQL

1. Who are the first 10 authors ordered by date_of_birth?

```
SELECT * FROM authors ORDER BY date_of_birth LIMIT 10;
```

This SQL order the records by date_of_birth ascending by default. If you want to explicitly specify the direction or you want to revert it use ASC or DESC according to the case.

2. What is the sales total for the author named “Lorelai Gilmore”?

```
SELECT SUM(si.item_price * si.quantity) AS sales_total FROM sale_items si
LEFT JOIN books b ON si.book_id = b.id
LEFT JOIN authors a ON b.author_id = a.id
WHERE a.name ILIKE 'lorelai gilmore';
```

Consider that the query uses a case insensitive match, instead of an exact match that can cause a lot of problems in a production environment. A more robust solution can add fuzzy search logic using the pg_tgrm extension that let's compare words by similarity. For example, if you search "Mike Smith" you can receive records matching names like "Mike Smith" or "Michael Smith".

3. What are the top 10 performing authors, ranked by sales revenue?

```
SELECT a.id, a.name, a.date_of_birth, SUM(si.item_price * si.quantity) AS total_sales FROM sale_items si
LEFT JOIN books b ON si.book_id = b.id
LEFT JOIN authors a ON b.author_id = a.id
GROUP BY a.id
ORDER BY total_sales DESC
LIMIT 10;
```

### Part 2: Basic API Endpoint

The endpoint can be found in `/api/v1/authors`. The API was developed in NodeJS using NestJS.

### Part 3: API Performance

A cache layer was added to the API using Redis. The default TTL configured is 1800 s (30 min) but it can be updated setting another value to the REDIS_TTL environment variable.

### Part 4: Build Docker Container and steps to deploy.

Provide a written step-by-step guide on how you would build the docker image and deploy this to GCP Kubernetes Engine.

#### Building the Docker Image:

Create a Dockerfile with the following code:

```
FROM node:12.14
# Set a directory for the app
WORKDIR /usr/src/app
# Copy package.json and package-lock.json to the container
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy all source files to the container
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start"]
```

Once you have the Dockerfile created, you can build a container image of the API with the following command:

```
docker build -t ravn-challenge .
```

- `t ravn-challenge` defines the tag of the container.
- `.` is the location of the Dockerfile.

In order to upload the container image to DockerHub, you first have to create a Docker Id, in case you don't have one. Once you have your Docker Id, you can log in to your terminal using the following command:

```
docker login
```

Images uploaded to Docker Hub must have this format: `username/image:tag`. So let's rename our image using the following command:

```
docker tag ravn-challenge <username>/ravn-challenge:1.0.0
```

Now we can upload the image to DockerHub:

```
docker push <username>/ravn-challenge:1.0.0
```

You can found the public image of this challenge in this URL: https://hub.docker.com/r/kevinare295/ravn-challenge

#### Deploying to GCP Kubernetes Engine:

First, you have to specify the corresponding Kubernetes YAML files that the application needs to run: API, Postgres, and Redis. Also, you can create a secrets.yml to save the variables that contain sensitive information, like the credentials of the DB.

Add those YAML files to the `kube` folder in the `root` directory. And then you need to specify the necessary resources for each YAML file:

- API:

  1.  Deployment
  2.  Service

- PostgreSQL:

  1.  Deployment
  2.  Service
  3.  PersistentVolume
  4.  PersistentVolumeClaim

- Redis:

  1.  Deployment
  2.  Service

- Secrets:
  1.  Secret

Those Kubernetes files are already created in the repository, so the next step is to log in to your GCP Account and select the `Kubernetes Engine` option.

Create a new standard Kubernetes cluster and specify a name. Then select the `Connect` option, in order to execute commands inside the cloud shell.

Next, you have to clone this repository inside your cluster. Then, you have to create the kube/secrets.yml inside your cloud shell, and specify values for the following variables: `POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD`. Remember that the values of those variables must be encoded in base64. You can use the following command to encode env var values:

```
echo -n 'your-value' | base64
```

When you have custom values, you need to add them in the secrets.yml, for example:

```
apiVersion: v1
kind: Secret
metadata:
  name: postgres-secrets
type: Opaque
data:
  POSTGRES_DB: cmF2bi1kYg==
  POSTGRES_USER: cmF2bi11c2Vy
  POSTGRES_PASSWORD: YWRtaW4xMjM=
```

In order to start the pods, you have to run this command in the root directory:

```
kubectl apply -f kube
```

That's it, you have your API, PostgreSQL DB, and Redis Server running in GCP. If you want to see the External IP of the API, you can run this command:

```
kubectl get service ravn-challenge
```

And that's the public IP where the API is exposed.

If you are interested in see the logs of the API you can run the following command:

```
kubectl logs <api-pod-name>
```

Or if you want to enter the shell of the pod that is running the API in order to run the seeds you can use the following commands:

```
kubectl exec --stdin --tty <api-pod-name> -- /bin/bash

npm run seed:run
```
