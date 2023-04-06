// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWjZNgponzm7mtGOlU04LmPgVFkZt5Ay8",
  authDomain: "mobilebasedcashflow-img.firebaseapp.com",
  projectId: "mobilebasedcashflow-img",
  storageBucket: "mobilebasedcashflow-img.appspot.com",
  messagingSenderId: "854926684755",
  appId: "1:854926684755:web:416a4721f7bca5e0480ca6",
  measurementId: "G-L2SMCWNLCX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);
export const storage = getStorage(app);