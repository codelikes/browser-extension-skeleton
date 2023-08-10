'use strict';

const { merge } = require('webpack-merge');
const json5 = require('json5');
const CopyWebpackPlugin = require('copy-webpack-plugin'); // Importing the plugin
const common = require('./webpack.common.js');
const PATHS = require('./paths');

const config = (env, argv) =>
  merge(common, {
    entry: {
      popup: PATHS.src + '/app/features/popup/popup.js',
      content: PATHS.src + '/app/global/content.js',
      background: PATHS.src + '/app/global/background.js',
    },
    devtool: argv.mode === 'production' ? false : 'source-map',
    plugins: [
      // Copy manifest.json5 to manifest.json
      new CopyWebpackPlugin({
        patterns: [
          {
            from: PATHS.src + '/manifest.json5',
            to: 'manifest.json',
            transform(content) {
              const manifest = json5.parse(content.toString());
              delete manifest.$schema;

              return JSON.stringify(manifest);
            },
          },
        ],
      }),
    ],
  });

module.exports = config;
