import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAWtgC2-9XCBXl6UXGHSic9W7upEKUfyDo",
  authDomain: "foodsaver2-9a1b6.firebaseapp.com",
  projectId: "foodsaver2-9a1b6",
  storageBucket: "foodsaver2-9a1b6.firebasestorage.app",
  messagingSenderId: "743249313480",
  appId: "1:743249313480:web:c6d843dce24dd6f4392ffd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export database
export const db = getFirestore(app);
export const auth = getAuth(app);