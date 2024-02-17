'use strict';

const kebabCase = require('lodash/kebabCase');
const fs = require('fs');
const json5 = require('json5');
const { aliases } = require('./aliases');
const packageJson = require(`${aliases.root}/package.json`);

const getBuildInfo = () => {
  const manifest = json5.parse(fs.readFileSync(aliases.src + '/manifest.json5').toString());
  const getBuildInfo = `${kebabCase(manifest.name)}-v${packageJson.version}.zip`;
  const releasePath = `${aliases.release}/${getBuildInfo}`;

  return {
    version: packageJson.version,
    description: packageJson.description,
    buildPath: getBuildInfo,
    releasePath,
  };
};

module.exports = {
  buildInfo: getBuildInfo(),
};
