// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0dBX4aA-f1V6Q6nu-iwlx5YJXUUu4gCY",
  authDomain: "growing-years-in.firebaseapp.com",
  projectId: "growing-years-in",
  storageBucket: "growing-years-in.appspot.com",
  messagingSenderId: "837200635820",
  appId: "1:837200635820:web:3805d689040a1214d5fc09",
  measurementId: "G-YM9KRWKM70"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);