import {
    getDocs,
    where,
    query,
    postVentaRef,
    deletePostVenta,
    updatePostVenta} from './firebase.js';

    let id = "";
    
    const datos  = document.getElementById("datos-postVenta");

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const tituloPostVenta = urlParams.get('id');
    console.log(urlParams);

    window.addEventListener("DOMContentLoaded", async () => {
        const consultaPostVenta = query(
            postVentaRef,
            where("titulo", "==", "Botella Aplanada (Derretida)")
        );
        const querySnapshot = await getDocs(consultaPostVenta);
      
        let html = "";
        let mediaDB = "";

        querySnapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data());
            console.log(doc.id);
            const postVenta = doc.data();
            console.log(doc.data());
            console.log(datos);
            mediaDB = postVenta.url;

            html += `
            
            <div class="datosPostVenta">
            <label class="editable" style="margin-left: 40px; margin-top: 5px; font-size: 50px;" for="titulo">${postVenta.titulo}</label>
            <br><br>
      
            <div id="asignarImg" style="display: flex; justify-content: center; align-items: center;"></div>
      
            <br><br>
      
            <label class="editable" style="font-size: 37px; margin-left: 40px; margin-right: 40px; text-align: justify;" for="price">$${postVenta.precio} mxn</label>
            <br><br>
      
            <label class="editable" style="margin-left: 1300px; margin-right: 40px; text-align: justify;" for="cantidad">${postVenta.cantidad} disponibles</label>
      
              <br/><br/>
              <p style="margin-left: 40px;">Descripcion</p>
            <label class="editableTF" style="margin-left: 40px; margin-right: 40px; text-align: justify;" for="descripcion">${postVenta.descripcion}</label>
            <button style="margin-left: 90%" class='btn-editar' data-id="${doc.id}"><i class="fa-solid fa-pencil"></i>editar</button>
              <br/><br/>
      
              
            
            <button class='btn-eliminar' data-id="${doc.id}"><i class="fa-solid fa-trash"></i>Eliminar Post</button>
            <button class="btn-guardar" type="submit" style="display:none;">Guardar cambios</button>
            </div>

          <div>
            <button class="btn-conversacion" data-id="${doc.id}">Iniciar convesación</button>         
          </div>

        
            `;             
      });

      

      
      

      datos.innerHTML = html;

        const btnEliminar = document.querySelectorAll(".btn-eliminar");

        btnEliminar.forEach((btn) => {
            btn.addEventListener("click", ({ target: { dataset } }) => {
                deletePostVenta(dataset.id);
            console.log(dataset.id);
            });
        });
        
        const btnConversacion = datos.querySelectorAll('.btn-conversacion');

        btnConversacion.forEach((btn) =>{
          btn.addEventListener('click',({ target: { dataset } }) => {
            window.location.replace(`chat.html?id=${dataset.id}`);
          }); 
        })
        
        

        //continuación????

        //Cargar imagen desde la bd
        
        let htmlImagen = "";
        const selectImg = document.getElementById("asignarImg");
        
  
        htmlImagen += `
            
        <img class="img-fluid" src="${mediaDB}" width="250">
            
            `;
        selectImg.innerHTML = htmlImagen;

        //Editar post

        const btnEditar = datos.querySelectorAll(".btn-editar");
        btnEditar.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            
        console.log("Si llego a btnEditar")
        e.target.style.display = 'none';

        // mostrar botón de guardar cambios
        const btnGuardar = document.createElement('button');
        //btnGuardar.type = 'submit'
        btnGuardar.classList.add('btn-guardar');
        btnGuardar.textContent = 'Guardar cambios';
        e.target.parentNode.appendChild(btnGuardar);


        const editableLabels = datos.querySelectorAll(".editable");
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

      const editableTA = datos.querySelectorAll(".editableTF");
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


  //Guardar cambios de editar post venta

  datos.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-guardar')) {
      // obtener los nuevos valores de los inputs
      const inputs = e.target.parentNode.querySelectorAll('input');
      const textareas = e.target.parentNode.querySelectorAll('textarea');
      console.log(inputs)
      
  
      const tituloInput = document.getElementById("titulo-input");
      const precioInput = document.getElementById('price-input');
      const cantidadInput = document.getElementById('cantidad-input');
      const descripcionInput = document.getElementById('descripcion-input');
      
      
  
      const nuevoTitulo = tituloInput.value;
      const nuevoPrecio = precioInput.value;
      const nuevaCantidad = cantidadInput.value;
      const nuevaDescripcion = descripcionInput.value;
      
      console.log(id);
  
      // actualizar los datos en la base de datos
      updatePostVenta(id, {
        titulo: nuevoTitulo,
        precio: nuevoPrecio,
        cantidad: nuevaCantidad,
        descipcion: nuevaDescripcion
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



    //Describir las entidades, cuales van a ser las entidades que se van a utilizar en el proyecto, que datos van a tener y que tipo de datos van a ser. (1 punto)
    //Describir el esquema
    //Clave-Valor
