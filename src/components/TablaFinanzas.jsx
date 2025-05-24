import { useEffect, useState } from "react";
import ModalConfirmacion from "./ModalConfirmacion";

const TablaFinanzas = ({ fechaFiltro }) => {
  const [movimientos, setMovimientos] = useState([]);
  const [idAEliminar, setIdAEliminar] = useState(null);

  useEffect(() => {
    const guardados = JSON.parse(localStorage.getItem("movimientos") || "[]");
    setMovimientos(guardados.reverse());
  }, []);

  const mostrarModal = (id) => {
    setIdAEliminar(id);
  };

  const eliminarMovimiento = () => {
    const actualizados = movimientos.filter((m) => m.id !== idAEliminar);
    localStorage.setItem("movimientos", JSON.stringify(actualizados.reverse()));
    setMovimientos(actualizados);
    setIdAEliminar(null);
  };

  // 🔍 Filtrar por fecha si se selecciona
  const movimientosFiltrados = fechaFiltro
    ? movimientos.filter((m) => {
        const fechaMov = new Date(m.fecha);
        return (
          fechaMov.getFullYear() === fechaFiltro.getFullYear() &&
          fechaMov.getMonth() === fechaFiltro.getMonth() &&
          fechaMov.getDate() === fechaFiltro.getDate()
        );
      })
    : movimientos;

  return (
    <div className="overflow-x-auto">
      {movimientosFiltrados.length === 0 ? (
        <p className="text-sm text-gray-500">
          {fechaFiltro
            ? "No hay movimientos en esta fecha."
            : "No hay movimientos registrados."}
        </p>
      ) : (
        <table className="min-w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Fecha</th>
              <th className="px-4 py-2 border">Descripción</th>
              <th className="px-4 py-2 border">Tipo</th>
              <th className="px-4 py-2 border">Cantidad (€)</th>
              <th className="px-4 py-2 border">Acción</th>
            </tr>
          </thead>
          <tbody>
            {movimientosFiltrados.map((mov) => (
              <tr key={mov.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">
                  {new Date(mov.fecha).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border">{mov.descripcion}</td>
                <td className="px-4 py-2 border capitalize">
                  <span
                    className={
                      mov.tipo === "ingreso"
                        ? "text-green-600 font-medium"
                        : "text-red-600 font-medium"
                    }
                  >
                    {mov.tipo}
                  </span>
                </td>
                <td className="px-4 py-2 border">
                  {mov.tipo === "gasto" ? "-" : "+"}
                  {mov.cantidad.toFixed(2)}
                </td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => mostrarModal(mov.id)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <ModalConfirmacion
        visible={idAEliminar !== null}
        mensaje="¿Deseas eliminar este movimiento?"
        onConfirmar={eliminarMovimiento}
        onCancelar={() => setIdAEliminar(null)}
      />
    </div>
  );
};

export default TablaFinanzas;
