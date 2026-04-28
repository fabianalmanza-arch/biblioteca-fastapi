from fastapi import FastAPI, HTTPException, status
from app.models import Libro
from app.database import leer_libros, guardar_libros
from fastapi.middleware.cors import CORSMiddleware
from app.algorithms import merge_sort
from fastapi.staticfiles import StaticFiles
from fastapi import Form, UploadFile, File
import shutil

app = FastAPI(title="API Biblioteca UAO")
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------
# RUTA INICIAL
# -----------------------
@app.get("/")
def inicio():
    return {"mensaje": "API Biblioteca funcionando"}

# -----------------------
# CREAR LIBRO
# -----------------------
@app.post("/libros")
def crear_libro(
    titulo: str = Form(...),
    autor: str = Form(...),
    categoria: str = Form(...),
    anio_publicacion: int = Form(...),
    total_ejemplares: int = Form(...),
    ejemplares_disponibles: int = Form(...),
    portada: UploadFile = File(None)
):
    libros = leer_libros()

    if any(l["id"] == id for l in libros):
        raise HTTPException(status_code=400, detail="ID repetido")

    nombre_archivo = None

    if portada:
        nombre_archivo = portada.filename

        with open(f"uploads/{nombre_archivo}", "wb") as buffer:
            shutil.copyfileobj(portada.file, buffer)

    nuevo_id = 1 if not libros else max(l["id"] for l in libros) + 1

    nuevo = {
        "id": nuevo_id,
        "titulo": titulo,
        "autor": autor,
        "categoria": categoria,
        "anio_publicacion": anio_publicacion,
        "total_ejemplares": total_ejemplares,
        "ejemplares_disponibles": ejemplares_disponibles,
        "portada": nombre_archivo
    }

    libros.append(nuevo)
    guardar_libros(libros)

    return nuevo

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
def actualizar_libro(
    id: int,
    titulo: str = Form(...),
    autor: str = Form(...),
    categoria: str = Form(...),
    anio_publicacion: int = Form(...),
    total_ejemplares: int = Form(...),
    ejemplares_disponibles: int = Form(...),
    portada: UploadFile = File(None)
):
    libros = leer_libros()

    for i, libro in enumerate(libros):

        if libro["id"] == id:

            nombre = libro.get("portada")

            if portada:
                nombre = portada.filename

                with open(f"uploads/{nombre}", "wb") as buffer:
                    shutil.copyfileobj(portada.file, buffer)

            libros[i] = {
                "id": id,
                "titulo": titulo,
                "autor": autor,
                "categoria": categoria,
                "anio_publicacion": anio_publicacion,
                "total_ejemplares": total_ejemplares,
                "ejemplares_disponibles": ejemplares_disponibles,
                "portada": nombre
            }

            guardar_libros(libros)

            return {"mensaje": "Actualizado"}

    raise HTTPException(status_code=404, detail="No encontrado")

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
def prestar_libro(id: int, identidad: str = Form(...)):

    libros = leer_libros()

    for libro in libros:

        if libro["id"] == id:

            if libro["ejemplares_disponibles"] <= 0:
                raise HTTPException(
                    status_code=400,
                    detail="Agotado"
                )

            libro["ejemplares_disponibles"] -= 1

            if "prestamos" not in libro:
                libro["prestamos"] = []

            libro["prestamos"].append(identidad)

            guardar_libros(libros)

            return {"mensaje": "Prestado"}

    raise HTTPException(status_code=404, detail="No encontrado")

@app.post("/libros/{id}/devolver")
def devolver_libro(id: int, identidad: str = Form(...)):

    libros = leer_libros()

    for libro in libros:

        if libro["id"] == id:

            if "prestamos" in libro and identidad in libro["prestamos"]:

                libro["prestamos"].remove(identidad)
                libro["ejemplares_disponibles"] += 1

                guardar_libros(libros)

                return {"mensaje": "Devuelto"}

            raise HTTPException(status_code=400, detail="No existe préstamo")

    raise HTTPException(status_code=404, detail="No encontrado")

@app.get("/prestamos")
def ver_prestamos():

    libros = leer_libros()

    resultado = []

    for libro in libros:

        if "prestamos" in libro:

            for persona in libro["prestamos"]:

                resultado.append({
                    "id": libro["id"],
                    "titulo": libro["titulo"],
                    "identidad": persona
                })

    return resultado

# -----------------------
# Buscar Libro
# -----------------------
@app.get("/libros/buscar")
def buscar_libros(texto: str):
    libros = leer_libros()
    resultado = []

    texto = texto.lower()

    for libro in libros:   # búsqueda lineal O(n)
        if (
            texto in libro["titulo"].lower()
            or texto in libro["autor"].lower()
            or texto in libro["categoria"].lower()
            or texto in str(libro["id"])
        ):
            resultado.append(libro)

    return resultado

@app.get("/libros/ordenar")
def ordenar_libros(campo: str):
    libros = leer_libros()

    campos_validos = [
        "titulo",
        "autor",
        "anio_publicacion",
        "ejemplares_disponibles"
    ]

    if campo not in campos_validos:
        raise HTTPException(status_code=400, detail="Campo inválido")

    return merge_sort(libros, campo)

@app.get("/categorias/arbol")
def obtener_arbol():
    return categorias

categorias = {
    "Ingeniería": {
        "Programación": {
            "Desarrollo Web": {},
            "Python": {}
        },
        "Electrónica": {}
    },
    "Matemáticas": {
        "Álgebra": {},
        "Cálculo": {}
    },
    "Humanidades": {
        "Historia": {}
    }
}