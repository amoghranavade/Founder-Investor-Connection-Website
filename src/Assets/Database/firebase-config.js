// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWE3-vMhyL_5dLElq4ik7jORWVUXFGHVo",
  authDomain: "growthcap-bed92.firebaseapp.com",
  projectId: "growthcap-bed92",
  storageBucket: "growthcap-bed92.appspot.com",
  messagingSenderId: "872371809433",
  appId: "1:872371809433:web:6017beee795d1233959c08",
  measurementId: "G-35RY4HVG58"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export default app;