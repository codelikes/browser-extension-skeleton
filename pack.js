'use strict';

const { existsSync, mkdirSync, readFileSync } = require('fs');
const AdmZip = require('adm-zip');
const kebabCase = require('lodash/kebabCase');
const json5 = require('json5');
const { aliases } = require('./src/config/aliases');
const manifest = json5.parse(readFileSync(aliases.build + '/manifest.json').toString());
const filename = `${kebabCase(manifest.name)}-v${manifest.version}.zip`;

const zip = new AdmZip();
zip.addLocalFolder('build');

if (!existsSync(aliases.release)) {
  mkdirSync(aliases.release);
}

zip.writeZip(`${aliases.release}/${filename}`);

console.log(`Success! Created a ${filename} file under ${aliases.release} directory. You can upload this file to web store.`);
