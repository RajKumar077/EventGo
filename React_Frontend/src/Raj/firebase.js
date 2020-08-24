//@Author - RajKumar B00849566

import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBd9CEYu3gYROYCqkMCOWtn3M_VcYXfVyg",
    authDomain: "eventgoimg.firebaseapp.com",
    databaseURL: "https://eventgoimg.firebaseio.com",
    projectId: "eventgoimg",
    storageBucket: "eventgoimg.appspot.com",
    messagingSenderId: "485259659786",
    appId: "1:485259659786:web:2d94d93e12dd3e133b2df3",
    measurementId: "G-MZ7T50TDYJ"
};
  
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };