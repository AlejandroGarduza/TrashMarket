import {
    getDocs,
    where,
    query,
    postVentaRef,
    guardarCompra,
    updatePostVenta} from './firebase.js';

import {v4} from "https://jspm.dev/uuid";

import{mostrarMensaje} from './mensajeError.js';

    let id = "";
    let inventarioString = "";
    let inventarioInt = 0; 
    let precio = 0;
    let venta;
    let total;
    let cantidad;
    let fecha;
    let refPago;
    let vendedor;
    let comprador = "" + localStorage.getItem("correo");
   
    
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
            precio = postVenta.precio;

            inventarioString = postVenta.cantidad;
            inventarioInt = parseInt(inventarioString);

            html += `
            
            <div class="datosPostVenta">
            <label class="editable" for="titulo">${postVenta.titulo}</label>
            <br><br>
      
            <div id="asignarImg"></div>
      
            <br><br>
      
            <label class="editable" for="price">$${postVenta.precio} mxn</label>
            <br><br>
      
            <label class="editable" for="cantidad">${postVenta.cantidad} disponibles</label>
      
              <br/><br/>
              <p>Descripcion</p>
            <label class="editableTF">${postVenta.descripcion}</label>
            
            <br><br>

            <label>Seleccione la cantidad que desea</label>
            <div><button id="disminuir">-</button>
              <label>  </label> <label id="contador-Cantidad">0</label> <label>  </label>
            <button id="incrementar">+</button></div>

            <div>
              <button id="comprar" class="btn-comprar" data-id="${doc.id}" data-vendedor="${postVenta.vendedor}">Comprar</button>
            </div>
            <br><br>
            </div>

            <div>
            <button class="btn-conversacion" data-id="${doc.id}">Iniciar convesación</button>         
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

        const btnConversacion = datos.querySelectorAll('.btn-conversacion');

        btnConversacion.forEach((btn) =>{
          btn.addEventListener('click',({ target: { dataset } }) => {
            window.location.replace(`chat.html?id=${dataset.id}`);
          }); 
        })

        //Boton de comprar
        const comprar = document.getElementById("comprar");

        comprar.addEventListener("click",({ target: { dataset } }) => {
            if (contador > 0) {
                
                venta = dataset.id;
                cantidad = contador;
                total = precio * cantidad;
                fecha = new Date();
                refPago = v4();
                vendedor = dataset.vendedor;

                guardarCompra(venta, cantidad, total, fecha, refPago, vendedor, comprador);
                

                //Actualizar inventario
                inventarioInt = inventarioInt - cantidad;
                updatePostVenta(venta, {cantidad: inventarioInt});

                setTimeout(function() {
                  window.location.replace(`checkout.html?id=${refPago}`);
                }, 2500);

                //window.location.replace(`checkout.html?id=${refPago}`);
            }
            else {
                mostrarMensaje("por favor seleccione una cantidad valida", "error");
            }
        }
        );

        /** 
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
          */

        
    });
    
