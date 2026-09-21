console.log("Este es el script");

document.getElementById('boton-buscar').addEventListener('click', function() {
    const titulo = document.getElementById('buscador').value;
    const apiKey = '6748eca6';
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&t=${titulo}`;

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            const resultado = document.getElementById('resultado');
            
            if (datos.Response === "True") {
                resultado.innerHTML = `<strong>Director:</strong> ${datos.Director} <br> <strong>Año:</strong> ${datos.Year}`;
            } else {
                resultado.innerHTML = "Película no encontrada.";
            }
        })
});