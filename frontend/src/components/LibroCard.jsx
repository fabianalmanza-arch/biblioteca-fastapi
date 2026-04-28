function LibroCard({ libro, onClick }) {
  return (
    <div className={`card ${libro.ejemplares_disponibles <= 0 ? "agotado" : ""}`}
    onClick={() => {
      if (libro.ejemplares_disponibles > 0) onClick();
    }}
    >

      {libro.ejemplares_disponibles <= 0 && (
        <div className="franja">AGOTADO</div>
      )}

      <img
        src={`http://127.0.0.1:8000/uploads/${libro.portada}`}
        alt=""
      />

      <h3>{libro.titulo}</h3>

      <div className="hover-info">
        <p>{libro.autor}</p>
        <p>{libro.categoria}</p>
      </div>

    </div>
  );
}

export default LibroCard;