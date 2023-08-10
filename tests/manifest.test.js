import { matchersWithOptions } from 'jest-json-schema';
import * as schema from '../src/config/$schema.json';
import { readFileSync } from 'fs';
import json5 from 'json5';

const manifest = json5.parse(readFileSync('./src/manifest.json5', 'utf8'));

expect.extend(
  matchersWithOptions({
    verbose: false,
    validateFormats: false,
  }),
);

describe('manifest.json', () => {
  it('validate manifest schema file', () => {
    expect(schema).toBeValidSchema();
  });

  it('validate manifest.json5 with schema', () => {
    expect(manifest).toMatchSchema(schema);
  });
});
