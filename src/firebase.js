import { initializeApp } from "firebase/app";
import {
        createUserWithEmailAndPassword,
        getAuth,
        signInWithEmailAndPassword, 
        signOut} from "firebase/auth";
import {
        addDoc,
        collection,
        getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";




const firebaseConfig = {
  apiKey: "AIzaSyArU77MTmOwvIbE9L_ErsA7bIrUs6HB5_M",
  authDomain: "netflix-clone-1c3f9.firebaseapp.com",
  projectId: "netflix-clone-1c3f9",
  storageBucket: "netflix-clone-1c3f9.appspot.com",
  messagingSenderId: "725043367653",
  appId: "1:725043367653:web:7dc2e86520c134331d8e0c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try {
    const res =  await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
    });    

} catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
        
    }
}

const login = async (email, password)=>{
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
        
    }
}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout};