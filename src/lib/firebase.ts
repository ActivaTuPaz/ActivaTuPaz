import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDmo2lY1FYGdW2n3B8-QJdEIZnvgX6XY_E",
  authDomain: "activa-tu-paz.firebaseapp.com",
  projectId: "activa-tu-paz",
  storageBucket: "activa-tu-paz.firebasestorage.app",
  messagingSenderId: "1039317386150",
  appId: "1:1039317386150:web:f5637add516da864cd4567"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Instancias de los servicios
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
