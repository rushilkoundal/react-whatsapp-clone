import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjAW57ZlxFw_u0CSwyVuz3q_ycKN9_kV4",
  authDomain: "whatsapp-clone-learning-cdd17.firebaseapp.com",
  projectId: "whatsapp-clone-learning-cdd17",
  storageBucket: "whatsapp-clone-learning-cdd17.appspot.com",
  messagingSenderId: "398998863293",
  appId: "1:398998863293:web:f5ae7ec0123fd97c97e6d4",
  measurementId: "G-1JXT2CY5BR"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;