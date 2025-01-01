import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyDApOWg2yaVQsZoLEb-FrtNHEmVoGRDm2c",
  authDomain: "bistro-boss-73de8.firebaseapp.com",
  projectId: "bistro-boss-73de8",
  storageBucket: "bistro-boss-73de8.firebasestorage.app",
  messagingSenderId: "548730080287",
  appId: "1:548730080287:web:4010556d396dcf24f2592a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);