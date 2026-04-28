import { useState } from "react";
import API from "../services/api";
import ModalPrestamo from "./ModalPrestamo";

function ModalLibro({ libro, cerrar, recargar }) {

  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState(libro);
  const [mostrarPrestamo, setMostrarPrestamo] = useState(false);

  const cambiar = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const guardar = async () => {
    const data = new FormData();

    for (let key in form) {
      data.append(key, form[key]);
    }

    await API.put(`/libros/${libro.id}`, data);

    recargar();
    cerrar();
  };

  const eliminar = async () => {
    await API.delete(`/libros/${libro.id}`);
    recargar();
    cerrar();
  };

  const prestar = async (identidad) => {

    const data = new FormData();
    data.append("identidad", identidad);

    await API.post(`/libros/${libro.id}/prestar`, data);

    recargar();
    cerrar();
    };

  return (
    <div className="modal-fondo">
      <div className="modal">

        <button className="cerrar" onClick={cerrar}>X</button>

        <img
          src={`http://127.0.0.1:8000/uploads/${libro.portada}`}
        />

        {!editando ? (
          <>
            <h2>{libro.titulo}</h2>
            <p>{libro.autor}</p>
            <p>{libro.categoria}</p>
            <p>{libro.anio_publicacion}</p>
            <p>{libro.ejemplares_disponibles}</p>

            <div className="acciones">
              <button onClick={() => setEditando(true)}>
                Editar
              </button>

              <button onClick={() => setMostrarPrestamo(true)}>
                Prestar
              </button>

              <button onClick={eliminar}>
                Eliminar
              </button>
            </div>
          </>
        ) : (
          <>
            <input name="titulo" value={form.titulo} onChange={cambiar}/>
            <input name="autor" value={form.autor} onChange={cambiar}/>
            <input name="categoria" value={form.categoria} onChange={cambiar}/>
            <input name="anio_publicacion" value={form.anio_publicacion} onChange={cambiar}/>
            <input name="ejemplares_disponibles" value={form.ejemplares_disponibles} onChange={cambiar}/>

            <button onClick={guardar}>
              Guardar cambios
            </button>
          </>
        )}

      </div>

        {mostrarPrestamo && (
        <ModalPrestamo
            cerrar={() => setMostrarPrestamo(false)}
            aceptar={prestar}
        />
        )}

    </div>
  );
}

export default ModalLibro;