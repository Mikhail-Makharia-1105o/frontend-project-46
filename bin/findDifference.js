/**
 * The function finds differences in two object.
 * Returns an array of 3 objects - params only in obj1, params only in obj2 and params in both. Parameters
 * are considered equal if both of their keyues are equal.
 * @param {object} obj1
 * @param {object} obj2
 * @returns {Array} Object array of differences
 */
export default function findDifference(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  let excl2 = {};
  let excl1 = {};
  const shared = keys1.reduce((shared, key) => {
    if (keys2.includes(key)) {
      if (obj1[key] === obj2[key]) {
        shared[key] = obj2[key];
        console.log(shared);
      } else {
        excl1[key] = obj1[key];
        excl2[key] = obj2[key];
      }
    } else {
      excl1[key] = obj1[key];
    }
    return shared;
  }, {});
  keys2.forEach((key) => {
    if (!(Object.keys(shared).includes(key))) {
      excl2[key] = obj2[key];
    }
  })
  return [shared, excl1, excl2];
}
