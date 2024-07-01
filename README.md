# Connect - Node.js

[![Node.js Version](https://img.shields.io/badge/Node.js-v20.10.0-green.svg)](https://nodejs.org/)
[![npm Version](https://img.shields.io/badge/npm-v10.2.3-blue.svg)](https://www.npmjs.com/)

This is a Node.js application with TypeScript and Webpack.

## Introduction
Welcome to Connect! This is a Node.js project which implement API for mobile app. 
Designed to [briefly describe what your project does or its purpose].

Swagger - Dev: https://connect-development.up.railway.app/swagger/

## Installation

1. Clone this repository.
2. Install dependencies using npm: `npm install`
3. Run `npm run gen-schemas` for generation definitions for swagger

## Usage

1. Run `npm start`
2. Go to the swagger `http://localhost:3001/swagger/`
3. Enjoy


## Environment 

Also for correctly program work, you need to set up env variables

1. Define variables in `.env` file (or pull its `npx dotenv-vault@latest pull`)

`.env` file example:
```text
DB_HOST=<DB_HOST>
DB_PORT=<DB_PORT>
DB_USERNAME=<DB_USERNAME>
DB_PASSWORD=<DB_PASSWORD>
DB_DATABASE_NAME=<DB_DATABASE_NAME>

WEB_CLIENT_ID=<WEB_CLIENT_ID>
IOS_CLIENT_ID=<IOS_CLIENT_ID>

JWT_ACCESS_SECRET=<JWT_ACCESS_SECRET>
JWT_REFRESH_SECRET=<JWT_REFRESH_SECRET>
MYSQL_SSL_CA_CERT=<MYSQL_SSL_CA_CERT>
```

## Development Mode

To run the application in development mode with live reloading, use the following command: `npm run start`

## Deploy 

Deploy to dev environment occurs automatically after merging PR in `master`.

But if you wanna manually start deploy, you need run command: `railway up`.
