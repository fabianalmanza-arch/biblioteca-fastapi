import { useState, useEffect } from "react";
import API from "../services/api";

function FormularioLibro({
  cargarLibros,
  libroEditar,
  setLibroEditar
}) {
  const [form, setForm] = useState({});
  const [imagen, setImagen] = useState(null);

  // Si seleccionan editar, llenar formulario
  useEffect(() => {
    if (libroEditar) {
      setForm(libroEditar);
    }
  }, [libroEditar]);

  // Capturar cambios
  const cambiar = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Guardar o editar
  const enviar = async (e) => {
    e.preventDefault();

    const data = new FormData();

    for (let key in form) {
      data.append(key, form[key]);
    }

    if (imagen) {
      data.append("portada", imagen);
    }

    try {

      // EDITAR
      if (libroEditar) {
        await API.put(`/libros/${form.id}`, data);
        alert("Libro actualizado");
      }

      // CREAR
      else {
        await API.post("/libros", data);
        alert("Libro creado");
      }

      setForm({});
      setLibroEditar(null);
      cargarLibros();

    } catch (error) {
      alert("Error al guardar");
    }
  };

  return (
    <form onSubmit={enviar}>

      <input
        name="id"
        placeholder="ID"
        value={form.id || ""}
        onChange={cambiar}
      />

      <input
        name="titulo"
        placeholder="Título"
        value={form.titulo || ""}
        onChange={cambiar}
      />

      <input
        name="autor"
        placeholder="Autor"
        value={form.autor || ""}
        onChange={cambiar}
      />

      <input
        name="categoria"
        placeholder="Categoría"
        value={form.categoria || ""}
        onChange={cambiar}
      />

      <input
        name="anio_publicacion"
        placeholder="Año"
        value={form.anio_publicacion || ""}
        onChange={cambiar}
      />

      <input
        name="total_ejemplares"
        placeholder="Total"
        value={form.total_ejemplares || ""}
        onChange={cambiar}
      />

      <input
        name="ejemplares_disponibles"
        placeholder="Disponibles"
        value={form.ejemplares_disponibles || ""}
        onChange={cambiar}
      />

      <input
        type="file"
        onChange={(e) => setImagen(e.target.files[0])}
      />

      <button type="submit">
        {libroEditar ? "Actualizar" : "Guardar"}
      </button>

    </form>
  );
}

export default FormularioLibro;