import React, { useState, useEffect } from 'react';
import Formulario from './components/formulario';
import ListadoImagenes from './components/listadoImagenes';

function App() {

  const [busqueda, guardarBusqueda] = useState('');
  const [imagenes, guardarImagenes] = useState([]);

  useEffect(() => {
    const consultarApi = async () => {
      if(busqueda === '') return;
      const imagenesPorPagina = 30;
      const key = '21809242-f01bba5c17e682f81e56b9efe';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}`;
      const res = await fetch(url);
      const val = await res.json();
      guardarImagenes(val.hits);
    }
    consultarApi();
  }, [busqueda]);

  return (
    <div className = "container">
      <div className = "jumbotron">
        <p className = "lead text-center">Buscador de imágenes</p>
        <Formulario 
          guardarBusqueda={guardarBusqueda}
          />
      </div>
      <div className="row justify-content-center">
        <ListadoImagenes imagenes={imagenes} />
      </div>
    </div>
  );
}

export default App;
