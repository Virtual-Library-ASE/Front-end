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
      let category_list = [];
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
 * change the book status
 * @param {*} info : book id and status
 * @returns status:200, msg:"ok"
 */

async function renewBookStatus(info) {
  return await new Promise((resolve, reject) => {
    bookRef
      .where("book_id", "==", info["book_id"])
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let item = doc.data();
          item["status"] = info["status"];

          // renew the field value below if the info contains it
          bookRef
            .doc(info["book_id"])
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
 * @param  info : contain book reservation information
 * @returns status:200, msg:"ok"
 * usage: rentBookAddApi(infoObj)
 */

async function addBookRentApi(info) {
  return await new Promise((resolve, reject) => {
    // get time and calculate time +7days
    let timestamp = new Date().getTime();
    let date = new Date(timestamp);
    date.setDate(date.getDate() + 7);
    let newTimestamp = date.getTime();

    bookReserRef
      .add(info)
      .then((docRef) => {
        //update the document with extra info
        info["reservation_id"] = docRef.id;
        info["create_time"] = timestamp;
        info["return_time"] = newTimestamp;
        docRef.update(info);

        //renew the status in book
        renewBookStatus({
          book_id: info["book_id"],
          status: false,
        });

        resolve({
          status: 200,
          msg: "ok",
          reservation_id: info["reservation_id"],
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
 * update booking renting info
 * @param info: renting book status info
 * @returns status:200, msg:"ok"
 */
async function updateRentBookApi(info) {
  return await new Promise((resolve, reject) => {
    // check the content of info in database based on reservation_id
    bookReserRef
      .where("reservation_id", "==", info.reservation_id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let item = doc.data();

          // renew the field value below if the info contains it
          item["user_id"] = info["user_id"] || item["user_id"];
          item["is_delete"] = info["is_delete"] || item["is_delete"];
          item["book_id"] = info["book_id"] || item["book_id"];
          item["start_time"] = info["start_time"] || item["start_time"];
          item["end_time"] = info["end_time"] || item["end_time"];

          //renew the status in book
          renewBookStatus({
            book_id: info.book_id,
            status: true,
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
 * get all the comment in one book
 * @param {*} id :book_id
 * @returns :book_id,comment_id,user_id,user_name,content,comment_page,create_time
 * Usage: getAllCommentByBookIdApi()
 */
async function getAllCommentByBookIdApi(id) {
  return await new Promise((resolve, reject) => {
    // traverse all the data from comment list
    commentListRef
      .where("book_id", "==", id)
      .get()
      .then((querySnapshot) => {
        let comments = []
        querySnapshot.forEach((doc) => {
          let item = doc.data();

          let tmp = {
            book_id: item.book_id,
            comment_id: item.comment_id,
            user_id: item.user_id,
            user_name: null,
            content: item.content,
            comment_page: item.comment_page,
            create_time: item.create_time,
          }

          userRef
            .where("user_id", "==", item.user_id)
            .get()
            .then((querySnapShot) => {
              querySnapShot.forEach((userDoc) => {
                tmp["user_name"] = userDoc.data().user_name;
              });
            })
            .catch((err) => {
              reject({
                status: 300,
                msg: "Error: get book comment: " + err,
              });
            });

            comments.push(tmp)
        });

        resolve({
          status: 200,
          msg: "ok",
          data: comments
        });
      })
      .catch((err) => {
        console.log(err);
        reject({
          status: 300,
          msg: "Error: get book comment: " + id,
        });
      });
  });
}


async function addCommentByBookIdApi(info) {
  return await new Promise((resolve,reject)=>{
    commentListRef
      .add(info)
      .then((doc)=>{
        debugger
        info["create_time"]= getTimestamp();
        info["is_delete"]= false;
        info["comment_id"]= doc.id
        doc.update(info);

        resolve({
          status:200,
          msg:"ok",
          data:{
            "comment_id":info.comment_id
          }
        });
      })
      .catch((error)=>{
        reject({
          status:300,
          msg:"Error: add comment failed"+ error
        });
      })
  })
}

addCommentByBookIdApi({
  book_id:"123213",
  user_id:"123213",
  comment_page:21343,
  content:"i hate backend"
}).then((result) => {
  console.log(result);
}).catch((err) => {
  console.log(err);
});


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
        if (queryRes.size) {
          reject({
            status: 300,
            msg: "Error: email already exists",
          });
        } else {
          userRef
            .add(info)
            .then((doc) => {
              // Update the document with its ID
              info.user_id = doc.id;
              info.is_delete = false;
              doc.update(info);

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
          Object.assign(item, info); // update user info here

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
        // Judge the result of same email and password
        if (querySnapshot.empty) {
          reject({
            status: 300,
            msg: "The user does not exist or password is wrong!",
          });
        } else {
          querySnapshot.forEach((doc) => {
            let item = doc.data();
            delete item["is_delete"];

            resolve({
              data: item,
              status: 200,
              msg: "ok",
            });
          });
        }
      })
      .catch((error) => {
        reject({
          status: 300,
          msg: "log in error " + info + " Error msg: " + error,
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
  getBookByIdApi,
  getBookRecommendListApi,
  getCategoriesApi,
  getAllBookApi,
  addBookRentApi,
  updateRentBookApi,
  signupApi,
  updateUserInfoApi,
  logInApi,
  getAllCommentByBookIdApi,
  addCommentByBookIdApi
};
