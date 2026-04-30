def merge_sort(libros, campo):
    if len(libros) <= 1:
        return libros

    medio = len(libros) // 2
    izquierda = merge_sort(libros[:medio], campo)
    derecha = merge_sort(libros[medio:], campo)

    return merge(izquierda, derecha, campo)


def merge(izquierda, derecha, campo):
    resultado = []
    i = j = 0

    while i < len(izquierda) and j < len(derecha):

        val_izq = izquierda[i][campo]
        val_der = derecha[j][campo]

        # 🔥 CLAVE: normalizar valores
        if isinstance(val_izq, str):
            val_izq = val_izq.lower()
        if isinstance(val_der, str):
            val_der = val_der.lower()

        if val_izq <= val_der:
            resultado.append(izquierda[i])
            i += 1
        else:
            resultado.append(derecha[j])
            j += 1

    resultado.extend(izquierda[i:])
    resultado.extend(derecha[j:])
    return resultado