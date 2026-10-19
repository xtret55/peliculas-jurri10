import Movie from './Movie';

function Category(props) {
  return (
    <div className="category-container">
      <h2>Categoría: {props.nombre}</h2>
      <div className="movies-row">
        {props.peliculas.map(function(pelicula) {
          return (
            <Movie
              key={pelicula.id}
              nombre={pelicula.nombre}
              anyo={pelicula.anyo_publicacion}
              actores={pelicula.actores}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Category;
