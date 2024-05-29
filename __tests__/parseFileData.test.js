import { test, expect } from '@jest/globals';
import parseFileData from '../bin/parseFileData.js';
import parsePath from '../bin/parsePath.js';

test('parse JSON', () => {
  expect(parseFileData(parsePath('./test_files/file2.json'))).toEqual({
    common: {
      follow: false,
      setting1: 'Value 1',
      setting3: null,
      setting4: 'blah blah',
      setting5: {
        key5: 'value5',
      },
      setting6: {
        key: 'value',
        ops: 'vops',
        doge: {
          wow: 'so much',
        },
      },
    },
    group1: {
      foo: 'bar',
      baz: 'bars',
      nest: 'str',
    },
    group3: {
      deep: {
        id: {
          number: 45,
        },
      },
      fee: 100500,
    },
  });
});

test('parse YAML', () => {
  expect(parseFileData(parsePath('./test_files/file3.yml'))).toEqual({
    name: 'John Wick',
    age: 33,
  });
});
