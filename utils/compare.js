#!usr/bin/env node
import _ from 'lodash';
/* eslint-disable fp/no-mutation */
/* eslint-disable fp/no-mutating-methods */
/* eslint-disable fp/no-mutation fp/no-let */
/** SIDENOTE:
* Nested only applies to object that are considered shared.
* If there is a deep object that we DO NOT need to go into(i.e. shared objects),
* we set nested to false.
* False nests avoid recursion that we don't need, and help the output
* functions diplay results properly.
* For example: { a: { b: 4 } } in obj1 is exclusive to obj1. It does not need
* to be set as nested.
*it will have " - " in front of it either way.
*/
/**
* Compares two objects. Returs a comparison object.
* Comparison object adds type and nested properties,
* saving key's value in the value property.
* @param {Object} obj1 - first object
* @param {Object} obj2 - second object
*/
export default function compare(obj1, obj2) {
  const output = {};
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  keys1.forEach((key) => {
    if (keys2.includes(key)) {
      if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
        const outputNested = compare(obj1[key], obj2[key]);
        if (Object.keys(outputNested).length > 0) {
          if (_.isEqual(obj1[key], obj2[key])) {
            output[key] = { value: outputNested, type: 'shared', nested: true };
          } else {
            output[key] = { value: outputNested, type: 'changed', nested: true };
          }
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
