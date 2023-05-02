// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID,
} from "@env";

const firebaseConfig = {
  apiKey: "AIzaSyA-ZoTwCMHNYktWbj9SUpCUBKq_hGqk4zA",
  authDomain: "react-nativ-hw.firebaseapp.com",
  projectId: "react-nativ-hw",
  storageBucket: "react-nativ-hw.appspot.com",
  messagingSenderId: "80154841166",
  appId: "1:80154841166:web:12bfdcc66ce7b58547331f",
  measurementId: "G-9PE5MCF1W1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
