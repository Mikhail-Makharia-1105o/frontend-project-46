import compare from './compare.js';
import fancyOutput from './fancyOutputCompare.js';
import flatOutput from './flatOutputCompare.js';
import JSONOutput from './JSONOutputCompare.js';
import parsePath from './parsePath.js';
import parseFileData from './parseFileData.js';

export default function genDiff(filePath1, filePath2, options = {format: 'stylish'}) {
  typeof options === 'string' ? options = {format: options} : options = options;
  const path1 = parsePath(filePath1);
  const path2 = parsePath(filePath2);
  const fileData1 = parseFileData(path1);
  const fileData2 = parseFileData(path2);
  const comparisonObj = compare(fileData1, fileData2);
  switch (options.format) {
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
