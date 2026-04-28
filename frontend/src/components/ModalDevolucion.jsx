import { useEffect, useState } from "react";
import API from "../services/api";
import ModalConfirmacion from "./ModalConfirmacion";

function ModalDevolucion({ cerrar, recargar }) {

  const [lista, setLista] = useState([]);
  const [texto, setTexto] = useState("");
  const [seleccionado, setSeleccionado] = useState(null);

  useEffect(() => {
    cargar();
  }, []);

  const cargar = async () => {
    const res = await API.get("/prestamos");
    setLista(res.data);
  };

  const devolver = async () => {

    const data = new FormData();
    data.append("identidad", seleccionado.identidad);

    await API.post(
        `/libros/${seleccionado.id}/devolver`,
        data
    );

    recargar();
    cerrar();
    };

  const filtrados = lista.filter((x) =>
    x.titulo.toLowerCase().includes(texto.toLowerCase())
  );

  return (
    <div className="modal-fondo">
      <div className="modal">

        <button className="cerrar" onClick={cerrar}>X</button>

        <h2>Devoluciones</h2>

        <input
          placeholder="Buscar libro..."
          onChange={(e) => setTexto(e.target.value)}
        />

        {filtrados.map((item, i) => (
          <div key={i} className="fila-prestamo">

            <p>{item.titulo}</p>
            <p>{item.identidad}</p>

            <button onClick={() => setSeleccionado(item)}>
                Devolver
            </button>

          </div>
        ))}

      </div>
      {seleccionado && (
        <ModalConfirmacion
            titulo="Confirmar devolución"
            mensaje={`¿Devolver ${seleccionado.titulo}?`}
            cerrar={() => setSeleccionado(null)}
            aceptar={devolver}
        />
        )}
    </div>
  );
}

export default ModalDevolucion;