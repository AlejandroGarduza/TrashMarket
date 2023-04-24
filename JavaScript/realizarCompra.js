import {
    getDocs,
    where,
    query,
    postVentaRef} from './firebase.js';

    let id = "";
    let inventarioString = "";
    let inventarioInt = 0;
    
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

            inventarioString = postVenta.cantidad;
            inventarioInt = parseInt(inventarioString);

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
            
            <br><br>

            <label style="margin-left: 40px;">Seleccione la cantidad que desea</label>
            <div><button id="disminuir" style="width: 40px; display: inline-block; margin-left: 80px;">-</button>
              <label>  </label> <label id="contador-Cantidad" style="display: inline-block;">0</label> <label>  </label>
            <button id="incrementar" style="width: 40px; display: inline-block;">+</button></div>

            <div>
              <button id="comprar" style="margin-left: 1380px;">Comprar</button>
            </div>
            <br><br>
            </div>

        
            `;
      });   
     

      datos.innerHTML = html;

        //Cargar imagen desde la bd
        
        let htmlImagen = "";
        const selectImg = document.getElementById("asignarImg");
        
  
        htmlImagen += `
            
        <img class="img-fluid" src="${mediaDB}" width="250">
                    
            `;
        selectImg.innerHTML = htmlImagen;


        //Botones de incrementar y disminuir cantidad
        let contador = 0;
        const incrementar = document.getElementById("incrementar");
        const disminuir = document.getElementById("disminuir");
        const contadorCantidad = document.getElementById("contador-Cantidad");

        incrementar.addEventListener("click", () => {
            if (contador < inventarioInt) {
                contador++;
                contadorCantidad.innerHTML = contador;
            }
            }
        );

        disminuir.addEventListener("click", () => {
            if (contador > 0) {
                contador--;
                contadorCantidad.innerHTML = contador;
            }
            }
        );

        //Boton de comprar
        const comprar = document.getElementById("comprar");

        comprar.addEventListener("click", () => {
            if (contador > 0) {
                realizarPago();
            }
            else {
                alert("No ha seleccionado ninguna cantidad");
            }
        }
        );


        function realizarPago() {
            console.log("realizar pago");
          
            // Crea un objeto de preferencia
            var preference = {
              items: [
                {
                  title: 'Producto de ejemplo',
                  unit_price: 100,
                  quantity: 1
                }
              ]
            };
          
            // Verifica si la librería de MercadoPago está cargada
            if (typeof window.Mercadopago !== 'undefined') {
              // Inicializa el SDK de MercadoPago
              window.Mercadopago.setPublishableKey('TEST-8233478592533435-042400-01492d02dd1efee60e1a60a4f5fca5e5-198871915');
          
              // Crea la preferencia de pago
              window.Mercadopago.createPreference(preference, function(response) {
                console.log(response);
              });
            } else {
              // Si la librería de MercadoPago no está cargada, muestra un mensaje de error
              alert('La librería de MercadoPago no se ha cargado correctamente.');
            }
          }
    });