#!/usr/bin/env node
import { program } from 'commander';

program.command('gendiff')
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .option('-V, --version', 'output the version number')
    .option('-h, --help', 'output usage information')
program.parse();