import {usuariosRef, where, getDocs, query} from './firebase.js'
   
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const searchTerm = urlParams.get('id')

    const q = query(usuariosRef, where("nombre", "==", searchTerm));
    
    const busquedas = document.getElementById('resultados-busqueda')

    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());


        const docData = doc.data();

        const publicacionDiv = document.createElement('div');
		publicacionDiv.classList.add('publicacion')
        
		publicacionDiv.innerHTML = `
        <div class="d-flex flex-wrap align-items-center">
            <div class="col-md-2">
                <img class="img-perfil" src="${docData.url}">
            </div>
            <div class="col-md-10">
                <h2>${docData.nombre} ${docData.apellido}</h2>
                <p>${docData.descripcion}</p>
            </div>
        </div>

		`;

        busquedas.appendChild(publicacionDiv)

        publicacionDiv.addEventListener('click', () => {
			window.location.replace(`vista-otro-usuario.html?id=${docData.email}`);

		});
      });

      

    }).catch((error) => {
      console.log("Error:", error);
    });
