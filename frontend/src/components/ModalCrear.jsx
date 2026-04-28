import { useState } from "react";
import API from "../services/api";

function ModalCrear({ cerrar, recargar, categorias }) {

  const [form, setForm] = useState({});
  const [img, setImg] = useState(null);

  const cambiar = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const guardar = async (e) => {
    e.preventDefault();

    const data = new FormData();

    for (let key in form) {
      data.append(key, form[key]);
    }

    data.append("portada", img);

    await API.post("/libros", data);

    recargar();
    cerrar();
  };

  return (
    <div className="modal-fondo">

      <form className="modal" onSubmit={guardar}>

        <button
          type="button"
          className="cerrar"
          onClick={cerrar}
        >
          X
        </button>

        <h2>Nuevo Libro</h2>

        <input
          name="titulo"
          placeholder="Título"
          onChange={cambiar}
        />

        <input
          name="autor"
          placeholder="Autor"
          onChange={cambiar}
        />

        {/* SELECT */}
        <select
          name="categoria"
          onChange={cambiar}
          defaultValue=""
        >
          <option value="" disabled>
            Seleccione categoría
          </option>

          <option>Ingeniería</option>
          <option>Programación</option>
          <option>Desarrollo Web</option>
          <option>Python</option>
          <option>Electrónica</option>
          <option>Matemáticas</option>
          <option>Álgebra</option>
          <option>Cálculo</option>
          <option>Humanidades</option>
          <option>Historia</option>
        </select>

        <input
          name="anio_publicacion"
          placeholder="Año"
          onChange={cambiar}
        />

        <input
          name="total_ejemplares"
          placeholder="Total"
          onChange={cambiar}
        />

        <input
          name="ejemplares_disponibles"
          placeholder="Disponibles"
          onChange={cambiar}
        />

        <input
          type="file"
          onChange={(e) => setImg(e.target.files[0])}
        />

        <button type="submit">
          Guardar
        </button>

      </form>
    </div>
  );
}

export default ModalCrear;