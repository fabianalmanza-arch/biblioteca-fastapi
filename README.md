# 📚 Biblioteca UAO - FastAPI

## 📌 Descripción

Este proyecto consiste en el desarrollo de una API backend utilizando **FastAPI** para la gestión de libros en una biblioteca universitaria.

La API permite realizar operaciones CRUD completas sobre libros, además de funcionalidades como búsqueda, ordenamiento y gestión de préstamos de ejemplares.

---

## 🚀 Tecnologías utilizadas

- Python 3
- FastAPI
- Uvicorn
- Pydantic
- JSON (persistencia de datos)
- CORS Middleware

---

## 📡 Endpoints principales

### 📚 Libros

- `POST /libros` → Crear un libro
- `GET /libros` → Listar todos los libros
- `GET /libros/{id}` → Obtener libro por ID
- `PUT /libros/{id}` → Actualizar libro
- `DELETE /libros/{id}` → Eliminar libro

### 🔎 Búsqueda y ordenamiento

- `GET /libros/buscar?texto=` → Buscar libros
- `GET /libros/ordenar?campo=` → Ordenar libros

### 📖 Préstamos

- `POST /libros/{id}/prestar` → Prestar libro
- `POST /libros/{id}/devolver` → Devolver libro
- `GET /prestamos` → Ver préstamos activos

### 🗂 Categorías

- `GET /categorias/arbol` → Obtener árbol de categorías

---

## ✅ Validaciones implementadas

- Título obligatorio
- Autor obligatorio
- Año de publicación válido
- Ejemplares totales mayores a 0
- Ejemplares disponibles no negativos
- Control de disponibilidad en préstamos

---

## ⚠️ Manejo de errores

La API maneja errores mediante `HTTPException`:

- `404` → Recurso no encontrado
- `400` → Datos inválidos o sin disponibilidad

---

## 💾 Persistencia de datos

Los datos se almacenan en un archivo `libros.json`, lo que permite conservar la información incluso después de reiniciar el servidor.

---

## 🌐 Despliegue

- Backend: Render
- Frontend: Vercel

---

## 👨‍💻 Integrantes

- Fabian Andres Almanza Pulgar
- Alejandra Ramirez
