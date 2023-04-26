import {
    getDocs,
    where,
    query,
    postRef,
    deletePost,
    updatePost} from './firebase.js';

    let id = "";
    
    const titulo = document.getElementById("datos-post");

    const cuerpo = document.getElementById("cuerpoPost");
    
    const media = document.getElementById("mediaPost");
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const tituloPost = urlParams.get('id')
    console.log(urlParams)

    window.addEventListener("DOMContentLoaded", async () => {
        const consultaPost = query(
          postRef,
          where("titulo", "==", tituloPost)
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
              <div class="datosPost">
          <label class="editable" style="margin-left: 40px; margin-top: 5px; font-size: 50px;" for="titulo">${post.titulo}</label>
          
            <br/><br/>
          <label class="editableTF" style="margin-left: 40px; margin-right: 40px; text-align: justify;" for="descripcion">${post.descripcion}</label>
          <button style="margin-left: 90%" class='btn-editar' data-id="${doc.id}"><i class="fa-solid fa-pencil"></i>editar</button>
            <br/><br/>

            <div id="asignarImg" style="display: flex; justify-content: center; align-items: center;"></div>
          
          <button class='btn-eliminar' data-id="${doc.id}"><i class="fa-solid fa-trash"></i>Eliminar Post</button>
          <button class="btn-guardar" type="submit" style="display:none;">Guardar cambios</button>
          </div>

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

        const btnEditar = titulo.querySelectorAll(".btn-editar");
        btnEditar.forEach((btn) => {
        btn.addEventListener("click", (e) => {
      
        e.target.style.display = 'none';

        // mostrar botón de guardar cambios
        const btnGuardar = document.createElement('button');
        //btnGuardar.type = 'submit'
        btnGuardar.classList.add('btn-guardar');
        btnGuardar.textContent = 'Guardar cambios';
        e.target.parentNode.appendChild(btnGuardar);


        const editableLabels = titulo.querySelectorAll(".editable");
        editableLabels.forEach((label) => {
          const input = document.createElement("input");
          input.type = "text";
          input.value = label.textContent;
          //input.dataset.originalValue = input.value; // Guarda el valor original para poder restaurarlo después si se cancela la edición
          input.id = `${label.getAttribute("for")}-input`;
          label.parentNode.replaceChild(input, label);

          //estadoEditar = true
          id =  e.target.dataset.id;
          console.log("Si llego a btnEditar")
      });


      const editableTA = titulo.querySelectorAll(".editableTF");
      editableTA.forEach((label) => {
        const textarea = document.createElement("textarea");
        textarea.value = label.textContent;
        textarea.rows = 12;
        textarea.cols = 100;
        //textarea.dataset.originalValue = textarea.value; // Guarda el valor original para poder restaurarlo después si se cancela la edición
        textarea.id = `${label.getAttribute("for")}-input`;
        label.parentNode.replaceChild(textarea, label);

        //estadoEditar = true
        id =  e.target.dataset.id;
        console.log("Si llego a btnEditar")
      });
    });
  });

        //Cargar imagen desde la bd
        
        let htmlImagen = "";
        const selectImg = document.getElementById("asignarImg");
        

        htmlImagen += `
            
            <img class="img-fluid" src="${mediaDB}"/>
            
            `;
        selectImg.innerHTML = htmlImagen;

        titulo.addEventListener('click', (e) => {
          if (e.target.classList.contains('btn-guardar')) {
            // obtener los nuevos valores de los inputs
            const inputs = e.target.parentNode.querySelectorAll('input');
            const textareas = e.target.parentNode.querySelectorAll('textarea');
            console.log(inputs)
            
        
            const tituloInput = document.getElementById("titulo-input")
            const descripcionInput = document.getElementById('descripcion-input');
            
        
            const nuevoTitulo = tituloInput.value;
            const nuevaDescripcion = descripcionInput.value;
            
            console.log(id);
        
            // actualizar los datos en la base de datos
            updatePost(id, {
              titulo: nuevoTitulo,
              descripcion: nuevaDescripcion
            });
        
            // volver a mostrar los labels con los nuevos valores
            inputs.forEach((input) => {
              const label = document.createElement('label');
              label.textContent = input.value;
              input.replaceWith(label);
            });

            textareas.forEach((textarea) => {
              const label = document.createElement('label');
              label.textContent = textarea.value;
              textarea.replaceWith(label);
            });
        
            // ocultar el botón de guardar cambios y mostrar el botón de editar
            const btnEditar = e.target.parentNode.querySelector('.btn-editar');
            btnEditar.style.display = 'inline-block';
            e.target.style.display = 'none';
          }
        });



    });
  