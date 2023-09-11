// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import {getFirestore, collection, getDocs} from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAqHTRcetmyfkZ5FPh5lVvoC9xe8qqEgk8',
  authDomain: 'chat-app-ab3bf.firebaseapp.com',
  projectId: 'chat-app-ab3bf',
  storageBucket: 'chat-app-ab3bf.appspot.com',
  messagingSenderId: '327770792817',
  appId: '1:327770792817:web:ec0428ad393434b27b8cd0',
  measurementId: 'G-DDJP91CN0K',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

