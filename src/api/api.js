import firebaseConfig from "../firebase";
import _ from "lodash";
import { faker } from "@faker-js/faker";

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

function getBookRecommendList(amount){
  const ref = firebaseConfig.firestore().collection("book");
  ref.onSnapshot((querySnapshot) => {
    // const items = [];
    // querySnapshot.forEach((doc) => {
    //   items.push(doc.data());
    // });
    // console.log(items); // 拿到了book里所有数据

    const items = _.times(5, () => ({
      "book_id": 1,
      "book_name": faker.company.name(),
      "thumbnail": faker.image.avatar(),
      "book_url": faker.internet.url(),
      "desc": faker.word.adjective(),
      "author":"John.Smith",
      "category":"horror",
      "font_amount":1223456,
      "ISBN":"RJDEWF4",
      "language":"English",
      "status":10, //details explanation in the chart
      "upload_time": "2023-02-21 hh:mm:ss",
      "read_amount":32,
      "comment_amount":32,
      "recommended_amount": Math.random() * 100
    }));
    console.log(items);
    

    // 1. 排序 =》 按 recommend
    // let sortedList = items.sort(function (x, y) { return parseInt(x['book_id']) - parseInt(y['book_id']) });
    items.sort(function(a, b) {
      return b.recommend - a.recommend;
    });

    // 2. 根据 amount 返回对应的数量
    let recomend_list = items.slice(0, amount);

    // 3. 选取对应的属性
    let res = recomend_list.map(function(item) {
      return {
        "book_id": item.book_id,
        "book_name": item.book_name,
        "book_url": item.book_url,
        "thumbnail": item.thumbnail,
      };
    })

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


    // const res = [];
    // for (let i = 0; i < items.length; i++) {
    //   if (items[i]["recommend_amount"] === recommend_list){
    //     if (typeof [recommend_amount] === "number") {
    //     book.sort(function (x, y) { return x[recommend_amount] - y[recommend_amount] });
    //     if(reverse){
    //       book.reverse();
    //     }
    //     return recommend_list
    //   }
    //   res.push(items[i])
    //   };
    // }
    });
}

// getBookRecommendList(2)

// getBook("1000001");

function addBook(book) {
  const ref = firebaseConfig.firestore().collection("book");
  console.log(book);

  book["recommendedAmount"] = book["recommendedAmount"] + book["like"];

  ref.add(book).then((docRef)=>{
      console.log(docRef);
       // Update the document with its ID
      book.booK_id = docRef.id;
      docRef.update(book);
      return {
        status: 200,
        msg: "ok",
      };
    })
    .catch((error) => {
      console.error("Error adding book: ", error);
      return {
        status: 300,
        msg: "Error adding book: " + error,
      };
    });
}

let book = {
  book_id: "121223",
  start_time: "2023-3-30",
  end_time: "2023-3-30",
  like: 1,
  recommendedAmount: 10,
};


const ref = firebaseConfig.firestore().collection("user");
function signup(info) {
  console.log(info);

  ref.add(info)
  .then((docRef)=>{
    console.log(docRef);
     // Update the document with its ID
    info.user_id = docRef.id;
    info.is_delete= false
    docRef.update(info);

    console.log({
      status: 200,
      msg: "ok"
    })

    return {
      status:200,
      msg:"ok",
    }
  })
  .catch((error) => {
    return {
      status: 300,
      msg: "Error adding user: " + error,
    };
  });
}
  
console.log (signup(info))



// addBook(book);

/**
 *
 * @param name: name
 * @param count: count
 * @returns {*}
 */
// function getBookRecommendList(name, count) {
//   return;
// }

export { getBook, getBookRecommendList, signup};
