#!/usr/bin/env node
import { program } from 'commander';

program
    .name('gendiff')
    .version('0.0.1')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format')
    .arguments('<filepath1>')
    .arguments('<filepath2>')
program.parse(process.argv);
const opt = program.opts();