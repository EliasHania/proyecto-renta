const BotonDescargaPDF = () => {
  const generarPDF = () => {
    alert("📄 Simulación: Informe PDF generado y descargado.");
    // Más adelante usaremos jsPDF o pdf-lib para crear el archivo real
  };

  return (
    <button
      onClick={generarPDF}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm cursor-pointer"
    >
      Generar y descargar PDF
    </button>
  );
};

export default BotonDescargaPDF;
