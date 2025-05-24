const EliminarTransacciones = () => {
  const eliminar = async () => {
    const confirmar = window.confirm(
      "¿Estás seguro de que deseas eliminar TODAS las transacciones?"
    );
    if (!confirmar) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/transacciones/eliminar-todo`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        alert("✅ Todas las transacciones han sido eliminadas.");
      } else {
        alert("❌ Error al eliminar transacciones.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ No se pudo conectar al backend.");
    }
  };

  return (
    <button
      onClick={eliminar}
      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm"
    >
      Eliminar todas las transacciones
    </button>
  );
};

export default EliminarTransacciones;
