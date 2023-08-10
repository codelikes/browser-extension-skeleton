const kebabCase = require('lodash/kebabCase');
const { aliases } = require('../../config/aliases');
const fs = require('fs');
const json5 = require('json5');
const packageJson = require(`${aliases.root}/package.json`);

const getBuildInfo = () => {
  const manifest = json5.parse(fs.readFileSync(aliases.src + '/manifest.json5').toString());
  const getBuildInfo = `${kebabCase(manifest.name)}-v${packageJson.version}.zip`;
  const releasePath = `${aliases.release}/${getBuildInfo}`;

  return {
    version: packageJson.version,
    buildPath: getBuildInfo,
    releasePath,
  };
};

module.exports = { getBuildInfo };
