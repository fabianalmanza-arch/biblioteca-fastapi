// Recibe texto, actualizar texto y función buscar
function Busqueda({ texto, setTexto, buscarLibros }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Buscar libro..."
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />

      <button onClick={buscarLibros}>
        Buscar
      </button>
    </div>
  );
}

export default Busqueda;