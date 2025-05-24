const ModalConfirmacion = ({
  visible,
  onConfirmar,
  onCancelar,
  mensaje = "¿Estás seguro?",
}) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md max-w-sm w-full space-y-4">
        <p className="text-gray-800">{mensaje}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancelar}
            className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirmar}
            className="px-4 py-2 text-sm rounded bg-red-600 text-white hover:bg-red-700"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmacion;
