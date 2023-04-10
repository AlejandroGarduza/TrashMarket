import {
    getDocs,
    where,
    query,
    postRef,
    getPost} from '../js/firebase.js';
    
    var estadoEditar = false;

    let id = "";
    
    const titulo = document.getElementById("tituloPost");

    const cuerpo = document.getElementById("cuerpoPost");
    
    const media = document.getElementById("mediaPost");

    window.addEventListener("DOMContentLoaded", async () => {
        const consultaPost = query(
          postRef,
          where("titulo", "==", "Como reciclar pet")
        );
        const querySnapshot = await getDocs(consultaPost);
      
        let html = "";
            
        querySnapshot.forEach((doc) => {
          console.log(doc.id, "=>", doc.data());
          console.log(doc.id);
          const post = doc.data();
          console.log(doc.data());
          console.log(titulo);
          html += `
              
          <h1 style="margin-left: 40px; margin-top: 5px;">${post.titulo}</h1>
          <p style="margin-left: 40px; margin-right: 40px; text-align: justify;">${post.cuerpo}</p>
              `;
        });
        
        let htmlImagen = "";

        htmlImagen += `
            
            <img class="imagen-perfil"src="https://greenpaper.com/wp/wp-content/uploads/2022/03/tipos-de-reciclaje-imagen-destacada.jpg"/>
            
            `;
        media.innerHTML = htmlImagen;

    });