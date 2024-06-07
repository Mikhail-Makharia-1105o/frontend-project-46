#!usr/bin/env node

/**
* Converts comparison object into a JSON.parse string object. Adds + and - to added and removed properties.
* @param {Object} comparisonObj - comparison object
* @param {Object} originalObj1 - original object 1
* @param {Object} originalObj2 - original object 2
* @param {number} depth - current depth(for recursion)
*/

function fixOutput(output) {
  return '{\n' + output;
}
function stringify(val, depth) {
  let output = '{\n';
  if (typeof val !== 'object' || !val) {
    return val;
  }
  const keys = Object.keys(val);
  keys.forEach((key) => {
    output += '    '.repeat(depth + 1);
    if (typeof val[key] === 'object') {
      output += `${key}: ${stringify(val[key], depth + 1)}\n`;
    } else {
      output += `${key}: ${val[key]}\n`;
    }
  });
  output += `${'    '.repeat(depth)}}`;
  return output;
}

function out(
  comparisonObj,
  originalObj1,
  originalObj2,
  depth = 0,
) {
  const currentDepth = '    '.repeat(depth);
  let output = '';
  const keys = Object.keys(comparisonObj).sort((a, b) => a > b ? 1 : -1);
  keys.forEach((key) => {
    if (comparisonObj[key].type === 'added') {
      if (comparisonObj[key].nested) {
        output += `  ${currentDepth}+ ${key}: {\n${out(
          comparisonObj[key].value,
          originalObj1,
          originalObj2[key],
          depth + 1,
        )}\n`;
      } else {
        output += `  ${currentDepth}+ ${key}: ${stringify(comparisonObj[key].value, depth)}\n`;
      }
    }
    if (comparisonObj[key].type === 'removed') {
      if (comparisonObj[key].nested) {
        output += `  ${currentDepth}- ${key}: {\n${out(
          comparisonObj[key].value,
          originalObj1,
          originalObj2[key],
          depth + 1,
        )}\n`;
      } else {
        output += `  ${currentDepth}- ${key}: ${stringify(comparisonObj[key].value, depth)}\n`;
      }
    }
    if (comparisonObj[key].type === 'shared') {
      if (comparisonObj[key].nested) {
        output += `  ${currentDepth}  ${key}: {\n${out(
          comparisonObj[key].value,
          originalObj1[key],
          originalObj2[key],
          depth + 1,
        )}\n`;
      } else {
        output += `  ${currentDepth}  ${key}: ${stringify(comparisonObj[key].value, depth)}\n`;
      }
    }
    if (comparisonObj[key].type === 'changed') {
      if (comparisonObj[key].nested) {
        output += `  ${currentDepth}  ${key}: {\n${out(
          comparisonObj[key].value,
          originalObj1[key],
          originalObj2[key],
          depth + 1,
        )}\n`;
      } else {
        output += `  ${currentDepth}- ${key}: ${stringify(originalObj1[key], depth)}\n`;
        output += `  ${currentDepth}+ ${key}: ${stringify(originalObj2[key], depth)}\n`;
      }
    }
  })
  output += `${currentDepth}}`;
  return output;
}

export default function fancyOutput(
  comparisonObj,
  originalObj1,
  originalObj2,
) {
  const output = out(
    comparisonObj,
    originalObj1,
    originalObj2,
  );
  return fixOutput(output);
}