import { useState } from "react";
import FormularioGasto from "../components/FormularioGasto";
import TablaFinanzas from "../components/TablaFinanzas";
import GraficoFinanzas from "../components/GraficoFinanzas";
import Calendario from "../components/Calendario";

const FinanzasPersonales = () => {
  const [fechaFiltro, setFechaFiltro] = useState(null);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Finanzas Personales</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Formulario para añadir gastos o ingresos */}
        <div className="bg-white shadow rounded p-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Registrar movimiento
          </h3>
          <FormularioGasto />
        </div>

        {/* Gráfico de resumen mensual */}
        <div className="bg-white shadow rounded p-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Resumen gráfico
          </h3>
          <GraficoFinanzas />
        </div>
      </div>

      {/* Filtro por fecha */}
      <div className="bg-white shadow rounded p-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Filtrar por fecha
        </h3>
        <Calendario onChange={(fecha) => setFechaFiltro(fecha)} />
      </div>

      {/* Tabla de registros financieros */}
      <div className="bg-white shadow rounded p-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Movimientos registrados
        </h3>
        <TablaFinanzas fechaFiltro={fechaFiltro} />
      </div>
    </div>
  );
};

export default FinanzasPersonales;
