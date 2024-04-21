/* eslint-disable */
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');
const CopyWebpackPlugin = require('copy-webpack-plugin');
require('dotenv').config({ path: path.resolve(__dirname, `.env`) });

const { NODE_ENV = 'production' } = process.env;

const isEnvDevelopment = ['development', 'development-feature'].includes(process.env.NODE_ENV)

module.exports = {
  entry: './index.ts',
  mode: NODE_ENV,
  devtool: isEnvDevelopment ? 'inline-cheap-module-source-map' : false,
  watch: isEnvDevelopment,
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
      }
    ]
  },
  plugins: [
    new WebpackShellPluginNext({
      onBuildStart: {
        scripts: ['npm run clean:dev && npm run clean:prod'],
        blocking: true,
        parallel: false,
      },
      onBuildEnd: {
        scripts: ['npm run dev'],
        blocking: false,
        parallel: true,
      },
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'crtx/mysql-ca.pem'), to: './crtx/mysql-ca.pem' },
      ]
    })
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
  },
};
