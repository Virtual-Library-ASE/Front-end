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

export function underscoreToCamelCaseKeysInArray(arr) {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    newArr.push(underscoreToCamelCaseKeys(arr[i]));
  }
  return newArr;
}

export function getRandomNumber(low = 1, high = 999) {
  return Math.floor(Math.random() * high) + low;
}
