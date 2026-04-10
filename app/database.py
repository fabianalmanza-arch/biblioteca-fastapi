import json
from pathlib import Path

DB_FILE = Path("libros.json")

def leer_libros():
    if not DB_FILE.exists():
        return []
    
    with open(DB_FILE, "r") as f:
        return json.load(f)

def guardar_libros(libros):
    with open(DB_FILE, "w") as f:
        json.dump(libros, f, indent=4)