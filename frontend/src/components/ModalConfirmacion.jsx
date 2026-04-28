function ModalConfirmacion({
  cerrar,
  aceptar,
  titulo,
  mensaje
}) {
  return (
    <div className="modal-fondo">
      <div className="modal mini">

        <h2>{titulo}</h2>

        <p>{mensaje}</p>

        <div className="acciones">
          <button onClick={cerrar}>
            Cancelar
          </button>

          <button onClick={aceptar}>
            Confirmar
          </button>
        </div>

      </div>
    </div>
  );
}

export default ModalConfirmacion;