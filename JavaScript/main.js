import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-auth.js";
import {auth } from './firebase.js'
import {loginCheck} from './loginCheck.js'

//import './login.js'
import './logout.js'
//import './registro.js'

const divTienda = document.getElementById('tienda')
const divComunidad = document.getElementById('comunidad')
const divPuntos = document.getElementById('puntosInt')

onAuthStateChanged(auth, async (user) => {
    if(user){
        loginCheck(user)
    }else{
        loginCheck(user)
    }
})

document.getElementById('search-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Evita que el formulario se envíe
    var searchTerm = document.getElementsByName('search')[0].value; // Obtiene el término de búsqueda
    window.location.href = 'resultados-busqueda.html?id=' + searchTerm; // Redirige a la página de resultados de búsqueda con los parámetros de búsqueda
  });

  divComunidad.addEventListener('click', () => {
    window.location.replace('./comunidad.html');
});

divTienda.addEventListener('click', () => {
    window.location.replace(`./tienda.html`);
});

divPuntos.addEventListener('click', () => {
    window.location.replace(`./puntosInt.html`);
});
  