#!/usr/bin/env node
import compare from './utils/compare.js';
import fancyOutput from './utils/fancyOutputCompare.js';
import flatOutput from './utils/flatOutputCompare.js';
import JSONOutput from './utils/JSONOutputCompare.js';
import parsePath from './utils/parsePath.js';
import parseFileData from './utils/parseFileData.js';

export default function gendiff(filePath1, filePath2, options = { format: 'stylish' }) {
  const opts = typeof options === 'string' ? { format: options } : options;
  const path1 = parsePath(filePath1);
  const path2 = parsePath(filePath2);
  const fileData1 = parseFileData(path1);
  const fileData2 = parseFileData(path2);
  const comparisonObj = compare(fileData1, fileData2);
  switch (opts.format) {
    case 'plain':
      console.log(flatOutput(comparisonObj, fileData1, fileData2));
      return flatOutput(comparisonObj, fileData1, fileData2);
    case 'json':
      console.log(JSONOutput(fileData1, fileData2));
      return JSONOutput(fileData1, fileData2);
    case 'stylish':
      console.log(fancyOutput(comparisonObj, fileData1, fileData2));
      return fancyOutput(comparisonObj, fileData1, fileData2);
    default:
      console.log(fancyOutput(comparisonObj, fileData1, fileData2));
      return fancyOutput(comparisonObj, fileData1, fileData2);
  }
}
