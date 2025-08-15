import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyBDEXHQ6OsBdKOeCL1NWytY88mBICnKkeI",
  authDomain: "finance-flow-auth.firebaseapp.com",
  projectId: "finance-flow-auth",
  storageBucket: "finance-flow-auth.firebasestorage.app",
  messagingSenderId: "352604781644",
  appId: "1:352604781644:web:7237bab5920036d3de88e9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;