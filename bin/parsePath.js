#!/usr/bin/env node
import path from 'path';
import process from 'process';

export default function parsePath(filePath) {
  return path.resolve(process.cwd(), filePath);
}
