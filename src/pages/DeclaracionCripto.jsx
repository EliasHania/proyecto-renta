import { useState } from "react";
import ImportadorCSV from "../components/ImportadorCSV";
import TablaDeclaracion from "../components/TablaDeclaracion";
import ResumenFiscalCard from "../components/ResumenFiscalCard";
import EliminarTransacciones from "../components/EliminarTransacciones";
import BotonExportarExcel from "../components/BotonExportarExcel";

const DeclaracionCripto = () => {
  const [transacciones, setTransacciones] = useState([]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Declaración Cripto</h2>

      <ImportadorCSV setTransacciones={setTransacciones} />
      <EliminarTransacciones />
      <BotonExportarExcel transacciones={transacciones} />

      <div className="bg-white shadow rounded p-4 space-y-6">
        <ResumenFiscalCard transacciones={transacciones} />

        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Transacciones importadas
          </h3>
          <TablaDeclaracion transacciones={transacciones} />
        </div>
      </div>
    </div>
  );
};

export default DeclaracionCripto;
