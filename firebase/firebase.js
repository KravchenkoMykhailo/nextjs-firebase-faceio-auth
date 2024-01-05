// import * as firebase from "firebase";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCE3NlqiMm9hG2HyoT5YYCZ2myZ-b4AQfI",
  authDomain: "face-auth-db.firebaseapp.com",
  projectId: "face-auth-db",
  storageBucket: "face-auth-db.appspot.com",
  messagingSenderId: "325435693504",
  appId: "1:325435693504:web:a9725b5317226027ddd025",
  measurementId: "G-LQDFR85214",
};

const app = initializeApp(firebaseConfig);
// const storage = firebase.storage();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage();

// export { storage };
