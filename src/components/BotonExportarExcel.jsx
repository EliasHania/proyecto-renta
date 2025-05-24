// src/components/BotonExportarExcel.jsx
import * as XLSX from "xlsx";

const BotonExportarExcel = ({ transacciones }) => {
  const exportar = () => {
    if (!transacciones || transacciones.length === 0) {
      alert("⚠️ No hay transacciones para exportar.");
      return;
    }

    const ws = XLSX.utils.json_to_sheet(transacciones);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Transacciones");

    XLSX.writeFile(wb, "declaracion-cripto.xlsx");
  };

  return (
    <button
      onClick={exportar}
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm"
    >
      Exportar a Excel
    </button>
  );
};

export default BotonExportarExcel;
