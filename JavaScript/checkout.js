import {compraRef, getDocs, query, where} from './firebase.js'

const ticket = document.getElementById("datos-ticket");

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const refP = ""+urlParams.get('id');
    console.log(urlParams);

window.addEventListener("DOMContentLoaded", async () => {
    const consultaCompra = query(
      compraRef,
      where("refPago", "==", refP)
      );
    const querySnapshot = await getDocs(consultaCompra);
    

  
    let html = "";
    //let mediaDB = "";
        
    querySnapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
      console.log(doc.id);
      const datosTicket = doc.data();
      console.log(doc.data());
      console.log(datosTicket);

      let idPostVenta = datosTicket.venta;
      //mediaDB = post.url;

      

      

      html += `
      <h1 style="margin-left: 40px; margin-top: 5px; font-size: 50px;">Compra Realizada Exitosamente</h1>
      <h3 style="margin-left: 40px; margin-top: 5px;">Resumen del Pedido</h3>

      <label style="margin-left: 40px; margin-right: 40px; text-align: justify;">${datosTicket.venta}</label>
      <label style="margin-left: 40px; margin-right: 40px; text-align: justify;">${datosTicket.cantidad}</label>
      <label style="margin-left: 40px; margin-right: 40px; text-align: justify;">${datosTicket.total}</label>
      <label style="margin-left: 40px; margin-right: 40px; text-align: justify;">${datosTicket.fecha}</label>
      <label style="margin-left: 40px; margin-right: 40px; text-align: justify;">${datosTicket.refPago}</label>
      <label style="margin-left: 40px; margin-right: 40px; text-align: justify;">Imagen</label>

      
          `;
    });
    ticket.innerHTML = html;

    //Cargar imagen desde la bd
    
    //let htmlImagen = "";
   // const selectImg = document.getElementById("asignarImg");
    

    /*htmlImagen += `
        
        <img class="img-fluid" src="${mediaDB}"/>
        
        `;
    //selectImg.innerHTML = htmlImagen; */

});