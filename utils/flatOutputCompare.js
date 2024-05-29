#!usr/bin/env node
import compare from './compare.js';
import parseFileData from '../bin/parseFileData.js';
import parsePath from '../bin/parsePath.js';

export default function flatOutput(
  comparisonObj,
  originalObj1,
  originalObj2,
  currentPath = '',
) {
  console.log(originalObj1);
  console.log(originalObj2);
  console.log(currentPath);
  const keys = Object.keys(comparisonObj);
  let output = '';
  keys.forEach((key) => {
    currentPath = currentPath ? `${currentPath}.${key}` : key;
    if (comparisonObj[key].nested) {
      if (comparisonObj[key].type === 'added') {
        flatOutput(
          comparisonObj[key].value,
          originalObj1,
          originalObj2[key],
          currentPath,
        );
      } else if (comparisonObj[key].type === 'removed') {
        flatOutput(
          comparisonObj[key].value,
          originalObj1[key],
          originalObj2,
          currentPath,
        );
      } else if (comparisonObj[key].type === 'changed') {
        flatOutput(
          comparisonObj[key].value,
          originalObj1[key],
          originalObj2[key],
          currentPath,
        );
      }
    }
    if (typeof comparisonObj.value === 'object' && comparisonObj.value) {
      comparisonObj.value = '[complex value]';
    }
    if (typeof originalObj1.value === 'object' && comparisonObj.value) {
      comparisonObj.value = '[complex value]';
    }
    if (typeof originalObj2.value === 'object' && comparisonObj.value) {
      comparisonObj.value = '[complex value]';
    }
    if (comparisonObj[key].type === 'added') {
      output += `Property '${currentPath}' was added with value: ${comparisonObj[key].value}\n`;
    } else if (comparisonObj[key].type === 'removed') {
      output += `Property '${currentPath}' was removed.\n`;
    } else if (comparisonObj[key].type === 'changed') {
      output += `Property '${currentPath}' was updated. From ${originalObj1[key].value} to ${originalObj2[key].value}\n`;
    }
  });
  return output;
}

console.log(flatOutput(compare(parseFileData(parsePath('./test_files/file2.json')), parseFileData(parsePath('./test_files/file2.json'))), parseFileData(parsePath('./test_files/file1.json')), parseFileData(parsePath('./test_files/file2.json'))));
