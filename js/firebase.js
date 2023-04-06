  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-analytics.js";
  import { collection, getFirestore, addDoc } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";
  import { getStorage, ref, uploadBytes, getDownloadURL} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-storage.js";
  import {v4} from "https://jspm.dev/uuid";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyA86pU7UjqYf0WONz6Q92BhViGt1HXuEs0",
    authDomain: "trashmarket-e84ca.firebaseapp.com",
    projectId: "trashmarket-e84ca",
    storageBucket: "trashmarket-e84ca.appspot.com",
    messagingSenderId: "887542065701",
    appId: "1:887542065701:web:5851d2d820721b51ecedcc",
    measurementId: "G-GB1CL61E5K"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  const db= getFirestore();

  export const storage = getStorage(app);

  


  export const saveTask = (title, description, url) =>{
    addDoc(collection(db, "post"),{
      titulo: title,
      descripcion: description,
      url : url
    })
  }

  


  export function uploadFile(file){
    var link;
    const storageRef = ref(storage, "post/" + v4());
    uploadBytes(storageRef, file).then(snapshot => {
      
        console.log(snapshot);
        getDownloadURL(snapshot.ref).then(url => {
          link = ""+url;
          console.log(link);
          return link;          
        })
      })
      console.log(link);
      return link;
}