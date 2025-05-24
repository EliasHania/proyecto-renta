import Papa from "papaparse";

const ImportadorCSV = ({ setTransacciones }) => {
  const handleArchivo = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.name.endsWith(".csv")) {
      return alert("⚠️ Solo se permiten archivos .csv");
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (result) => {
        const data = result.data;

        // Guardamos en frontend temporalmente
        setTransacciones(data);

        // Enviamos al backend
        try {
          const respuesta = await fetch(
            `${import.meta.env.VITE_API_URL}/api/transacciones/importar`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            }
          );

          if (respuesta.ok) {
            alert("✅ Transacciones importadas correctamente.");
          } else {
            alert("❌ Error al enviar al servidor.");
          }
        } catch (error) {
          console.error("Error al enviar:", error);
          alert("❌ No se pudo conectar al backend.");
        }
      },
    });
  };

  return (
    <div className="bg-white shadow rounded p-4 space-y-2">
      <label
        htmlFor="archivo-csv"
        className="block text-sm font-medium text-gray-700"
      >
        Selecciona archivo CSV:
      </label>
      <input
        id="archivo-csv"
        name="archivo"
        type="file"
        accept=".csv"
        onChange={handleArchivo}
        className="block w-full text-sm text-gray-600"
      />
    </div>
  );
};

export default ImportadorCSV;
