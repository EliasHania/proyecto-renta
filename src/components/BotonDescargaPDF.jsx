const BotonDescargaPDF = () => {
  const descargarPDF = () => {
    const token = localStorage.getItem("token"); // Ajusta según donde guardes el JWT

    fetch("/api/declaracion/pdf", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al generar PDF");
        return res.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `InformeFiscal_${new Date().getFullYear()}.pdf`
        );
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error(error);
        alert("No se pudo descargar el PDF");
      });
  };

  return (
    <button
      onClick={descargarPDF}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm cursor-pointer"
    >
      Generar y descargar PDF
    </button>
  );
};

export default BotonDescargaPDF;
