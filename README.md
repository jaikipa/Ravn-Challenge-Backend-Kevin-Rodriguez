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

## Before Install

Make sure you have NodeJS, npm, Docker and docker-compose installed.

Before install our project, env variables must be set.

<center>

| Environment Variable Key | Environment Variable Value |
| ------------------------ | -------------------------- |
| PORT                     | 3000                       |
| NODE_ENV                 | [dev, staging, production] |

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

Swagger documentation can be found at API Documentation.

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).
