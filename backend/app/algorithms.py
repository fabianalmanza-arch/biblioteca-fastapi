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
        if izquierda[i][campo] <= derecha[j][campo]:
            resultado.append(izquierda[i])
            i += 1
        else:
            resultado.append(derecha[j])
            j += 1

    resultado.extend(izquierda[i:])
    resultado.extend(derecha[j:])
    return resultado