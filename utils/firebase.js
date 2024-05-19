// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgriYOVsErz0o4FaIFzbB5qMdzx6nmaKs",
  authDomain: "datingapp-e2c61.firebaseapp.com",
  projectId: "datingapp-e2c61",
  storageBucket: "datingapp-e2c61.appspot.com",
  messagingSenderId: "625453452200",
  appId: "1:625453452200:web:685fa05339b2f50affeb9d",
  measurementId: "G-YEQW31SJXF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);