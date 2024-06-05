import path from 'node:path';
import {
  describe, expect, test,
} from '@jest/globals';
import gendiff from '../index.js';
import resultStylish from '../fixtures/result.js';
import resultPlain from '../fixtures/resultPlain.js';
import resultJSON from '../fixtures/resultJSON.js';

const testList = [
  'yml',
  'json',
];

const resolvePath = (filePath) => path.resolve(process.cwd(), `fixtures/test_files/${filePath}`);

describe('gendiff', () => {
  test.each(testList)('gendiff %s', (format) => {
    const filepath1 = resolvePath(`file1.${format}`);
    const filepath2 = resolvePath(`file2.${format}`);

    expect(gendiff(filepath1, filepath2)).toEqual(resultStylish);
    expect(gendiff(filepath1, filepath2, 'stylish')).toEqual(resultStylish);
    expect(gendiff(filepath1, filepath2, 'plain')).toEqual(resultPlain);
    expect(gendiff(filepath1, filepath2, 'json')).toEqual(resultJSON);
  });
});
