#!/usr/bin/env node
import { program } from 'commander';
import gendiff from '../index.js';

program
  .name('gendiff')
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1>')
  .arguments('<filepath2>')
  .action((filePath1, filePath2, options) => {
    gendiff(filePath1, filePath2, options);
  });
/*eslint-disable-next-line no-undef*/
program.parse(process.argv)
