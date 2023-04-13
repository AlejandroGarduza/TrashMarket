import {
    getDocs,
    where,
    query,
    postRef,
    deletePost,
    updatePost} from '../js/firebase.js';
    
    var estadoEditar = false;

    let id = "";
    
    const titulo = document.getElementById("datos-post");

    const cuerpo = document.getElementById("cuerpoPost");
    
    const media = document.getElementById("mediaPost");

    taskForm.addEventListener("submit", async (e) => {
        e.preventDefault();
      
        const url = await subirArchivo(taskForm["fileInput"].files[0]);

      });

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
          <button class='btn-editar' data-id="${doc.id}"><i class="fa-solid fa-pencil"></i></button>
            <br/><br/>
          <p style="margin-left: 40px; margin-right: 40px; text-align: justify;">${post.descripcion}</p>
          <button class='btn-editar' data-id="${doc.id}"><i class="fa-solid fa-pencil"></i></button>
            <br/><br/>
          
          <button class='btn-eliminar' data-id="${doc.id}"><i class="fa-solid fa-trash"></i>Eliminar Post</button>
              `;
        });
        titulo.innerHTML = html;

        const btnEliminar = titulo.querySelectorAll(".btn-eliminar");

        btnEliminar.forEach((btn) => {
            btn.addEventListener("click", ({ target: { dataset } }) => {
            deletePost(dataset.id);
            console.log(dataset.id);
            });
        });

        //Cargar imagen desde la bd
        
        let htmlImagen = "";

        htmlImagen += `
            
            <img class="img-fluid" src="${mediaDB}"/>
            
            `;
        media.innerHTML = htmlImagen;

    });