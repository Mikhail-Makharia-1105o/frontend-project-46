#!/usr/bin/env node
import { program } from 'commander';
import parsePath from './bin/parsePath.js';
import parseFileData from './bin/parseFileData.js';
import findDifference from './bin/findDifference.js';

program
  .name('gendiff')
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1>')
  .arguments('<filepath2>')
  .action((filePath1, filePath2) => {
    const obj1 = parseFileData(parsePath(filePath1));
    const obj2 = parseFileData(parsePath(filePath2));
    const [shared, excl1, excl2] = findDifference(obj1, obj2);
    let output = Object.keys(obj1).reduce((str, key) => {
      if (Object.keys(excl1).includes(key)) {
        str = `${str}\n - ${key}: ${obj1[key]}`;
      } else {
        str = `${str}\n   ${key}: ${obj1[key]}`;
      }
      return str;
    }, '{');
    Object.keys(excl2).forEach((key) => {
      output = `${output}\n + ${key}: ${obj2[key]}`
    })
    output = `${output}\n}`
    console.log(output);
  });
program.parse(process.argv);
const opt = program.opts();
