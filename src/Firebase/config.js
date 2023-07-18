import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
//import 'firebase/firebase-app'
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCevIRaF4Hci2L7JWfWtqyYOWXh9ouUt-0",
  authDomain: "fir-e34e3.firebaseapp.com",
  projectId: "fir-e34e3",
  storageBucket: "fir-e34e3.appspot.com",
  messagingSenderId: "30313204020",
  appId: "1:30313204020:web:33a11387c541819de37d61",
  measurementId: "G-DL1HWQ53EW"
};

export default firebase.initializeApp(firebaseConfig)