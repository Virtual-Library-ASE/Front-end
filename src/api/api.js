import firebaseConfig from "../firebase";
import _ from "lodash";
import { faker } from "@faker-js/faker";
//import  DateTime from DateTime

// var DateTime = require('datetime-js')
let dateObj = new Date()
let tomorrow =  new Date()
tomorrow.setDate(dateObj.getDate() + 1)
 



const bookReserRef = firebaseConfig.firestore().collection("Book_reservation");
const bookRef = firebaseConfig.firestore().collection("Book");
const userRef = firebaseConfig.firestore().collection("User");
const commentListRef = firebaseConfig.firestore().collection("Comment_list");
const readingRoomRef = firebaseConfig.firestore().collection("Reading_room");
const seatRef = firebaseConfig.firestore().collection("Seat");
const userEnvironmentConfigRef = firebaseConfig.firestore().collection("User_Environment_Config");
const messageRef = firebaseConfig.firestore().collection("Message");
const modelRef = firebaseConfig.firestore().collection("Model");
const seatReservationRef = firebaseConfig.firestore().collection("Seat_reservation");
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

        if(JSON.stringify(res) === "{}") {
          reject({
            status: 300,
            msg: "Get book failed " + id
          })
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

      if(!res) {
        reject({
          status: 300,
          msg: "Get recommend list failed"
        });
      }

      resolve({
        status: 200,
        msg: "ok",
        data: res,
      })

    });
  })
}

/**
 * Get book info by category
 * @param category: book category
 * @return: a list of books based on category
 * @usage: getCategories("Fiction")
 */
async function getCategoriesApi(category){
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
          category:item.category,
          book_id:item.book_id,
          book_name:item.book_name,
          author:item.author,
          book_url:item.book_url,
          thumbnail:item.thumbnail,
          recommended_amount:item.recommended_amount
        };
      });

      if(!res)
      reject({
        status: 300,
        msg: "get category " + category
      });

      // if success
      resolve({
        status:200,
        msg:"ok",
        data:res
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
async function getAllBookApi(){
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
          book_id:item.book_id,
          category:item.category,
          book_name:item.book_name,
          author:item.author,
          book_url:item.book_url,
          thumbnail:item.thumbnail,
          recommended_amount:item.recommended_amount
        };
      });

      //if failed
      if(!res)
      reject({
        status: 300,
        msg: "get all the book failed "
      });

      // if success
      resolve({
        status:200,
        msg:"ok",
        data:res
      });

    });
  });
}
  



/**
 *  insert book reservation info to database
 * @param {*} info : obj contain book reservation infomation
 * @returns {status:200, msg:"ok"}
 * usage: rentBookAddApi(infoobj)
 */

async function rentBookAddApi(info){
  return await new Promise((resolve, reject) => {
    //get time and calcualte time +7days
    let timestamp = new Date().getTime();
    let date = new Date(timestamp);
    date.setDate(date.getDate()+7);
    let newTimestamp = date.getTime()
    


    bookReserRef.add(info).then((docRef) => {
      //update the document with create time and
      info.reservation_id = docRef.id;
      info.create_time = timestamp;
      info.return_time = newTimestamp
      info.is_delete = false;
      docRef.update(info);

    console.log(info);

      resolve({
        status: 200,
        msg:"ok",
      });
    })
  
    .catch((error)=>{
      reject({
        status:300,
        msg:"Error add book renting" + info
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


/**
 * ========================================== Desk Booking ==========================================
 */

// const seatReservationRef = firebaseConfig.firestore().collection("Seat_reservation");

/**
 * Desk Booking
 * @param info:  "room_id", "seat_id", "user_id"
 * @return: { status: 200, msg: "ok" }
 * @usage: signup(infoObj)
 */
async function deskBookingApi(info) {  //completed
  return await new Promise((resolve, reject) => {  
    seatReservationRef
      .add(info)
      .then((docRef) => {
        // Update the document with its ID
        info.reservation_id = docRef.id;
        info.is_delete = false;
        docRef.update(info);
        info.create_time = dateObj.getTime()
        info.end_time = tomorrow.getTime()

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

// let info = { 
//   "seat_id": "79879",
//   "user_id": "12112",
//   "create_time": dateObj.getTime(),
//   "end_time": tomorrow.getTime()
// }
// deskBookingApi(info).then(res=>{
//   console.log(res);
// }).catch(err=>{
//   console.log(err);
// })


/**
 * Desk Booking Update
 * @param info:  "room_id", "seat_id", "user_id"
 * @return: { status: 200, msg: "ok" }
 * @usage: signup(infoObj)
 */
async function deskBookingUpdateApi(info) {  //completed
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
            for(let j =0; j < info.length; j++){
                
                // items[i][j] 
            }
            
          }
        }

        if(JSON.stringify(res) === "{}") {
          reject({
            status: 300,
            msg: "Get book failed " + id
          })
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

export { getBookByIdApi, getBookRecommendListApi,getCategoriesApi,getAllBookApi, signupApi, deskBookingApi, deskBookingUpdateApi };
