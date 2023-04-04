import firebaseConfig from "../firebase";

const bookReserRef = firebaseConfig.firestore().collection("Book_reservation");
const bookRef = firebaseConfig.firestore().collection("Book");
const userRef = firebaseConfig.firestore().collection("User");
const commentListRef = firebaseConfig.firestore().collection("Comment_list");
const readingRoomRef = firebaseConfig.firestore().collection("Reading_room");
const seatRef = firebaseConfig.firestore().collection("Seat");
const userEnvironmentConfigRef = firebaseConfig
  .firestore()
  .collection("User_environment_config");
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
 * ========================================== Seat ==========================================
 */

async function addSeatReserApi(info) {
  return await new Promise((resolve, reject) => {
    // 1. Query rest available seats of this room
    seatRef
      .where("room_id", "==", info.room_id)
      .where("is_available", "==", true)
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.size) {
          reject({
            status: 300,
            msg: "No extra seat in this room!",
          });
        }
        // 2. Assign the first seat to this user
        let seat_doc = querySnapshot.docs[0];
        let seat_id = seat_doc.data()["seat_id"];

        // 3. Add this reservation info to Seat_reservation collection
        let newInfo = {
          user_id: info["user_id"],
          seat_id: seat_id,
          start_time: info["start_time"],
          end_time: info["end_time"],
          create_time: getTimestamp(),
          return_time: getTimestamp(1),
        };
        seatReservationRef
          .add(newInfo)
          .then((docRef) => {
            info.reservation_id = docRef.id;
            info.is_delete = false;
            docRef.update(info);

            resolve({
              status: 200,
              msg: "ok",
              data: {
                reservation_id: docRef.id,
              },
            });
          })
          .catch((error) => {
            reject({
              status: 300,
              msg: "Error: rent seat failed: " + info + " Error msg: " + error,
            });
          });

        // 4.Update state of this seat
        seat_doc.ref.update({
          ...seat_doc.data(),
          is_available: false,
        });

        // 5.Update reader_amount of this room
        readingRoomRef
          .doc(info.room_id)
          .get()
          .then((doc) => {
            doc.ref.update({
              ...doc.data(),
              reader_amount: doc.data()["reader_amount"] + 1,
            });
          })
          .catch((err) => {
            reject({
              status: 300,
              msg:
                "Error: update reader_amount error " +
                info +
                " Error msg: " +
                err,
            });
          });
      })
      .catch((error) => {
        reject({
          status: 300,
          msg:
            "Error: update reader_amount error " +
            info +
            " Error msg: " +
            error,
        });
      });
  });
}

async function updateSeatReserApi(info) {
  return await new Promise((resolve, reject) => {
    //judge if the input info is correct in database
    seatReservationRef
      .doc(info.reservation_id)
      .get()
      .then((doc) => {
        let item = doc.data();
        Object.assign(item, info);
        doc.ref.update(item);

        resolve({
          data: item,
          status: 200,
          msg: "ok",
        });
      })
      .catch((error) => {
        reject({
          status: 300,
          msg: "Seat Reservation update error " + info + " Error msg: " + error,
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
 * Get User's seat info
 * @param user_id:
 * @returns {Promise<unknown>}
 */
async function getUserSeatInfoApi(user_id) {
  return await new Promise((resolve, reject) => {
    //judge if the input info is correct in database
    seatReservationRef
      .where("user_id", "==", user_id)
      .get()
      .then((querySnapshot) => {
        resolve({
          data: querySnapshot.docs[0].data(),
          status: 200,
          msg: "ok",
        });
      })
      .catch((error) => {
        reject({
          status: 300,
          msg: "Error msg: " + error,
        });
      });
  });
}

function getTimestamp(delay = 0) {
  let timestamp = new Date().getTime();
  let date = new Date(timestamp);
  date.setDate(date.getDate() + delay);
  return date.getTime();
}

export {
  addSeatReserApi,
  updateSeatReserApi,
  getBookByIdApi,
  getBookRecommendListApi,
  getCategoriesApi,
  getAllBookApi,
  getUserSeatInfoApi,
  signupApi,
  logInApi,
};
