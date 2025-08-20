import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEHzs0JJpJ7gOtwqMD4MwrQx4pAx_hW68",
  authDomain: "clone-25890.firebaseapp.com",
  projectId: "clone-25890",
  storageBucket: "clone-25890.firebasestorage.app",
  messagingSenderId: "800894657193",
  appId: "1:800894657193:web:3149f5eeb1f308859abfb8",
  measurementId: "G-B3YD8D0DK9",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Export services
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { db, auth };
