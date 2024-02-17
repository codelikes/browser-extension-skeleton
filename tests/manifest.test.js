import { matchersWithOptions } from 'jest-json-schema';
import * as schema from './$schema.json';
import { readFileSync } from 'fs';
import json5 from 'json5';

const rawManifestJson5 = readFileSync('./src/manifest.json5');
const parsedManifest = json5.parse(rawManifestJson5.toString());

expect.extend(
  matchersWithOptions({
    verbose: false,
    validateFormats: false,
  }),
);

describe('Manifest json file', () => {
  it('Described scheme is valid', () => {
    expect(schema).toBeValidSchema();
  });

  it('Manifest file is valid', () => {
    expect(parsedManifest).toMatchSchema(schema);
  });
});
