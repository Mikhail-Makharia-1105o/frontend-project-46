#!usr/bin/env node
/* eslint-disable fp/no-mutation */
/* eslint-disable fp/no-mutating-methods */
/* eslint-disable fp/no-let */
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
      output.push(
        flatOutput(
          comparisonObj[key].value,
          comparisonObj[key].type === 'added'
            ? originalObj1
            : originalObj1[key],
          comparisonObj[key].type === 'removed'
            ? originalObj2
            : originalObj2[key],
          `${currentPath}${currentPath ? '.' : ''}${key}`
        )
      );
    } else if (comparisonObj[key].type === 'added') {
      const stringformatted =
        typeof comparisonObj[key].value === 'string'
          ? `'${comparisonObj[key].value}'`
          : comparisonObj[key].value;
      const formatted =
        typeof comparisonObj[key].value === 'object' && comparisonObj[key].value
          ? '[complex value]'
          : stringformatted;
      output.push(
        `Property '${currentPath}${currentPath ? '.' : ''}${key}' was added with value: ${formatted}`
      );
    } else if (comparisonObj[key].type === 'removed') {
      output.push(
        `Property '${currentPath}${currentPath ? '.' : ''}${key}' was removed`
      );
    } else if (comparisonObj[key].type === 'changed') {
      const stringformatted1 =
        typeof originalObj1[key] === 'string'
          ? `'${originalObj1[key]}'`
          : originalObj1[key];
      const stringformatted2 =
        typeof originalObj2[key] === 'string'
          ? `'${originalObj2[key]}'`
          : originalObj2[key];
      const formatted1 =
        typeof originalObj1[key] === 'object' && originalObj1[key]
          ? '[complex value]'
          : stringformatted1;
      const formatted2 =
        typeof originalObj2[key] === 'object' && originalObj2[key]
          ? '[complex value]'
          : stringformatted2;
      output.push(
        `Property '${currentPath}${currentPath ? '.' : ''}${key}' was updated. From ${formatted1} to ${formatted2}`
      );
    }
  });
  return output.flat(Infinity).join('\n');
}
