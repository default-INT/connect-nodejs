/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');
const processEnv = require('process');
const fs = require("node:fs");
require('dotenv').config({ path: path.resolve(__dirname, `.env`) });

const { NODE_ENV = 'production' } = processEnv.env;

const isEnvDevelopment = ['development', 'development-feature'].includes(processEnv.env.NODE_ENV)

const mapEnvVars = (env) => {
  return Object.entries(env).reduce((acc, [key, val]) => {
    return {...acc, [key]: JSON.stringify(val)};
  }, {})
}

module.exports = (env) => {
  const { runLocally } = env;

  const isCrtxExist = fs.existsSync(path.resolve(__dirname, `mysql-ca.pem`))

  const MYSQL_SSL_CA_CERT = isCrtxExist ? fs.readFileSync(`${__dirname}/mysql-ca.pem`).toString() : processEnv.env.MYSQL_SSL_CA_CERT;

  return {
    entry: './index.ts',
    mode: NODE_ENV,
    devtool: isEnvDevelopment ? 'inline-cheap-module-source-map' : false,
    watch: runLocally,
    target: 'node',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'index.js',
    },
    externals: [ nodeExternals() ],
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: [
            'ts-loader',
          ]
        },
      ]
    },
    plugins: [
      new WebpackShellPluginNext({
        onBuildStart: {
          scripts: ['npm run clean:dev && npm run clean:prod'],
          blocking: true,
          parallel: false,
        },
        onBuildEnd: runLocally && {
          scripts: ['npm run dev'],
          blocking: false,
          parallel: true,
        }
      }),
      new webpack.DefinePlugin({
        'process.env': {
          'MYSQL_SSL_CA_CERT': JSON.stringify(MYSQL_SSL_CA_CERT),
          ...mapEnvVars(processEnv.env),
          ...mapEnvVars(process.env),
          ...mapEnvVars(env),
        },
      }),
    ],
    resolve: {
      modules: ['node_modules'],
      extensions: ['.ts', '.js'],
      alias: {
        'storage': path.resolve(__dirname, './src/storage/'),
        'services': path.resolve(__dirname, './src/services/'),
        'shared': path.resolve(__dirname, './src/shared/'),
        'config': path.resolve(__dirname, './config/'),
      },
    }
  }
};
