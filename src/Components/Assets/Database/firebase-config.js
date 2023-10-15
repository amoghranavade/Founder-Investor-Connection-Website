// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from 'firebase/firestore';
import { getAuth, RecaptchaVerifier } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "YOUR-API",
  authDomain: "YOUR-API",
  projectId: "YOUR-API",
  storageBucket: "YOUR-API",
  messagingSenderId: "YOUR-API",
  appId: "YOUR-API",
  measurementId: "YOUR-API"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
// export const captcha = new RecaptchaVerifier(app);
export const db = getFirestore(app)
export const storage = getStorage(app);
export default app;
