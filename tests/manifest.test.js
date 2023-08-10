const fs = require('fs');
const json5 = require('json5');
const PATHS = require('./../src/config/paths');
const schema = require(PATHS.configs + '/$schema.json');
const manifest = json5.parse(fs.readFileSync(PATHS.src + '/manifest.json5').toString());
import { matchersWithOptions } from 'jest-json-schema';


expect.extend(matchersWithOptions({
  verbose: false,
  validateFormats: false,
}));

describe('manifest.json', () => {
  it('validate manifest schema file', () => {
    expect(schema).toBeValidSchema();
  });

  it('validate manifest.json5 with schema', () => {
    expect(manifest).toMatchSchema(schema);
  });
});
