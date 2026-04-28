Descripción
Este proyecto consiste en el desarrollo de una API backend utilizando FastAPI para la gestión de libros en una biblioteca universitaria.
La API permite registrar libros, consultarlos, actualizarlos, eliminarlos y gestionar el préstamo de ejemplares.
Tecnologías utilizadas
-	Python 3
-	FastAPI
-	Uvicorn
-	Pydantic
-	JSON (persistencia de datos)
Endpoints disponibles
Método	Ruta	Descripción
  POST	          /libros	       Crear un libro
GET	/libros	Listar libros
GET	/libros/{id}	Obtener libro por ID
PUT	/libros/{id}	Actualizar libro
DELETE	/libros/{id}	Eliminar libro
POST	/libros/{id}/prestar	Prestar libro

Validaciones implementadas
-	Título no vacío
-	Autor no vacío
-	Año de publicación no mayor al actual
-	Total de ejemplares mayor a 0
-	Ejemplares disponibles no negativos
-	Ejemplares disponibles no mayores al total

Manejo de errores
La API implementa manejo de errores usando HTTPException:
-	404 → Libro no encontrado
-	400 → Datos inválidos o sin ejemplares disponibles
Persistencia de datos
Se utiliza un archivo libros.json para almacenar la información, permitiendo mantener los datos entre ejecuciones.

Integrantes:
Fabian Andres Almanza Pulgar
Alejandra Ramirez

Estado del proyecto
Funcional
Cumple con los requerimientos de la actividad
Listo para evaluación
