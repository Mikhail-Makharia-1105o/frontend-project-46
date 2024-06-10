#!/usr/bin/env node
import { readFileSync } from 'fs';
import { load } from 'js-yaml';

export default function parseFileData(filePath) {
  const file = readFileSync(filePath, 'utf8');
  const extension = filePath
    .split('\\')
    [filePath.split('\\').length - 1].split('.')[1];
  switch (extension) {
    case 'json':
      return JSON.parse(file);
    case 'yml':
      return load(file);
    case 'yaml':
      return load(file);
    default:
      return file;
  }
}
