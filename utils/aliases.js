'use strict';

const path = require('path');

const aliases = {
  root: path.resolve(__dirname, '..'),
  src: path.resolve(__dirname, '../src'),
  app: path.resolve(__dirname, '../src/app'),
  global: path.resolve(__dirname, '../src/app/global'),
  features: path.resolve(__dirname, '../src/app/features'),
  build: path.resolve(__dirname, '../build'),
  tests: path.resolve(__dirname, '../tests'),
  release: path.resolve(__dirname, '../release'),
};

module.exports = {
  aliases,
};
