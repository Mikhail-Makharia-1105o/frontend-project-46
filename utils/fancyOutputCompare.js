#!usr/bin/env node
function fixOutput(output) {
  return '{\n' + output;
}

/**
* JSON.stringify, modified to shift the } properly.
* @param {any} val - value to stringify
* @param {number} depth - current depth for indentation
* @param {boolean} signshift - signshift occurs when the object has "+ ", "- " or "  " in front of it. It ensured that the closing bracket will be on the same line as the name of the key.
*/
function stringify(val, depth, signshift) {
  let output = '{\n';
  if (typeof val !== 'object' || !val) {
    return val;
  }
  const keys = Object.keys(val);
  keys.forEach((key) => {
    output += '     '.repeat(depth + 1);
    if (typeof val[key] === 'object') {
      output += `${key}:  ${stringify(val[key], depth + 1)}\n`;
    } else {
      output += `${key}:  ${val[key]}\n`;
    }
  });
  output += `${'     '.repeat(depth)}${signshift ? '  }' : '}'}`;
  return output;
}

/**
* Converts comparison object into a JSON.parse string object. Adds + and - to added and removed properties.
* @param {Object} comparisonObj - comparison object(comes from compare())
* @param {Object} originalObj1 - original object 1
* @param {Object} originalObj2 - original object 2
* @param {number} depth - current depth(for recursion)
*/

function out(
  comparisonObj,
  originalObj1,
  originalObj2,
  depth = 0,
) {
  const currentDepth = '     '.repeat(depth);
  let output = '';
  const keys = Object.keys(comparisonObj).sort((a, b) => a > b ? 1 : -1);
  keys.forEach((key) => {
    if (comparisonObj[key].type === 'added') {
      if (comparisonObj[key].nested) {
        output += `${currentDepth}+ ${key}: {\n${out(
          comparisonObj[key].value,
          originalObj1,
          originalObj2[key],
          depth + 1,
        )}\n`;
      } else {
        output += `${currentDepth}+ ${key}: ${stringify(comparisonObj[key].value, depth, true)}\n`;
      }
    }
    if (comparisonObj[key].type === 'removed') {
      if (comparisonObj[key].nested) {
        output += `${currentDepth}- ${key}: {\n${out(
          comparisonObj[key].value,
          originalObj1,
          originalObj2[key],
          depth + 1,
        )}\n`;
      } else {
        output += `${currentDepth}- ${key}: ${stringify(comparisonObj[key].value, depth, true)}\n`;
      }
    }
    if (comparisonObj[key].type === 'shared') {
      if (comparisonObj[key].nested) {
        output += ` ${currentDepth}  ${key}: {\n${out(
          comparisonObj[key].value,
          originalObj1[key],
          originalObj2[key],
          depth + 1,
        )}\n`;
      } else {
        output += `${currentDepth}  ${key}: ${stringify(comparisonObj[key].value, depth, false)}\n`;
      }
    }
    if (comparisonObj[key].type === 'changed') {
      if (comparisonObj[key].nested) {
        output += `${currentDepth}  ${key}: {\n${out(
          comparisonObj[key].value,
          originalObj1[key],
          originalObj2[key],
          depth + 1,
        )}\n`;
      } else {
        output += `${currentDepth}- ${key}: ${stringify(originalObj1[key], depth, true)}\n`;
        output += `${currentDepth}+ ${key}: ${stringify(originalObj2[key], depth, true)}\n`;
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