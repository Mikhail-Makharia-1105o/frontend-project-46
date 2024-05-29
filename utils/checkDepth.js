function getDepth(obj, propertyName, depth = 0) {
  if (obj === null) {
    return -1;
  }
  console.log(JSON.stringify(obj) + '!!!!!!!!!!!' + propertyName);
  if (Object.prototype.hasOwnProperty.call(obj, propertyName)) {
    return depth;
  }
  let res = -1;
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'object') {
      const result = getDepth(obj[key], propertyName, depth + 1);
      res = result;
      if (result !== -1) {
        return result;
      }
    }
  });
  return res;
}

export default function checkDepth(obj, propertyName) {
  let output = '  ';
  const depth = getDepth(obj, propertyName);
  if (depth === -1) {
    return output;
  }
  output = output.repeat(depth);
  return output;
};
