import { useState } from "react";

function ArbolCategorias({ categorias, filtrar }) {

  // Guarda qué nodos están abiertos
  const [abiertos, setAbiertos] = useState({});

  // Abrir / cerrar categoría
  const toggle = (nombre) => {
    setAbiertos({
      ...abiertos,
      [nombre]: !abiertos[nombre]
    });
  };

  // Obtener categoría + hijos
  const obtenerCategorias = (nombre, hijos) => {

    let lista = [nombre];

    for (let sub in hijos) {
      lista = lista.concat(
        obtenerCategorias(sub, hijos[sub])
      );
    }

    return lista;
  };

  // Nodo recursivo
  function Nodo({ data, nivel = 0 }) {
    return (
      <ul className="nivel">

        {Object.entries(data).map(([clave, valor]) => {

          const tieneHijos =
            Object.keys(valor).length > 0;

          const abierto =
            abiertos[clave];

          return (
            <li key={clave}>

              <div
                className="fila-cat"
                style={{ marginLeft: nivel * 10 }}
              >

                {tieneHijos && (
                  <button
                    className="flecha"
                    onClick={() => toggle(clave)}
                  >
                    {abierto ? "▼" : "▶"}
                  </button>
                )}

                <button
                  className="btn-arbol"
                  onClick={() =>
                    filtrar(
                      obtenerCategorias(
                        clave,
                        valor
                      )
                    )
                  }
                >
                  {clave}
                </button>

              </div>

              {tieneHijos && abierto && (
                <Nodo
                  data={valor}
                  nivel={nivel + 1}
                />
              )}

            </li>
          );
        })}

      </ul>
    );
  }

  return (
    <aside className="sidebar">

      <h2>Categorías</h2>

      <Nodo data={categorias} />

    </aside>
  );
}

export default ArbolCategorias;