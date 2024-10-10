document.addEventListener("DOMContentLoaded", function() {
    const inputBuscar = document.getElementById("inputBuscar");
    const btnBuscar = document.getElementById("btnBuscar");
    const contenedor = document.getElementById("contenedor");

    function buscarImagenes() {
      const busqueda = inputBuscar.value.trim();
      if (busqueda === "") {
        alert("Buscar imagen");
        return;
      }

const url= `https://images-api.nasa.gov/search?q=${encodeURIComponent(busqueda)}`;


fetch(url)
    .then(response => response.json())
    .then(data => {
        // Limpia el contenedor antes de buscar nuevas img.
       contenedor.querySelectorAll('.col-md-4').forEach(plantillaImagen => {
        if (!plantillaImagen.classList.contains('plantilla-tarjeta')) {
            plantillaImagen.remove();
        }
       });

       const imagenes = data.collection.items;

       if (imagenes.length === 0) {
        contenedor.innerHTML = "<p>No se encontraron resultados.</p>";
        return;
       }

    imagenes.forEach(item => {
        const imgagenUrl = item.links ? item.links[0].href : 'placeholder.jpg';
        const titulo = item.data[0].title || 'Sin título'; 
        const descripcion = item.data[0].description || 'Sin descripción';
        const fecha = item.data[0].date_created || 'Fecha no disponible';

        const plantillaImagen = document.querySelector(".plantilla-tarjeta").cloneNode(true);
        plantillaImagen.classList.remove('d-none', "plantilla-tarjeta");

        plantillaImagen.querySelector('.card-img-top').src = imgagenUrl; // Imagen.
        plantillaImagen.querySelector('.card-title').textContent = titulo; // Título.
        plantillaImagen.querySelector('.card-text').textContent = descripcion; //Descripción.
        plantillaImagen.querySelector('.text-muted').textContent = `Fecha: ${fecha}`; // Fecha.

        contenedor.appendChild(plantillaImagen);
    });
})

   .catch(error => {
       console.error("Error al cargar los datos", error);
 });
}

btnBuscar.addEventListener("click", buscarImagenes);

});