import { initializeApp } from "firebase/app";
import firebaseConfig from './firebase.config'

const initional =() =>{
    initializeApp(firebaseConfig);
}

export default initional ;