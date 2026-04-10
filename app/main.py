from fastapi import FastAPI, HTTPException, status
from app.models import Libro
from app.database import leer_libros, guardar_libros

app = FastAPI(title="API Biblioteca UAO")

# -----------------------
# RUTA INICIAL
# -----------------------
@app.get("/")
def inicio():
    return {"mensaje": "API Biblioteca funcionando"}

# -----------------------
# CREAR LIBRO
# -----------------------
@app.post("/libros", status_code=status.HTTP_201_CREATED)
def crear_libro(libro: Libro):
    libros = leer_libros()

    if any(l["id"] == libro.id for l in libros):
        raise HTTPException(status_code=400, detail="El libro ya existe")

    libros.append(libro.dict())
    guardar_libros(libros)

    return libro

# -----------------------
# LISTAR LIBROS
# -----------------------
@app.get("/libros")
def listar_libros(categoria: str = None):
    libros = leer_libros()

    if categoria:
        libros = [l for l in libros if l["categoria"] == categoria]

    return libros

# -----------------------
# OBTENER LIBRO
# -----------------------
@app.get("/libros/{id}")
def obtener_libro(id: int):
    libros = leer_libros()

    for libro in libros:
        if libro["id"] == id:
            return libro

    raise HTTPException(status_code=404, detail="Libro no encontrado")

# -----------------------
# ACTUALIZAR LIBRO
# -----------------------
@app.put("/libros/{id}")
def actualizar_libro(id: int, libro_actualizado: Libro):
    libros = leer_libros()

    for i, libro in enumerate(libros):
        if libro["id"] == id:
            libros[i] = libro_actualizado.dict()
            guardar_libros(libros)
            return libro_actualizado

    raise HTTPException(status_code=404, detail="Libro no encontrado")

# -----------------------
# ELIMINAR LIBRO
# -----------------------
@app.delete("/libros/{id}")
def eliminar_libro(id: int):
    libros = leer_libros()

    for i, libro in enumerate(libros):
        if libro["id"] == id:
            libros.pop(i)
            guardar_libros(libros)
            return {"mensaje": "Libro eliminado"}

    raise HTTPException(status_code=404, detail="Libro no encontrado")

# -----------------------
# PRESTAR LIBRO
# -----------------------
@app.post("/libros/{id}/prestar")
def prestar_libro(id: int):
    libros = leer_libros()

    for libro in libros:
        if libro["id"] == id:

            if libro["ejemplares_disponibles"] <= 0:
                raise HTTPException(
                    status_code=400,
                    detail="No hay ejemplares disponibles"
                )

            libro["ejemplares_disponibles"] -= 1
            guardar_libros(libros)

            return {
                "mensaje": "Préstamo realizado",
                "disponibles": libro["ejemplares_disponibles"]
            }

    raise HTTPException(status_code=404, detail="Libro no encontrado")