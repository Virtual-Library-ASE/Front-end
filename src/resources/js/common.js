export function underscoreToCamelCase(str) {
  return str.replace(/_([a-z])/g, function (match, letter) {
    return letter.toUpperCase();
  });
}

export function underscoreToCamelCaseKeys(obj) {
  let newObj = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[underscoreToCamelCase(key)] = obj[key];
    }
  }
  return newObj;
}
