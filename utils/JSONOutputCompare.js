#!usr/bin/env node

/**
 * Handles comparing the objects. Outputs a JSON string.
 * @param {Object} obj1 - first object
 * @param {Object} obj2 - second object
*/
export default function JSONOutput(obj1, obj2) {
  return JSON.stringify(obj1, obj2, null);
}
