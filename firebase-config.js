// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCP6OjB_1KimSJ7Erh2fQT7AvnLIuj8Lfw",
  authDomain: "sincere-abode-327514.firebaseapp.com",
  projectId: "sincere-abode-327514",
  storageBucket: "sincere-abode-327514.appspot.com",
  messagingSenderId: "154728053327",
  appId: "1:154728053327:web:8d51e7dfe07a50f9da883a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// init services
const db = getFirestore();

// collection ref
const projectsColRef = collection(db, "projects");

// get collection data
const projectsDocs = getDocs(projectsColRef).then((snapshot) => snapshot.docs);

export { db, projectsDocs };