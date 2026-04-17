import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAAiQgJplpFUkvFPayWIlgI5q2eEBmYNew",
    authDomain: "bdprovabancodedados.firebaseapp.com",
    databaseURL: "https://bdprovabancodedados-default-rtdb.firebaseio.com",
    projectId: "bdprovabancodedados",
    storageBucket: "bdprovabancodedados.firebasestorage.app",
    messagingSenderId: "840327759580",
    appId: "1:840327759580:web:19eabd8e9ac4f77ffd9619"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);