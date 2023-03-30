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
async function getBookApi(id) {
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
        const res = [];
        for (let i = 0; i < items.length; i++) {
          if (items[i]["book_id"] === id) {
            res.push(items[i]);
          }
        }

        resolve({
          status: 200,
          msg: "ok",
          data: res,
        });
      });
  });
}

/**
 * Get Book recommend List by book amount
 * @param amount: book amount
 * @return: a list of recommend book details
 * @usage: getBookRecommendListApi(2)
 */
function getBookRecommendListApi(amount) {
  const ref = firebaseConfig.firestore().collection("book");
  ref.onSnapshot((querySnapshot) => {
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

    return {
      status: 200,
      msg: "ok",
      data: res,
    };
  });
}

/**
 * Add a book to firebase
 * @param book: book detail object
 * @return: { status: 200, msg: "ok" }
 * @usage: addBook(bookObj)
 */
function addBook(book) {
  const ref = firebaseConfig.firestore().collection("book");
  console.log(book);

  book["recommendedAmount"] = book["recommendedAmount"] + book["like"];

  ref
    .add(book)
    .then((docRef) => {
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
function signupApi(info) {
  userRef
    .add(info)
    .then((docRef) => {
      // Update the document with its ID
      info.user_id = docRef.id;
      info.is_delete = false;
      docRef.update(info);

      return {
        status: 200,
        msg: "ok",
      };
    })
    .catch((error) => {
      return {
        status: 300,
        msg: "Error adding user: " + error,
      };
    });
}

export { getBookApi, getBookRecommendListApi, signupApi };
