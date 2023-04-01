import firebaseConfig from "../firebase";
import _ from "lodash";
import { faker } from "@faker-js/faker";
//import  DateTime from DateTime

// var DateTime = require('datetime-js')
let dateObj = new Date();
let tomorrow = new Date();
tomorrow.setDate(dateObj.getDate() + 1);

const bookReserRef = firebaseConfig.firestore().collection("Book_reservation");
const bookRef = firebaseConfig.firestore().collection("Book");
const userRef = firebaseConfig.firestore().collection("User");
const commentListRef = firebaseConfig.firestore().collection("Comment_list");
const readingRoomRef = firebaseConfig.firestore().collection("Reading Room");
const seatRef = firebaseConfig.firestore().collection("Seat");
const userEnvironmentConfigRef = firebaseConfig
  .firestore()
  .collection("User_Environment_Config");
const messageRef = firebaseConfig.firestore().collection("Message");
const modelRef = firebaseConfig.firestore().collection("Model");
const seatReservationRef = firebaseConfig
  .firestore()
  .collection("Seat_reservation");
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

        if (JSON.stringify(res) === "{}") {
          reject({
            status: 300,
            msg: "Get book failed " + id,
          });
        }

        // if success
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
async function getBookRecommendListApi(amount) {
  return await new Promise((resolve, reject) => {
    bookRef.onSnapshot((querySnapshot) => {
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

      if (!res) {
        reject({
          status: 300,
          msg: "Get recommend list failed",
        });
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
 * Get book info by category
 * @param category: book category
 * @return: a list of books based on category
 * @usage: getCategories("Fiction")
 */
async function getCategoriesApi(category) {
  return await new Promise((resolve, reject) => {
    // Traverse all the data
    bookRef.onSnapshot((querySnapshot) => {
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
          category: item.category,
          book_id: item.book_id,
          book_name: item.book_name,
          author: item.author,
          book_url: item.book_url,
          thumbnail: item.thumbnail,
          recommended_amount: item.recommended_amount,
        };
      });

      if (!res)
        reject({
          status: 300,
          msg: "get category " + category,
        });

      // if success
      resolve({
        status: 200,
        msg: "ok",
        data: res,
      });
    });
  });
}

// getCategories("Fiction").then(res=>{
//   console.log(res);
// })

/**
 * get all the book
 * @returns: all the list of book
 */
async function getAllBookApi() {
  return await new Promise((resolve, reject) => {
    // Traverse all the data
    bookRef.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });

      //get all the book
      let res = items.map(function (item) {
        return {
          book_id: item.book_id,
          category: item.category,
          book_name: item.book_name,
          author: item.author,
          book_url: item.book_url,
          thumbnail: item.thumbnail,
          recommended_amount: item.recommended_amount,
        };
      });

      //if failed
      if (!res)
        reject({
          status: 300,
          msg: "get all the book failed ",
        });

      // if success
      resolve({
        status: 200,
        msg: "ok",
        data: res,
      });
    });
  });
}

/**
 * change the book status
 * @param {*} info : book id and status
 * @returns statue:200,msg:"ok"
 */

async function renewBookStatus(info) {
  return await new Promise((resolve, reject) => {
    bookRef
      .where("book_id", "==", info.book_id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let item = doc.data();

          item["status"] = info["status"];
          console.log(item);
          // renew the fielf value below if the info contains it

          bookRef
            .doc(info.bookid)
            .update(item)
            .then(() => {
              resolve({
                statue: 200,
                msg: "ok",
              });
            })
            .catch((error) => {
              reject({
                statue: 300,
                msg: "Error update book status! " + error,
              });
            });
        });
      });
  });
}

/**
 *  insert book reservation info to database
 * @param  info : obj contain book reservation infomation
 * @returns status:200, msg:"ok"
 * usage: rentBookAddApi(infoobj)
 */

async function rentBookAddApi(info) {
  return await new Promise((resolve, reject) => {
    //get time and calcualte time +7days
    let timestamp = new Date().getTime();
    let date = new Date(timestamp);
    date.setDate(date.getDate() + 7);
    let newTimestamp = date.getTime();

    bookReserRef
      .add(info)
      .then((docRef) => {
        //update the document with extra info
        info.reservation_id = docRef.id;
        info.create_time = timestamp;
        info.return_time = newTimestamp;
        info.is_delete = false;
        docRef.update(info);

        //renew the status in book
        renewBookStatus({
          book_id: info.book_id,
          status: false,
        });

        resolve({
          status: 200,
          msg: "ok",
          reservation_id: info.reservation_id,
        });
      })

      .catch((error) => {
        reject({
          status: 300,
          msg: "Error add book renting" + error,
        });
      });
  });
}

