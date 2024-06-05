import compare from './compare.js';
import fancyOutput from './fancyOutputCompare.js';
import flatOutput from './flatOutputCompare.js';
import JSONOutput from './JSONOutputCompare.js';
import parsePath from './parsePath.js';
import parseFileData from './parseFileData.js';

export default function gendiff(filePath1, filePath2, options) {
  const path1 = parsePath(filePath1);
  const path2 = parsePath(filePath2);
  const fileData1 = parseFileData(path1);
  const fileData2 = parseFileData(path2);
  const comparisonObj = compare(fileData1, fileData2);
  switch (options.format) {
  case 'plain':
    console.log(flatOutput(comparisonObj, fileData1, fileData2));
    break;
  case 'json':
    console.log(JSONOutput(comparisonObj, fileData1, fileData2));
    break;
  case 'stylish':
    console.log(fancyOutput(comparisonObj, fileData1, fileData2));
    break;
  default:
    console.log(fancyOutput(comparisonObj, fileData1, fileData2));
  }
  return 1;
}
