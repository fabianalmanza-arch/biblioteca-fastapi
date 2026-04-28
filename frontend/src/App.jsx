import { useEffect, useState } from "react";
import API from "./services/api";
import "./App.css";

import LibroCard from "./components/LibroCard";
import ModalLibro from "./components/ModalLibro";
import ModalCrear from "./components/ModalCrear";
import ModalDevolucion from "./components/ModalDevolucion";
import ArbolCategorias from "./components/ArbolCategorias";
import Ordenamiento from "./components/Ordenamiento";

function App() {
  const [libros, setLibros] = useState([]);
  const [todos, setTodos] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const [mostrarCrear, setMostrarCrear] = useState(false);
  const [mostrarDevolucion, setMostrarDevolucion] = useState(false);
  const [categorias, setCategorias] = useState({});
  const [texto, setTexto] = useState("");

  useEffect(() => {
    cargarLibros();
    cargarCategorias();
  }, []);

  const ordenarLibros = async (campo) => {
    if (!campo) return;

    const res = await API.get(
      `/libros/ordenar?campo=${campo}`
    );

    setLibros(res.data);
  };

  const cargarLibros = async () => {
    const res = await API.get("/libros");
    setLibros(res.data);
    setTodos(res.data);
  };

  const cargarCategorias = async () => {
    const res = await API.get("/categorias/arbol");
    setCategorias(res.data);
  };

  // Buscar
  const buscar = (valor) => {
    setTexto(valor);

    const filtrados = todos.filter((libro) =>
      libro.titulo.toLowerCase().includes(valor.toLowerCase())
    );

    setLibros(filtrados);
  };

  // Filtrar desde árbol
  const filtrarArbol = (listaCategorias) => {
    const filtrados = todos.filter((libro) =>
      listaCategorias.includes(libro.categoria)
    );

    setLibros(filtrados);
  };

  // Mostrar todos
  const mostrarTodos = () => {
    setLibros(todos);
  };

  return (
    <div className="app">

      <header>
        <h1>Biblioteca UAO</h1>

        <div className="top-btns">
          <button
            className="btn-crear"
            onClick={() => setMostrarCrear(true)}
          >
            + Nuevo Libro
          </button>

          <button
            className="btn-crear"
            onClick={() => setMostrarDevolucion(true)}
          >
            ↩ Devolución
          </button>
        </div>
      </header>

      {/* BARRA SUPERIOR */}
      <section className="barra-top">

        <Ordenamiento ordenarLibros={ordenarLibros} />

        <input
          className="buscador"
          placeholder="Buscar libro..."
          value={texto}
          onChange={(e) => buscar(e.target.value)}
        />

        <button
          className="btn-secundario"
          onClick={mostrarTodos}
        >
          Ver Todos
        </button>

        <span className="contador">
          {libros.length} libros
        </span>

      </section>

      {/* CONTENIDO */}
      <section className="layout">

        {/* IZQUIERDA = Árbol */}
        <ArbolCategorias
          categorias={categorias}
          filtrar={filtrarArbol}
        />

        {/* DERECHA = Libros */}
        <div className="contenido-libros">

          <section className="grid-libros">
            {libros.map((libro) => (
              <LibroCard
                key={libro.id}
                libro={libro}
                onClick={() => setSeleccionado(libro)}
              />
            ))}
          </section>

        </div>

      </section>

      {/* MODALES */}
      {seleccionado && (
        <ModalLibro
          libro={seleccionado}
          cerrar={() => setSeleccionado(null)}
          recargar={cargarLibros}
        />
      )}

      {mostrarCrear && (
        <ModalCrear
          cerrar={() => setMostrarCrear(false)}
          recargar={cargarLibros}
          categorias={categorias}
        />
      )}

      {mostrarDevolucion && (
        <ModalDevolucion
          cerrar={() => setMostrarDevolucion(false)}
          recargar={cargarLibros}
        />
      )}

    </div>
  );
}

export default App;