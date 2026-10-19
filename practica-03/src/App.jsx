import { useState, useEffect } from 'react';
import Category from './Category';

function App() {
  const [categorias, setCategorias] = useState([]);

  useEffect(function() {
    fetch('/api/categoria')
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        setCategorias(data);
      });
  }, []);

  return (
    <div className="app-container">
      <h1>Mi app de cine</h1>
      {categorias.map(function(categoria) {
        return (
          <Category
            key={categoria.id}
            nombre={categoria.nombre}
            peliculas={categoria.peliculas}
          />
        );
      })}
    </div>
  );
}

export default App;