/**
 * Get book info by name
 * @param book_name: book name
 * @return: a list of books based on name
 * @usage: getBookByNameApi("Harry Potter")
 */
async function getBookByNameApi(name) {
  return await new Promise((resolve, reject) => {
    // Traverse all the data
    bookRef.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });

      //get the book name
      const name_list = [];
      for (let i = 0; i < items.length; i++) {
        if (items[i]["book_name"] === name) {
          name_list.push(items[i]);
        }
      }

      //get data based on category
      let res = name_list.map(function (item) {
        return {
          category: item.category,
          book_id: item.book_id,
          book_name: item.book_name,
          author: item.author,
          book_url: item.book_url,
          thumbnail: item.thumbnail,
          recommended_amount: item.recommended_amount,
        };
      });

      if (!res)
        reject({
          status: 300,
          msg: "get book name " + name,
        });

      // if success
      resolve({
        status: 200,
        msg: "ok",
        data: res,
      });
    });
  });
}

// getBookNameApi("Normal People").then(res=>{
//   console.log(res);
// })

/**
 * update booking renting info
 * @param info: renting book status info
 * @returns status:200, msg:"ok"
 */
async function rentBookUpdateApi(info) {
  return await new Promise((resolve, reject) => {
    // check the content of info in database based on reservation_id
    bookReserRef
      .where("reservation_id", "==", info.reservation_id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let item = doc.data();

          // renew the fielf value below if the info contains it
          item["user_id"] = info["user_id"] ? info["user_id"] : item["user_id"];
          item["is_delete"] = info["is_delete"]
            ? info["is_delete"]
            : item["is_delete"];
          item["book_id"] = info["book_id"] ? info["book_id"] : item["book_id"];
          item["start_time"] = info["start_time"]
            ? info["start_time"]
            : item["start_time"];
          item["end_time"] = info["end_time"]
            ? info["end_time"]
            : item["end_time"];

          //renew the status in book
          renewBookStatus({
            book_id: info.book_id,
            status: info.is_delete,
          });
          //update info based on reservation_id
          bookReserRef
            .doc(info.reservation_id)
            .update(item)
            .then(() => {
              resolve({
                status: 200,
                msg: "ok",
              });
            })
            .catch((error) => {
              reject({
                status: 300,
                msg: "Error update renting status! " + error,
              });
            });
        });
      })
      .catch((error) => {
        reject({
          status: 300,
          msg: "Error update renting status! " + error,
        });
      });
  });
}

/**
 * ========================================== User ==========================================
 */

/**
 * User signup
 * @param info: user's information
 * @return: { status: 200, msg: "ok" }
 * @usage: signup(infoObj)
 */
async function signupApi(info) {
  return await new Promise((resolve, reject) => {
    //
    userRef
      .where("email", "==", info.email)
      .get()
      .then((queryRes) => {
        if (queryRes) {
          reject({
            status: 300,
            msg: "Error: email already exists",
          });
        } else {
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
                msg: "Error: add user failed: " + info + " Error msg: " + error,
              });
            });
        }
      });
  });
}

/**
 * update user info
 * @param info: user's information
 * @return:  status: 200, msg: "ok"
 * @usage: updateUserInfoApi(infoObj)
 */
async function updateUserInfoApi(info) {
  return await new Promise((resolve, reject) => {
    userRef
      .where("user_id", "==", info.user_id)
      .get()
      .then((querySnapShot) => {
        querySnapShot.forEach((doc) => {
          let item = doc.data();
          item = { ...info }; // update user info here

          userRef
            .doc(item.user_id)
            .update(item)
            .then(() => {
              resolve({
                status: 200,
                msg: "ok",
              });
            })
            .catch((err) => {
              console.log(err);
              reject({
                status: 300,
                msg:
                  "Error: update user failed: " + info + " Error msg: " + err,
              });
            });
        });
      })
      .catch((error) => {
        reject({
          status: 300,
          msg: "Error: update user failed: " + info + " Error msg: " + error,
        });
      });
  });
}

/**
 * user login
 * @param  info: email and password
 * @returns  user details, status:200, msg:"ok"
 */

async function logInApi(info) {
  return await new Promise((resolve, reject) => {
    //judge if the input info is correct in database
    userRef
      .where("email", "==", info.email)
      .where("password", "==", info.password)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let item = doc.data();
          delete item["is_delete"];

          resolve({
            data: item,
            status: 200,
            msg: "ok",
          });
        });
      })
      .catch((error) => {
        reject({
          status: 300,
          msg: "log in error " + info + " Error msg: " + error,
        });
      });
  });
}

