import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: "nascon-app-22713.firebaseapp.com",
    projectId: "nascon-app-22713",
    storageBucket: "nascon-app-22713.appspot.com",
    messagingSenderId: "1027768022565",
    appId: "1:1027768022565:web:7c3d5e517c9ba809b2f1cc",
    measurementId: "G-XE4QVSP2E8"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
