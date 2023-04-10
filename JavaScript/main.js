import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-auth.js";
import {auth } from './firebase.js'
import {loginCheck} from './loginCheck.js'

//import './login.js'
import './logout.js'
//import './registro.js'

onAuthStateChanged(auth, async (user) => {
    if(user){
        loginCheck(user)
    }else{
        loginCheck(user)
    }
})
