// src/wizard/Wizard.jsx
import { useState } from "react";
import Paso1 from "./Paso1";
import Paso2 from "./Paso2";
import Paso3 from "./Paso3";
import Paso4 from "./Paso4";
import Paso5 from "./Paso5";

const Wizard = () => {
  const [pasoActual, setPasoActual] = useState(1);
  const [archivos, setArchivos] = useState({});

  const manejarArchivo = async (clave, archivo) => {
    const formData = new FormData();
    formData.append("archivo", archivo);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/upload/${clave}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Error al subir archivo");

      const data = await res.json();
      console.log(data);
      setArchivos((prev) => ({ ...prev, [clave]: archivo }));
    } catch (err) {
      console.error("❌", err);
    }
  };

  const avanzarPaso = () => {
    setPasoActual((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">Asistente de Declaración Fiscal</h1>
        <p className="text-gray-600">Paso {pasoActual} de 5</p>
      </div>

      {pasoActual === 1 && (
        <Paso1
          onNext={avanzarPaso}
          onFileUpload={(file) => manejarArchivo("futuros", file)}
        />
      )}

      {pasoActual === 2 && (
        <Paso2
          onNext={avanzarPaso}
          onFileUpload={(file) => manejarArchivo("futurosEstandar", file)}
        />
      )}

      {pasoActual === 3 && (
        <Paso3
          onNext={avanzarPaso}
          onFileUpload={(file) => manejarArchivo("fiat", file)}
        />
      )}

      {pasoActual === 4 && (
        <Paso4
          onNext={avanzarPaso}
          onFileUpload={(file) => manejarArchivo("recompensas", file)}
        />
      )}

      {pasoActual === 5 && <Paso5 archivos={archivos} />}

      <div className="text-sm text-center text-gray-400 mt-10">
        Archivos cargados: {Object.keys(archivos).length} / 4
      </div>
    </div>
  );
};

export default Wizard;
