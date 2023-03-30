import firebaseConfig from "../firebase";
import _ from "lodash";
import { faker } from "@faker-js/faker";

/**
 * ========================================== BOOK ==========================================
 */
/**
 * Get Book by id
 * @param id: book id
 */
async function getBookByIdApi(id) {
  return await new Promise((resolve, reject) => {
    firebaseConfig
      .firestore()
      .collection("Book")
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });

        // Traverse all the data,
        // find the data whose book_id is the same as the id passed in
        let res = {};
        for (let i = 0; i < items.length; i++) {
          if (items[i]["book_id"] === id) {
            res = items[i];
          }
        }

        // if success
        resolve({
          status: 200,
          msg: "ok",
          data: res,
        });

        if(JSON.stringify(res) === "{}") {
          reject({
            status: 300,
            msg: "Get book failed " + id
          })
        }
      });
  });
}

/**
 * Get Book recommend List by book amount
 * @param amount: book amount
 * @return: a list of recommend book details
 * @usage: getBookRecommendListApi(2)
 */
async function getBookRecommendListApi(amount) {   //completed
  return await new Promise((resolve, reject) => {
    firebaseConfig.firestore().collection("book").onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });

      // 1. Sort => by recommend
      items.sort(function (a, b) {
        return b["recommend"] - a["recommend"];
      });

      // 2. Return the corresponding quantity according to amount
      let recommend_list = items.slice(0, amount);

      // 3. Select the corresponding attribute
      let res = recommend_list.map(function (item) {
        return {
          book_id: item.book_id,
          book_name: item.book_name,
          book_url: item.book_url,
          thumbnail: item.thumbnail,
        };
      });

      resolve({
        status: 200,
        msg: "ok",
        data: res,
      })


      if(!res) {
        reject({
          status: 300,
          msg: "Get recommend list failed"
        });
      }

    });
  })
}

/**
 * Get book info by category
 * @param category: book category
 * @return: a list of books based on category
 * @usage: getCategories("Fiction")
 */
async function getCategories(category){
  return await new Promise((resolve, reject) => {  //completed
    const ref = firebaseConfig.firestore().collection("Book");
    // Traverse all the data
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });

      //get the category
      const category_list = [];
      for (let i = 0; i < items.length; i++) {
        if (items[i]["category"] === category) {
          category_list.push(items[i]);
        }
      }

      //get data based on category
      let res = category_list.map(function (item) {
        return {
          category:item.category,
          book_id:item.book_id,
          book_name:item.book_name,
          author:item.author,
          book_url:item.book_url,
          thumbnail:item.thumbnail,
          recommended_amount:item.recommended_amount
        };
      });
      // if success
      resolve({
        status:200,
        msg:"ok",
        data:res
      });

      if(!res)
        reject({
          status: 300,
          msg: "get category " + category
        });
    });
  });
}


// getCategories("Fiction").then(res=>{
//   console.log(res);
// })




/**
 * 
 * @returns: all the list of book 
 */
async function getAllBook(){   // completed
  return await new Promise((resolve, reject) => {
    const ref = firebaseConfig.firestore().collection("Book");
    // Traverse all the data
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });

      //get all the book
      let res = items.map(function (item) {
        return {
          book_id:item.book_id,
          category:item.category,
          book_name:item.book_name,
          author:item.author,
          book_url:item.book_url,
          thumbnail:item.thumbnail,
          recommended_amount:item.recommended_amount
        };
      });
      // if success
      resolve({
        status:200,
        msg:"ok",
        data:res
      });
      //if failed
      if(!res)
        reject({
          status: 300,
          msg: "get all the book failed "
        });
    });
  });
}
  
// getAllBook().then(res=>{
//     console.log(res);
// })



/**
 * Add a book to firebase
 * @param book: book detail object
 * @return: { status: 200, msg: "ok" }
 * @usage: addBook(bookObj)
 */
// function addBook(book) {   //only used if the developer need it
//   const ref = firebaseConfig.firestore().collection("book");
//   console.log(book);

//   book["recommendedAmount"] = book["recommendedAmount"] + book["like"];

//   ref
//     .add(book)
//     .then((docRef) => {
//       console.log(docRef);
//       // Update the document with its ID
//       book.booK_id = docRef.id;
//       docRef.update(book);
//       return {
//         status: 200,
//         msg: "ok",
//       };
//     })
//     .catch((error) => {
//       console.error("Error adding book: ", error);
//       return {
//         status: 300,
//         msg: "Error adding book: " + error,
//       };
//     });
// }

/**
 * ========================================== User ==========================================
 */

const userRef = firebaseConfig.firestore().collection("user");

/**
 * User signup
 * @param info: user's information
 * @return: { status: 200, msg: "ok" }
 * @usage: signup(infoObj)
 */
async function signupApi(info) {  //completed
  return await new Promise((resolve, reject) => {  
    userRef
      .add(info)
      .then((docRef) => {
        // Update the document with its ID
        info.user_id = docRef.id;
        info.is_delete = false;
        docRef.update(info);

        resolve({
          status: 200,
          msg: "ok",
        });
      })
      .catch((error) => {
        reject({
          status: 300,
          msg: "Error: add user failed: " + info + " Error msg: " + error
        });
      });
    });
}

export { getBookByIdApi, getBookRecommendListApi,getCategories,getAllBook, signupApi };
