import React, { useState, useEffect } from 'react';
import Formulario from './components/formulario';
import ListadoImagenes from './components/listadoImagenes';

function App() {

  const [busqueda, guardarBusqueda] = useState('');
  const [imagenes, guardarImagenes] = useState([]);
  const [paginaActual, guardarPaginaActual] = useState(1);
  const [totalPaginas, guardarTotalPaginas] = useState(1);

  useEffect(() => {
    const consultarApi = async () => {
      if(busqueda === '') return;
      const imagenesPorPagina = 30;
      const key = '21809242-f01bba5c17e682f81e56b9efe';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`;
      const res = await fetch(url);
      const val = await res.json();
      guardarImagenes(val.hits);
      const total = Math.ceil(val.totalHits / imagenesPorPagina);
      guardarTotalPaginas(total);
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({ behavior: 'smooth' });
    }
    consultarApi();
  }, [busqueda, paginaActual]);

  const paginaAnterior = () => {
    const nueva = paginaActual - 1;
    if(nueva === 0) return;
    guardarPaginaActual(nueva);
  }

  const paginaSiguiente = () => {
    const nueva = paginaActual + 1;
    if(nueva > totalPaginas) return;
    guardarPaginaActual(nueva);
  }

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
      {(paginaActual === 1) ? null : 
        <button 
          type="button"
          className="bbtn btn-info mr-1"
          onClick={paginaAnterior}
          > &laquo; Anterior
        </button>}
      {(paginaActual === totalPaginas) ? null :
        <button 
          type="button"
          className="bbtn btn-info"
          onClick={paginaSiguiente}>
           Siguiente &raquo; 
        </button>}
    </div>
  );
}

export default App;
