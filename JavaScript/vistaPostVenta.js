import {
    getDocs,
    where,
    query,
    postVentaRef,
    deletePostVenta} from './firebase.js';

    let id = "";
    
    const datos  = document.getElementById("datos-postVenta");

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const tituloPostVenta = urlParams.get('id');
    console.log(urlParams);

    window.addEventListener("DOMContentLoaded", async () => {
        const consultaPostVenta = query(
            postVentaRef,
          where("titulo", "==", tituloPostVenta)
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
      
            <label class="editable" style="margin-left: 40px; margin-right: 40px; text-align: justify;" for="price">${postVenta.pecio} mxn</label>
            <br><br>
      
            <label class="editable" style="margin-left: 40px; margin-right: 40px; text-align: justify;" for="cantidad">${postVenta.cantidad}</label>
      
              <br/><br/>
            <label class="editableTF" style="margin-left: 40px; margin-right: 40px; text-align: justify;" for="descripcion">${postVenta.descripcion}</label>
            <button style="margin-left: 90%" class='btn-editar' data-id="${doc.id}"><i class="fa-solid fa-pencil"></i>editar</button>
              <br/><br/>
      
              
            
            <button class='btn-eliminar' data-id="${doc.id}"><i class="fa-solid fa-trash"></i>Eliminar Post</button>
            <button class="btn-guardar" type="submit" style="display:none;">Guardar cambios</button>
            </div>

        
            `;
      });

      datos.innerHTML = html;

        const btnEliminar = document.querySelectorAll(".btn-eliminar");

        btnEliminar.forEach((btn) => {
            btn.addEventListener("click", ({ target: { dataset } }) => {
            deletePost(dataset.id);
            console.log(dataset.id);
            });
        });




        //continuación????




    });



    //Describir las entidades, cuales van a ser las entidades que se van a utilizar en el proyecto, que datos van a tener y que tipo de datos van a ser. (1 punto)
    //Describir el esquema
    //Clave-Valor
