// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmo2lY1FYGdW2n3B8-QJdEIZnvgX6XY_E",
  authDomain: "activa-tu-paz.firebaseapp.com",
  projectId: "activa-tu-paz",
  storageBucket: "activa-tu-paz.firebasestorage.app",
  messagingSenderId: "1039317386150",
  appId: "1:1039317386150:web:f5637add516da864cd4567"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
