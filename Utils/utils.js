import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";
import { getFirestore  ,
   setDoc ,
   doc ,
   addDoc ,
   getDoc ,
   getDocs ,
   deleteDoc ,
   collection ,
   query ,
   where ,
   updateDoc 
 } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";
import { getStorage ,
   ref ,
   uploadBytes ,
   getDownloadURL 
 } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-storage.js";
import { getAuth , 
   onAuthStateChanged , 
   createUserWithEmailAndPassword ,
   signInWithEmailAndPassword ,
   signOut } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

const firebaseConfig = {
   apiKey: "AIzaSyDmcdufQ6aznORzbHPTs_CUOs7PSRPqxeg",
   authDomain: "add-form-data.firebaseapp.com",
   projectId: "add-form-data",
   storageBucket: "add-form-data.appspot.com",
   messagingSenderId: "238751724776",
   appId: "1:238751724776:web:aed7d9f3f3a0312a3e455d",
   measurementId: "G-HF10J1TE8E"
   };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const storage = getStorage(app)
const db = getFirestore(app)




export{
   onAuthStateChanged ,
   auth ,
   createUserWithEmailAndPassword ,
   signInWithEmailAndPassword ,
   signOut ,
   getStorage ,
   storage , 
   ref ,
   uploadBytes ,
   getDownloadURL ,
   db ,
   setDoc ,
   doc ,
   getDoc ,
   getDocs ,
   collection ,
   addDoc ,
   deleteDoc ,
   query ,
   where ,
   updateDoc 
}