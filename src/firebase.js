import firebase from "firebase/compat/app";
// import "firebase/auth";
import "firebase/compat/firestore";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyCbPqJ-hlCHlV0XRGxNlweeDGVu973C3qk",
  authDomain: "fir-test-project-bae00.firebaseapp.com",
  databaseURL:
    "https://fir-test-project-bae00-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fir-test-project-bae00",
  storageBucket: "fir-test-project-bae00.appspot.com",
  messagingSenderId: "592761039577",
  appId: "1:592761039577:web:63fcce6a394813ef79ecc8",
  measurementId: "G-4VVZ3MG1JP",
});

export default firebaseConfig;
