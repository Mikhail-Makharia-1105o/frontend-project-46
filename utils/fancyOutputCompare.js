#!usr/bin/env node

/**
* Converts comparison object into a JSON.parse string object. Adds + and - to added and removed properties.
* @param {Object} comparisonObj - comparison object
* @param {Object} originalObj1 - original object 1
* @param {Object} originalObj2 - original object 2
* @param {number} depth - current depth(for recursion)
*/
function stringify(val, depth) {
  let output = '{\n';
  if (typeof val !== 'object' || !val) {
    return val;
  }
  const keys = Object.keys(val);
  keys.forEach((key) => {
    output += '  '.repeat(depth + 1);
    if (typeof val[key] === 'object') {
      output += `${key}: ${stringify(val[key], depth + 1)}\n`;
    } else {
      output += `${key}: ${val[key]}\n`;
    }
  });
  output += `${'  '.repeat(depth)}}`;
  return output;
}

export default function fancyOutput(
  comparisonObj,
  originalObj1,
  originalObj2,
  depth = 0,
) {
  const currentDepth = '  '.repeat(depth);
  let output = '';
  const keys = Object.keys(comparisonObj);
  keys.forEach((key) => {
    if (comparisonObj[key].nested) {
      if (comparisonObj[key].type === 'added') {
        output += `+${currentDepth} ${key}: {\n${fancyOutput(
          comparisonObj[key].value,
          originalObj1,
          originalObj2[key],
          depth + 1,
        )}\n`;
      } else if (comparisonObj[key].type === 'removed') {
        output += `-${currentDepth} ${key}: {\n${fancyOutput(
          comparisonObj[key].value,
          originalObj1[key],
          originalObj2,
          depth + 1,
        )}\n`;
      } else if (comparisonObj[key].type === 'changed') {
        output += ` ${currentDepth} ${key}: {\n${fancyOutput(
          comparisonObj[key].value,
          originalObj1[key],
          originalObj2[key],
          depth + 1,
        )}\n`;
      } else if (comparisonObj[key].type === 'shared') {
        output += ` ${currentDepth} ${key}: {\n${fancyOutput(
          comparisonObj[key].value,
          originalObj1[key],
          originalObj2[key],
          depth + 1,
        )}\n`;
      }
    } else if (comparisonObj[key].type === 'added') {
      output += `+${currentDepth} ${key}: ${stringify(
        comparisonObj[key].value,
        depth + 1,
      )}\n`;
    } else if (comparisonObj[key].type === 'removed') {
      output += `-${currentDepth} ${key}: ${stringify(
        comparisonObj[key].value,
        depth + 1,
      )}\n`;
    } else if (comparisonObj[key].type === 'shared') {
      output += ` ${currentDepth} ${key}: ${stringify(
        comparisonObj[key].value,
        depth + 1,
      )}\n`;
    } else if (comparisonObj[key].type === 'changed') {
      output += `-${currentDepth} ${key}: ${stringify(
        originalObj1[key],
        depth + 1,
      )}\n`;
      output += `+${currentDepth} ${key}: ${stringify(
        originalObj2[key],
        depth + 1,
      )}\n`;
    }
  });
  output += `${currentDepth}}`;
  return output;
}
