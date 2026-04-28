function Ordenamiento({ ordenarLibros }) {
  return (
    <div>
      <select onChange={(e) => ordenarLibros(e.target.value)}>
        <option value="">Ordenar por...</option>
        <option value="titulo">Título</option>
        <option value="autor">Autor</option>
        <option value="anio_publicacion">Año</option>
        <option value="ejemplares_disponibles">Disponibles</option>
      </select>
    </div>
  );
}

export default Ordenamiento;