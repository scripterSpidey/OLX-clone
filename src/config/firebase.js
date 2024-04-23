// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmlBqu9HYgG4dCNBEAxT6xQbyRkCw3M9I",
  authDomain: "olx-clone-a96d8.firebaseapp.com",
  projectId: "olx-clone-a96d8",
  storageBucket: "olx-clone-a96d8.appspot.com",
  messagingSenderId: "484412428233",
  appId: "1:484412428233:web:1031dec440ec3fc7662218",
  measurementId: "G-6SD52S90GJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);