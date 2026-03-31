// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace this with your actual Firebase project configuration!
// 1. Go to Firebase Console: https://console.firebase.google.com/
// 2. Create a new project or select an existing one
// 3. Add a Web App to your project
// 4. Copy the firebaseConfig object below
const firebaseConfig = {
  apiKey: "AIzaSyDA1QkFKccnWRu7RAqKS96T9CBC4o9dyoM",
  authDomain: "portfolio-c1d71.firebaseapp.com",
  projectId: "portfolio-c1d71",
  storageBucket: "portfolio-c1d71.firebasestorage.app",
  messagingSenderId: "19355524828",
  appId: "1:19355524828:web:7215066cbe7007aaeb5e19",
  measurementId: "G-H3TWZ56B4M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
