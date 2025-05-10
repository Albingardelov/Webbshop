// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCjgpUSwcxlYobS-sQ4RPQlQ0i_4_Arl6k",
	authDomain: "albins-webbshop.firebaseapp.com",
	projectId: "albins-webbshop",
	storageBucket: "albins-webbshop.firebasestorage.app",
	messagingSenderId: "505857009036",
	appId: "1:505857009036:web:ad3f987b98aa422abb62a9"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app);

export { db, auth }



