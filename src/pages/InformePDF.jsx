import BotonDescargaPDF from "../components/BotonDescargaPDF";

const InformePDF = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Informe Fiscal</h2>

      <p className="text-gray-600">
        Aquí podrás generar tu informe fiscal en formato PDF a partir de tus
        transacciones declaradas.
      </p>

      <div className="bg-white shadow rounded p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">
          Resumen del año fiscal
        </h3>

        {/* Simulamos resumen */}
        <ul className="text-sm text-gray-700 space-y-1">
          <li>
            Ganancias:{" "}
            <span className="text-green-600 font-bold">+€543.21</span>
          </li>
          <li>
            Pérdidas: <span className="text-red-600 font-bold">-€120.50</span>
          </li>
          <li>
            Resultado neto: <strong>€422.71</strong>
          </li>
          <li>
            Transacciones totales: <strong>146</strong>
          </li>
          <li>
            Año fiscal: <strong>2024</strong>
          </li>
        </ul>

        <BotonDescargaPDF />
      </div>
    </div>
  );
};

export default InformePDF;
