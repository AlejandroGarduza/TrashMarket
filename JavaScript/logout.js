import { signOut } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-auth.js";
import {auth} from './firebase.js'

const logout = document.querySelector('#logout-user');

logout.addEventListener('click', async () =>{
   await signOut(auth)
   console.log('signout')
})