'use strict';

const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const aliases = require('./aliases').aliases;
const IMAGE_TYPES = /\.(png|jpe?g|gif|svg)$/i;

const common = {
  output: {
    path: aliases.build,
    filename: '[name].js',
  },
  stats: {
    all: false,
    errors: true,
    builtAt: true,
    assets: true,
    excludeAssets: [IMAGE_TYPES],
  },
  module: {
    rules: [
      // JSON5 loader
      {
        test: /\.json5$/i,
        loader: 'json5-loader',
        type: 'javascript/auto',
      },
      // HTML loader
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          minimize: false,
        },
      },
      // Babel loader
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        },
      },
      // CSS loader
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [autoprefixer],
              },
            },
          },
        ],
      },
      // SVG loader
      {
        test: /\.svg$/i,
        use: ['to-string-loader', 'html-loader'],
      },
      // Image loader
      {
        test: IMAGE_TYPES,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images',
              name: '[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: '**/*',
          context: 'src/assets',
        },
      ],
    }),
    new MiniCssExtractPlugin(),
  ],
};

module.exports = common;
