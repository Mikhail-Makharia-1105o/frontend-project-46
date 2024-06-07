#!usr/bin/env node
let output = '';

/**
* Converts comparison object into a set of flat output strings.
* @param {Object} comparisonObj - comparison object
* @param {Object} originalObj1 - original object 1
* @param {Object} originalObj2 - original object 2
* @param {string} currentPath - current path(for recursion)
*/
export default function flatOutput(
  comparisonObj,
  originalObj1,
  originalObj2,
  currentPath = '',
) {
  const keys = Object.keys(comparisonObj);
  keys.forEach((key) => {
    if (comparisonObj[key].nested) {
      if (comparisonObj[key].type === 'added') {
        flatOutput(
          comparisonObj[key].value,
          originalObj1,
          originalObj2[key],
          `${currentPath}${currentPath ? '.' : ''}${key}`,
        );
      } else if (comparisonObj[key].type === 'removed') {
        flatOutput(
          comparisonObj[key].value,
          originalObj1[key],
          originalObj2,
          `${currentPath}${currentPath ? '.' : ''}${key}`,
        );
      } else {
        flatOutput(
          comparisonObj[key].value,
          originalObj1[key],
          originalObj2[key],
          `${currentPath}${currentPath ? '.' : ''}${key}`,
        );
      }
    } else if (comparisonObj[key].type === 'added') {
      output += `Property '${currentPath}${currentPath ? '.' : ''}${key}' was added with value: ${typeof comparisonObj[key].value === 'object' && comparisonObj[key].value ? '[complex value]' : JSON.stringify(comparisonObj[key].value)}\n`;
    } else if (comparisonObj[key].type === 'removed') {
      output += `Property '${currentPath}${currentPath ? '.' : ''}${key}' was removed\n`;
    } else if (comparisonObj[key].type === 'changed') {
      output += `Property '${currentPath}${currentPath ? '.' : ''}${key}' was updated. From ${typeof originalObj1[key] === 'object' && originalObj1[key] ? '[complex value]' : JSON.stringify(originalObj1[key])} to ${typeof originalObj2[key] === 'object' && originalObj2[key] ? '[complex value]' : JSON.stringify(originalObj2[key])}\n`;
    }
  });
  return output.slice(0, -1);
}
