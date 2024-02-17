const { merge } = require('webpack-merge');
const copyPlugin = require('copy-webpack-plugin');
const json5 = require('json5');
const { aliases } = require('./aliases.js');
const commonConfig = require('./webpack.common.js');
const buildInfo = require('./utils').buildInfo;

const webpackConfig = (env, argv) => {
  return merge(commonConfig, {
    entry: {
      popup: aliases.features + '/popup/popup.js',
      content: aliases.features + '/content/content.js',
      background: aliases.features + '/background/background.js',
    },
    devtool: argv.mode === 'production' ? false : 'source-map',
    plugins: [
      new copyPlugin({
        patterns: [
          {
            from: aliases.src + '/manifest.json5',
            to: 'manifest.json',
            transform(content) {
              const manifest = Object.assign(json5.parse(content.toString()), {
                version: buildInfo.version,
                description: buildInfo.description,
              });

              delete manifest.$schema;

              return JSON.stringify(manifest);
            },
          },
        ],
      }),
    ],
  });
};

module.exports = webpackConfig;
