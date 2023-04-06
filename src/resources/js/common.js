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

export function timestampToDate(timestamp) {
  const date = new Date(timestamp); // 使用 Date 对象创建日期对象
  const year = date.getFullYear(); // 获取年份
  const month = date.getMonth() + 1; // 获取月份，注意要加1，因为月份从0开始
  const day = date.getDate(); // 获取日期
  const hour = date.getHours(); // 获取小时数
  const minute = date.getMinutes(); // 获取分钟数
  const second = date.getSeconds(); // 获取秒数

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}
