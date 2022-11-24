
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCEiXn022yoj9zrEyDKQLZYOdJsOlDi-hg",
    authDomain: "nft-swap-d92bf.firebaseapp.com",
    projectId: "nft-swap-d92bf",
    storageBucket: "nft-swap-d92bf.appspot.com",
    messagingSenderId: "114771549789",
    appId: "1:114771549789:web:cdd9e3dc27d8b0596377b4",
    measurementId: "G-PEHSHFCYPD"
  };
  const app = initializeApp(firebaseConfig);
 export const db = getFirestore(app);

