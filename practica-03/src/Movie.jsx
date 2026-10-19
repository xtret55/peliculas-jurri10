import { useState } from 'react';

function Movie(props) {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="movie-card">
      <h3>{props.nombre}</h3>
      {showInfo && (
        <div className="movie-details">
          <p><strong>Año:</strong> {props.anyo}</p>
          <p><strong>Actores:</strong> {props.actores.map(function(actor) {
            return actor.nombre_completo;
          }).join(', ')}</p>
        </div>
      )}
      <button onClick={function() { setShowInfo(!showInfo); }}>
        {showInfo ? 'Menos información' : 'Más información'}
      </button>
    </div>
  );
}

export default Movie;
