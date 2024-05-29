#!/usr/bin/env node
import { program } from 'commander';
import parsePath from './bin/parsePath.js';
import parseFileData from './bin/parseFileData.js';
import compare from './utils/compare.js';

program
  .name('gendiff')
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1>')
  .arguments('<filepath2>')
  .action((filePath1, filePath2) => {
    
  });
program.parse(process.argv);
program.opts();
