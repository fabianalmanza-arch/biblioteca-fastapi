import { useState } from "react";

function ModalPrestamo({ cerrar, aceptar }) {

  const [identidad, setIdentidad] = useState("");

  return (
    <div className="modal-fondo">
      <div className="modal mini">

        <h2>Prestar Libro</h2>

        <input
          placeholder="Ingrese identidad"
          value={identidad}
          onChange={(e) => setIdentidad(e.target.value)}
        />

        <div className="acciones">
          <button onClick={cerrar}>Cancelar</button>

          <button
            onClick={() => aceptar(identidad)}
          >
            Aceptar
          </button>
        </div>

      </div>
    </div>
  );
}

export default ModalPrestamo;