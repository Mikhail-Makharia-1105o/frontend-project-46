#!/usr/bin/env node
import { program } from 'commander';
import gendiff from './utils/gendiff.js';

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
program.parse();
program.opts();
