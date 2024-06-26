#!usr/bin/env node
/* eslint-disable fp/no-mutation */
/* eslint-disable fp/no-mutating-methods */
/* eslint-disable fp/no-let */
/**
 * JSON.stringify, modified to shift the } properly.
 * @param {any} val - value to stringify
 * @param {number} depth - current depth for indentation
 * @param {boolean} signshift - signshift occurs when the object has "+ ",
 * "- " or "  " in front of it. It ensured that the closing bracket
 * will be on the same line as the name of the key.
 */
function stringify(val, depth, signshift) {
  let output = '{\n';
  if (typeof val !== 'object' || !val) {
    return val;
  }
  const keys = Object.keys(val);
  keys.forEach((key) => {
    output = `${output}${'  '.repeat(depth + 2)}`;
    if (typeof val[key] === 'object') {
      output = `${output}  ${key}: ${stringify(val[key], depth + 2)}\n`;
    } else {
      output = `${output}  ${key}: ${val[key]}\n`;
    }
  });
  output += `${'  '.repeat(depth)}${signshift ? '  }' : '  }'}`;
  return output;
}

/**
 * Converts comparison object into a JSON.parse string object.
 * Adds + and - to added and removed properties.
 * @param {Object} comparisonObj - comparison object(comes from compare())
 * @param {Object} originalObj1 - original object 1
 * @param {Object} originalObj2 - original object 2
 * @param {number} depth - current depth(for recursion)
 */
function out(comparisonObj, originalObj1, originalObj2, depth = 1) {
  let sign = '  ';
  const currentDepth = '  '.repeat(depth);
  let output = '';
  const keys = Object.keys(comparisonObj).sort((a, b) => (a > b ? 1 : -1));
  keys.forEach((key) => {
    switch (comparisonObj[key].type) {
      case 'added':
        sign = '+ ';
        break;
      case 'removed':
        sign = '- ';
        break;
      default:
        sign = '  ';
    }
    if (comparisonObj[key].nested) {
      output = `${output}${currentDepth}${sign}${key}: {\n${out(
        comparisonObj[key].value,
        comparisonObj[key].type === 'removed'
          ? originalObj1
          : originalObj1[key],
        comparisonObj[key].type === 'added' ? originalObj2 : originalObj2[key],
        depth + 2,
      )}\n`;
    } else if (comparisonObj[key].type === 'changed') {
      output = `${output}${currentDepth}- ${key}: ${stringify(originalObj1[key], depth, sign !== '  ')}\n${currentDepth}+ ${key}: ${stringify(originalObj2[key], depth, sign !== '  ')}\n`;
    } else {
      output = `${output}${currentDepth}${sign}${key}: ${stringify(comparisonObj[key].value, depth, sign !== '  ')}\n`;
    }
  });
  output = `${output}${'  '.repeat(depth - 1)}}`;
  return output;
}

export default function fancyOutput(comparisonObj, originalObj1, originalObj2) {
  const output = out(comparisonObj, originalObj1, originalObj2);
  return `{\n${(output).slice(0, -1).concat('}')}`;
}