/**
 * ========================================== Reading Room ==========================================
 */

/**
 * get all the room
 * @returns: all the list of room
 */
async function getAllReadingRoomApi() {
  return await new Promise((resolve, reject) => {
    // Traverse all the data
    readingRoomRef.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });

      //get all the reading room
      let res = items.map(function (item) {
        return {
          room_name: item.room_name,
          room_capacity: item.room_capacity,
          room_id: item.room_id,
          reader_amount: item.reader_amount,
        };
      });

      //if failed
      if (!res)
        reject({
          status: 300,
          msg: "get all the raeding room failed ",
        });

      // if success
      resolve({
        status: 200,
        msg: "ok",
        data: res,
      });
    });
  });
}

// getAllReadingRoomApi().then(res=>{
//   console.log(res);
// })

/**
 * ========================================== Model ==========================================
 */

/**
 * model by user
 * @param info: user_id
 * @return: model_link status: 200, msg: "ok"
 * @usage: getUserModelApi(infoObj)
 */
async function getUserModelApi(id) {
  return await new Promise((resolve, reject) => {
    firebaseConfig
      .firestore()
      .collection("Model")
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });

        // Traverse all the data,
        // find the data whose user_id is the same as the id passed in
        let res = {};
        for (let i = 0; i < items.length; i++) {
          if (items[i]["model_id"] === id) {
            res = items[i];
          }
        }

        if (JSON.stringify(res) === "{}") {
          reject({
            status: 300,
            msg: "Get model failed " + id,
          });
        }

        // if success
        resolve({
          status: 200,
          msg: "ok",
          data: res,
        });
      });
  });
}

// getUserModelApi("104").then(res=>{
//   console.log(res);
// })

/**
 * get all the model
 * @returns: all the list of model
 */
async function getAllModelApi() {
  return await new Promise((resolve, reject) => {
    // Traverse all the data
    modelRef.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });

      //get all the model
      let res = items.map(function (item) {
        return {
          model_name: item.model_name,
          model_url: item.model_url,
          model_id: item.model_id,
        };
      });

      //if failed
      if (!res)
        reject({
          status: 300,
          msg: "get all the model failed ",
        });

      // if success
      resolve({
        status: 200,
        msg: "ok",
        data: res,
      });
    });
  });
}

// getAllModelApi().then(res=>{
//   console.log(res);
// })

/**
 * ========================================== Desk Booking ==========================================
 */
/**
 * Desk Booking
 * @param info:  "room_id", "seat_id", "user_id"
 * @return: status: 200, msg: "ok"
 * @usage: signup(infoObj)
 */
async function deskBookingApi(info) {
  //completed
  return await new Promise((resolve, reject) => {
    seatReservationRef
      .add(info)
      .then((docRef) => {
        // Update the document with its ID
        info.reservation_id = docRef.id;
        info.is_delete = false;
        docRef.update(info);
        info.create_time = dateObj.getTime();
        info.end_time = tomorrow.getTime();

        resolve({
          status: 200,
          msg: "ok",
        });
      })
      .catch((error) => {
        reject({
          status: 300,
          msg: "Error: add user failed: " + info + " Error msg: " + error,
        });
      });
  });
}

/**
 * Desk Booking Update
 * @param info:  "room_id", "seat_id", "user_id"
 * @return: status: 200, msg: "ok"
 * @usage: signup(infoObj)
 */
async function deskBookingUpdateApi(info) {
  //completed
  return await new Promise((resolve, reject) => {
    firebaseConfig
      .firestore()
      .collection("Seat_reservation")
      .onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });

        // Traverse all the data,
        // find the data whose book_id is the same as the id passed in
        let res = {};
        for (let i = 0; i < items.length; i++) {
          if (items[i]["reservation_id"] === info.reservation_id) {
            for (let j = 0; j < info.length; j++) {
              // items[i][j]
            }
          }
        }

        if (JSON.stringify(res) === "{}") {
          reject({
            status: 300,
            msg: "Desk Booking failed ",
          });
        }

        // if success
        resolve({
          status: 200,
          msg: "ok",
          data: res,
        });
      });
  });
}

export {
  getBookByIdApi,
  getBookRecommendListApi,
  getBookByNameApi,
  getCategoriesApi,
  getAllBookApi,
  rentBookAddApi,
  rentBookUpdateApi,
  signupApi,
  updateUserInfoApi,
  getUserModelApi,
  deskBookingApi,
  deskBookingUpdateApi,
  logInApi,
  getAllModelApi,
  getAllReadingRoomApi,
};
