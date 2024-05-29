#!/usr/bin/env node
export default function compare(obj1, obj2) {
  const output = {};
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  console.log();
  keys1.forEach((key) => {
    if (keys2.includes(key)) {
      if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
        const outputNested = compare(obj1[key], obj2[key]);

        if (Object.keys(outputNested).length > 0) {
          output[key] = { value: outputNested, nested: true, type: 'changed' };
        }
      } else if (obj1[key] === obj2[key]) {
        output[key] = { value: obj1[key], type: 'shared', nested: false };
      } else {
        output[key] = {
          value: obj1[key],
          type: 'changed',
          nested: false,
        };
      }
    } else {
      output[key] = { value: obj1[key], type: 'removed', nested: false };
    }
  });

  keys2.forEach((key) => {
    if (!keys1.includes(key)) {
      output[key] = { value: obj2[key], type: 'added', nested: false };
    }
  });
  return output;
}
