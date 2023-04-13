import {
    getDocs,
    where,
    query,
    postRef,
    getPost} from '../js/firebase.js';
    
    var estadoEditar = false;

    let id = "";
    
    const titulo = document.getElementById("datos-post");

    const cuerpo = document.getElementById("cuerpoPost");
    
    const media = document.getElementById("mediaPost");

    const postId = new URLSearchParams(window.location.search).get('id');
    console.log(postId)

    window.addEventListener("DOMContentLoaded", async () => {
        const consultaPost = query(
          postRef,
          where("titulo", "==", "Como reciclar pet")
        );
        const querySnapshot = await getDocs(consultaPost);
      
        let html = "";
        let mediaDB = "";
            
        querySnapshot.forEach((doc) => {
          console.log(doc.id, "=>", doc.data());
          console.log(doc.id);
          const post = doc.data();
          console.log(doc.data());
          console.log(titulo);
          mediaDB = post.url;

          html += `
              
          <h1 style="margin-left: 40px; margin-top: 5px;">${post.titulo}</h1>
          <p style="margin-left: 40px; margin-right: 40px; text-align: justify;">${post.descripcion}</p>
              `;
        });
        titulo.innerHTML = html;
        
        let htmlImagen = "";

        htmlImagen += `
            
            <img class="img-fluid" src="${mediaDB}"/>
            
            `;
        media.innerHTML = htmlImagen;

    });