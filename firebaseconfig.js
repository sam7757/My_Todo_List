// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-analytics.js";
import { getFirestore,
         collection,
         addDoc,
         getDocs,
         deleteDoc,
         doc,
         updateDoc } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhjf-c7cnXXTyqS8a3s1xVUN9xrVqEoGY",
  authDomain: "my-todo-list-b7a2a.firebaseapp.com",
  projectId: "my-todo-list-b7a2a",
  storageBucket: "my-todo-list-b7a2a.firebasestorage.app",
  messagingSenderId: "740580671628",
  appId: "1:740580671628:web:785727f2777cbbac597ba9",
  measurementId: "G-FPSPX8GX0Y"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)
export { db, collection, getDocs, addDoc, deleteDoc, updateDoc, doc }