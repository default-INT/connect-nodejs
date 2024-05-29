# Connect - Node.js

[![Node.js Version](https://img.shields.io/badge/Node.js-v20.10.0-green.svg)](https://nodejs.org/)
[![npm Version](https://img.shields.io/badge/npm-v10.2.3-blue.svg)](https://www.npmjs.com/)

This is a Node.js application with TypeScript and Webpack.

## Introduction
Welcome to Connect! This is a React Native project designed to [briefly describe what your project does or its purpose].

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

1. Certificate for database `./crtx/mysql-ca.pem`
2. Define variables in `.env` file

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
```

### Development Mode
To run the application in development mode with live reloading, use the following command: `npm run serve`
