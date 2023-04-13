import {saveUsuario, auth} from './firebase.js'
import {createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-auth.js";
import {mostrarMensaje} from './mensajeError.js'


window.addEventListener('DOMContentLoaded', () =>{
    console.log('works')
})

const formulario = document.getElementById('registro-usuario');


    formulario.addEventListener('submit', async e => {
        e.preventDefault();
    
        const authCorreo = formulario['correo'].value
        const authPassword = formulario['password'].value
        const nombre = formulario['nombre']
        const apellido =formulario['apellido']
        const correo = formulario['correo']
        const tel = formulario['telefono']
        const password = formulario['password']
        const calle = formulario['calle']
        const cp = formulario['cp']
        const numeroCasa = formulario['numeroCasa']
        const confirmacion = formulario['validar-password']

        if(confirmacion.value === password.value){
            saveUsuario(nombre.value, apellido.value, correo.value, tel.value, password.value, calle.value, cp.value,numeroCasa.value, "Escribe tu descripción aquí")
            formulario.reset()
        }else{
            console.log('Las contraseñas nos coinciden')
            mostrarMensaje("Las contraseñas nos coinciden", "error")
        }
    
        console.log(authCorreo, authPassword);
    
       try{
        const credenciales = await createUserWithEmailAndPassword(auth, authCorreo, authPassword)
        console.log(credenciales)
        mostrarMensaje("Bienvenido: " + nombre.value, "success")
       }catch(error){
        console.log(error.message)
        console.log(error.code)
    
        if(error.code === 'auth/email-already-in-use'){
            mostrarMensaje("Correo ya registrado", "error")
        }
        if(error.code === 'auth/invalid-email'){
            mostrarMensaje("Correo no valido", "error")
        }
        if(error.code === 'auth/weak-password'){
            mostrarMensaje("Contraseña demasiado debil", "error")
        }
       }  
        console.log('submiting')
    })
