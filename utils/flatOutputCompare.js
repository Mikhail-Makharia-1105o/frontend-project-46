#!usr/bin/env node
/* eslint-disable fp/no-mutation fp/no-mutating-methods fp/no-let */
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
  currentPath = ''
) {
  const output = [];
  const keys = Object.keys(comparisonObj).sort((a, b) => (a > b ? 1 : -1));
  keys.forEach((key) => {
    if (comparisonObj[key].nested) {
      if (comparisonObj[key].type === 'added') {
        output.push(
          flatOutput(
            comparisonObj[key].value,
            originalObj1,
            originalObj2[key],
            `${currentPath}${currentPath ? '.' : ''}${key}`
          )
        );
      } else if (comparisonObj[key].type === 'removed') {
        output.push(
          flatOutput(
            comparisonObj[key].value,
            originalObj1[key],
            originalObj2,
            `${currentPath}${currentPath ? '.' : ''}${key}`
          )
        );
      } else if (comparisonObj[key].type === 'changed') {
        output.push(
          flatOutput(
            comparisonObj[key].value,
            originalObj1[key],
            originalObj2[key],
            `${currentPath}${currentPath ? '.' : ''}${key}`
          )
        );
      }
    } else if (comparisonObj[key].type === 'added') {
      output.push(
        `Property '${currentPath}${currentPath ? '.' : ''}${key}' was added with value: ${typeof comparisonObj[key].value === 'object' && comparisonObj[key].value ? '[complex value]' : typeof comparisonObj[key].value === 'string' ? `'${comparisonObj[key].value}'` : comparisonObj[key].value}`,
      );
    } else if (comparisonObj[key].type === 'removed') {
      output.push(
        `Property '${currentPath}${currentPath ? '.' : ''}${key}' was removed`,
      );
    } else if (comparisonObj[key].type === 'changed') {
      output.push(
        `Property '${currentPath}${currentPath ? '.' : ''}${key}' was updated. From ${typeof originalObj1[key] === 'object' && originalObj1[key] ? '[complex value]' : typeof originalObj1[key] === 'string' ? `'${originalObj1[key]}'` : originalObj1[key]} to ${typeof originalObj2[key] === 'object' && originalObj2[key] ? '[complex value]' : typeof originalObj2[key] === 'string' ? `'${originalObj2[key]}'` : originalObj2[key]}`,
      );
    }
  });
  return output.flat(Infinity).join('\n');
}
