// src/wizard/Paso3.jsx
import { useState } from "react";

const Paso3 = ({ onNext, onFileUpload }) => {
  const [archivo, setArchivo] = useState(null);
  const [error, setError] = useState("");

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if ((file && file.name.endsWith(".csv")) || file.name.endsWith(".xlsx")) {
      setArchivo(file);
      setError("");
      onFileUpload(file); // Propaga el archivo al componente padre
    } else {
      setError("Solo se permiten archivos .csv o .xlsx");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleNext = () => {
    if (!archivo) {
      setError("Debes subir un archivo antes de continuar.");
      return;
    }
    onNext(); // Avanza al siguiente paso
  };

  return (
    <div className="bg-white p-6 rounded shadow-md max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">
        Paso 3: Ingresos / depósitos Fiat
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        Sube el archivo con los movimientos fiat (ingresos, retiros) que afecten
        tu patrimonio.
      </p>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border-dashed border-2 border-gray-400 rounded-md p-10 text-center bg-gray-50 hover:bg-gray-100 cursor-pointer"
      >
        {archivo ? (
          <p className="text-green-600 font-semibold">✅ {archivo.name}</p>
        ) : (
          <p className="text-gray-500">
            Arrastra el archivo aquí o haz clic para seleccionarlo
          </p>
        )}
      </div>

      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

      <button
        onClick={handleNext}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
      >
        Siguiente paso
      </button>
    </div>
  );
};

export default Paso3;
