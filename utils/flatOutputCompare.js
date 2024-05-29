#!usr/bin/env node
let output = '';
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
      } else if (comparisonObj[key].type === 'changed') {
        flatOutput(
          comparisonObj[key].value,
          originalObj1[key],
          originalObj2[key],
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
      console.log(`${currentPath}${currentPath ? '.' : ''}${key}`);
      output += `Property '${currentPath}${currentPath ? '.' : ''}${key}' was added with value: ${typeof comparisonObj[key].value === 'object' && comparisonObj[key].value ? '[complex value]' : JSON.stringify(comparisonObj[key].value)}\n`;
    } else if (comparisonObj[key].type === 'removed') {
      console.log(`${currentPath}${currentPath ? '.' : ''}.${key}`);
      output += `Property '${currentPath}${currentPath ? '.' : ''}${key}' was removed\n`;
    } else if (comparisonObj[key].type === 'changed') {
      console.log(`${currentPath}${currentPath ? '.' : ''}.${key}`);
      output += `Property '${currentPath}${currentPath ? '.' : ''}${key}' was updated. From ${typeof originalObj1[key] === 'object' && originalObj1[key] ? '[complex value]' : JSON.stringify(originalObj1[key])} to ${typeof originalObj2[key] === 'object' && originalObj2[key] ? '[complex value]' : JSON.stringify(originalObj2[key])}\n`;
    }
  });
  return output;
}
