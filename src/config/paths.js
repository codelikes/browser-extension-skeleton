'use strict';

const path = require('path');

const PATHS = {
  src: path.resolve(__dirname, '../'),
  app: path.resolve(__dirname, '../app'),
  configs: path.resolve(__dirname, './'),
  build: path.resolve(__dirname, '../../build'),
  tests: path.resolve(__dirname, '../../tests'),
};

module.exports = PATHS;
