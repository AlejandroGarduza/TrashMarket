import {
  getDocs,
  where,
  query,
  usuariosRef,
  deleteUsuario,
  updateUsuario,
  subirArchivo
} from "./firebase.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const correo = urlParams.get('id');

let id = "";

const perfilUsuario = document.getElementById("visualizar-usuario");

const imagenPerfil = document.getElementById("imagen-perfil");

const ultimasPublicacioesn = document.getElementById("articulos-recientes");

let urlImg = "";

window.addEventListener("DOMContentLoaded", async () => {
  
  console.log(correo)
  const consultaUsuario = query(
    usuariosRef,
    where("email", "==", correo)
  );
  const querySnapshot = await getDocs(consultaUsuario);

  let html = "";

  querySnapshot.forEach((doc) => {
    console.log(doc.id, "=>", doc.data());
    console.log(doc.id);
    const usuarios = doc.data();
    console.log(doc.data());
    console.log(perfilUsuario);
    html += `   
            <div id="info-usuario">
                <label for="nombre">Nombre:</label>
                <label class='editable' for="nombre">${usuarios.nombre}</label> 
                <label class='editable' for="apellido">${usuarios.apellido}</label>
                <br/><br/>
                <label>Correo:</label>
                <label class='editable' for="correo">${usuarios.email}</label>
                <br/><br/>
                <label>Telefono:</label>
                <label class='editable' for="telefono">${usuarios.telefono}</label>
                <br/><br/>
                <label for="direccion">Direccion:</label>   
                <label class='editable' for="calle">${usuarios.calle}</label>
                <label>#</label> 
                <label class='editable' for="num_exterior">${usuarios.num_exterior}</label>
                <label>C.P.</label>
                <label class='editable' for="codigo_postal">${usuarios.codigo_postal}</label>                
                <br/><br/>
                <label>Descripción:</label>
                <br/>
                <label class='editable' for="descripcion">${usuarios.descripcion}</label>
                <br/><br/>
            </div> 
        
        `;

        let htmlImagen = "";

        htmlImagen += `
          <img src="${usuarios.url}" class="imagen-perfil"  width="200px" height="200px" style="border-radius: 100%;"/>
          
          `;
        imagenPerfil.innerHTML = htmlImagen;
        
      
        let hmtlUltimasPublicaciones = "";
      
        hmtlUltimasPublicaciones += `
          <h1>Últimas publicaciones</h1>
      
          <div style="border: 5px; background-color: #EEEEEE;">
          <p> Escoba </p>
      
          </div>
          `;
        ultimasPublicacioesn.innerHTML = hmtlUltimasPublicaciones;
      

    });

  perfilUsuario.innerHTML = html;

});
