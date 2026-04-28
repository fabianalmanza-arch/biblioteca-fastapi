from pydantic import BaseModel, Field, field_validator
from datetime import datetime
from typing import Optional

class Libro(BaseModel):
    id: int
    titulo: str = Field(..., min_length=1)
    autor: str = Field(..., min_length=1)
    categoria: str
    anio_publicacion: int
    total_ejemplares: int = Field(..., gt=0)
    ejemplares_disponibles: int = Field(..., ge=0)
    portada: Optional[str] = None

    @field_validator("anio_publicacion")
    def validar_anio(cls, value):
        if value > datetime.now().year:
            raise ValueError("El año no puede ser mayor al actual")
        return value

    @field_validator("ejemplares_disponibles")
    def validar_ejemplares(cls, value, info):
        total = info.data.get("total_ejemplares")
        if total is not None and value > total:
            raise ValueError("No puede haber más disponibles que el total")
        return value