import firebaseConfig from "../firebase";

function getBook(id) {
  const ref = firebaseConfig.firestore().collection("book");
  ref.onSnapshot((querySnapshot) => {
    const items = [];
    querySnapshot.forEach((doc) => {
      items.push(doc.data());
    });
    console.log(items); // 拿到了book里所有数据

    // 遍历所有的数据，找到book_id与传入的id相同的数据，并返回它
    const res = [];
    for (let i = 0; i < items.length; i++) {
      if (items[i]["book_id"] === id) {
        res.push(items[i]);
      }
    }

    // print results
    console.log({
      status: 200,
      msg: "ok",
      data: res,
    });

    return {
      status: 200,
      msg: "ok",
      data: res,
    };
  });
}

getBook("10001");

/**
 *
 * @param name: name
 * @param count: count
 * @returns {*}
 */
function getBookRecommendList(name, count) {
  return;
}

export { getBook, getBookRecommendList };
