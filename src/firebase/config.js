import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyCcwuWSvnj1nCi68uDiAICxqhYrR7so-sE",
    authDomain: "flipgame-9230f.firebaseapp.com",
    projectId: "flipgame-9230f",
    storageBucket: "flipgame-9230f.appspot.com",
    messagingSenderId: "150049355687",
    appId: "1:150049355687:web:24ca377a10b9fb6972e882"
  };

//init firebase app
const app = initializeApp(firebaseConfig);

//init firebase storage
const db = getFirestore(app);

//init firebase authentification
const auth = getAuth(app)

export {db, auth}