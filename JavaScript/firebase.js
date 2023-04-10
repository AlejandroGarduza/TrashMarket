
        // Import the functions you need from the SDKs you need
      
        import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
      
        import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-analytics.js";

        import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-auth.js"
      
        import { getFirestore, 
          collection,
          query,
          where, 
          addDoc,
          getDocs,
          getDoc,
          onSnapshot,
          deleteDoc,
          doc,
          updateDoc
        } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";
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
      
          appId: "1:887542065701:web:110e6ca398709669ecedcc",
      
          measurementId: "G-RE9T5N2LY2"
      
        };
      
      
        // Initialize Firebase
      
        const app = initializeApp(firebaseConfig);
      
        const analytics = getAnalytics(app);

        const db = getFirestore();  
        
        export const auth = getAuth(app);

        export const saveUsuario = (nombre, apellido, email, telefono, contraseña,calle, codigo_postal, num_exterior, descripcion) =>
          addDoc(collection(db,'usuarios'),
          {
            nombre,
            apellido,
            email,
            telefono,
            contraseña,
            calle,
            codigo_postal,
            num_exterior, 
            descripcion
        });  

        export const getUsuarios = () => getDocs(collection(db,'usuarios'))
        
        //export const getUsuario = id => getDoc(doc(db,'usuarios',id))

       /**  export const saveDir = (calle, codigo_postal, num_exterior)=>
        addDoc(collection(db,'direccion'),
        {
          calle,
          codigo_postal,
          num_exterior

        });
        */

        export const usuariosRef = collection(db,'usuarios')

        export {
          query,
          where,
          getDocs
        }

        export const onGetUsuario = (callback) => onSnapshot(collection(db,'usuarios'),callback)

        export const deleteUsuario = id => deleteDoc(doc(db,'usuarios',id))
        
        export const getUsuario = (id) => getDoc(doc(db,'usuarios',id))

        export const updateUsuario = (id, nuevosCampos) => updateDoc(doc(db,'usuarios',id ), nuevosCampos)
        

       
        

        
        
      