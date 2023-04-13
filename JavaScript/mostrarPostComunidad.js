import {postRef, getDocs} from './firebase.js'

const publicacionesContenedor = document.getElementById('publicaciones-contenedor');

// Obtén los documentos de la colección de publicaciones
getDocs(postRef).then((querySnapshot) => {
	querySnapshot.forEach((doc) => {
		// Obtén los datos del documento
		const docData = doc.data();

		// Crea un nuevo elemento div para la publicación
		const publicacionDiv = document.createElement('div');
		publicacionDiv.classList.add('publicacion');

		// Agrega el título y el extracto de la publicación al div
		publicacionDiv.innerHTML = `
				<h2>${docData.titulo}</h2>
				<p>${docData.descripcion}</p>
			`;

		// Agrega un controlador de eventos al div para redirigir al usuario a la página de la publicación
		publicacionDiv.addEventListener('click', () => {
			window.location.replace(`visualizarPost.html?id=${doc.id}`);
		});


		// Agrega el div al contenedor de publicaciones
		publicacionesContenedor.appendChild(publicacionDiv);
	});
}).catch((error) => {
	console.log(error);
});