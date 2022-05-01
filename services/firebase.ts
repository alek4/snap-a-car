// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDJ8dW7QC6BNSWUQ3s-T6eE7SnwzI84s_o",
  authDomain: "car-recog-app-a6379.firebaseapp.com",
  projectId: "car-recog-app-a6379",
  storageBucket: "car-recog-app-a6379.appspot.com",
  messagingSenderId: "905217656158",
  appId: "1:905217656158:web:d62eef4db0cca07471fbcf",
  measurementId: "G-68T70Q8PKT",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore();

export const storage = getStorage();
export default app;
