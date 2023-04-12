// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  getDocs,
  collection,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1F3Rk7f_2RZ8s44DZ7j-Qlvuf2DNbqBA",
  authDomain: "countries-lessons.firebaseapp.com",
  projectId: "countries-lessons",
  storageBucket: "countries-lessons.appspot.com",
  messagingSenderId: "88592485096",
  appId: "1:88592485096:web:f1c8d3122927f894c3d75d",
  measurementId: "G-VJSXY6T8Q6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const logInWithEmailAndPassowrd = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.log(err);
    alert(err.message);
  }
};

const customSignInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    const q = query(collection(db, "users"), where("role", "==", "ADMIN"));
    const docs = await getDocs(q);
  } catch (err) {
    console.log(err);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.log(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  logInWithEmailAndPassowrd,
  registerWithEmailAndPassword,
  logout,
};
