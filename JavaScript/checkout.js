import {db , compraRef, getDocs, query, where} from './firebase.js'

import {
    doc,
    getDoc
  } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";

let consultaVenta;
let nombreP;
let urlIMG;

const ticket = document.getElementById("datos-ticket");
const nombreProducto = document.getElementById("nombrePorducto");
const imgProducto = document.getElementById("imgProducto");


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
    let html2 = "";
    //let mediaDB = "";
        
    querySnapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
      console.log(doc.id);
      const datosTicket = doc.data();
      console.log(doc.data());
      console.log(datosTicket);
      consultaVenta = datosTicket.venta;
      const fechaCompra = new Date(datosTicket.fecha);
      const dia = fechaCompra.getDate();
      const mes = fechaCompra.getMonth() + 1; // los meses van de 0 a 11 en JavaScript
      const anio = fechaCompra.getFullYear();
      const fechaFormateada = `${dia}/${mes}/${anio}`;

      let idPostVenta = datosTicket.venta;
      //mediaDB = post.url;

      html += `
      <label style="margin-left: 40px; margin-right: 40px; text-align: justify;">${"Cantidad: "+datosTicket.cantidad}</label>
      <label style="margin-left: 40px; margin-right: 40px; text-align: justify;">${"Total: "+datosTicket.total}</label>
      <label style="margin-left: 40px; margin-right: 40px; text-align: justify;">${"Fecha de Compra: "+new Date(datosTicket.fecha).toLocaleString()}</label>
      <label style="margin-left: 40px; margin-right: 40px; text-align: justify;">${"Referencia de Pago: "+datosTicket.refPago}</label> `;
    });
    ticket.innerHTML = html;

    //consulta por id
    const docId = consultaVenta;
    
    const docRef = doc(db, 'ventas', docId);

    

    getDoc(docRef).then((doc) => {
        if (doc.exists()) {
          console.log(doc.data().titulo);
          console.log('Datos del documento:', doc.data());
          nombreP = ""+doc.data().titulo;
          console.log(nombreP)
          urlIMG = ""+doc.data().url;
          html2 += `
      <h1 style="margin-left: 40px; margin-top: 5px; font-size: 50px;">Compra Realizada Exitosamente</h1>
      <h3 style="margin-left: 40px; margin-top: 5px;">Resumen del Pedido</h3>

      <label style="margin-left: 40px; margin-right: 40px; text-align: center;">${nombreP}</label>

      
          `;
          nombreProducto.innerHTML = html2;
          //Mostrar imagen
        let html3 = ` <img src="${urlIMG}" alt="" style="width: 100px; margin-left: 40px; margin-right: 40px; text-align: justify;">`;
        imgProducto.innerHTML = html3;
        } else {
          console.log('No se encontró el documento');
        }
        
      }).catch((error) => {
        console.error('Error al obtener el documento:', error);
      });

      

        

        


});