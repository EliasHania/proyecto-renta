// src/wizard/Paso5.jsx
import { useState, useEffect } from "react";

const Paso5 = ({ archivos }) => {
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);
  const [resumen, setResumen] = useState(null);

  const handleGenerar = async () => {
    setCargando(true);
    setMensaje("");
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/declaracion/pdf`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!res.ok) throw new Error("No se pudo generar el PDF");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "InformeFiscal.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      setMensaje("✅ Informe generado correctamente.");
    } catch (err) {
      console.error(err);
      setMensaje("❌ Error al generar el informe PDF.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    const obtenerResumen = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/declaracion/resumen`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!res.ok) throw new Error("Error cargando resumen fiscal");
        const data = await res.json();
        setResumen(data);
      } catch (error) {
        console.error("Error al cargar resumen fiscal:", error);
        setMensaje("❌ Error al cargar resumen fiscal.");
      }
    };

    obtenerResumen();
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow-md max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Paso 5: Generar informe fiscal</h2>

      {Object.keys(archivos).length === 0 ? (
        <p className="text-gray-500 mb-4">No hay archivos cargados aún.</p>
      ) : (
        <>
          <p className="text-sm text-gray-700 mb-4">Archivos cargados:</p>
          <ul className="list-disc list-inside mb-4 text-sm text-gray-600">
            {Object.entries(archivos).map(([clave, archivo]) => (
              <li key={clave}>
                <strong>{clave}</strong>: {archivo.name}
              </li>
            ))}
          </ul>
        </>
      )}

      {resumen && Object.keys(resumen).length > 0 ? (
        <div className="mt-6">
          <h3 className="text-md font-semibold mb-2 text-gray-800">
            Resumen fiscal estimado:
          </h3>
          <ul className="text-sm text-gray-700 space-y-1">
            {Object.entries(resumen).map(([año, categorias]) => {
              const gananciasTotales = Object.values(categorias).reduce(
                (acc, cat) => acc + (cat.ganancias ?? 0),
                0
              );
              const perdidasTotales = Object.values(categorias).reduce(
                (acc, cat) => acc + (cat.perdidas ?? 0),
                0
              );

              return (
                <li key={año}>
                  <strong>{año}</strong>: +{gananciasTotales.toFixed(2)} € / -
                  {perdidasTotales.toFixed(2)} €
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <p className="text-gray-500 text-sm">
          No hay datos fiscales para mostrar.
        </p>
      )}

      <button
        onClick={handleGenerar}
        disabled={cargando}
        className="mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
      >
        {cargando ? "Generando..." : "Generar PDF fiscal"}
      </button>

      {mensaje && <p className="mt-4 text-sm font-semibold">{mensaje}</p>}
    </div>
  );
};

export default Paso5;
