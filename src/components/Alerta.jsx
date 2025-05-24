const Alerta = ({ tipo = "info", mensaje }) => {
  const colores = {
    info: "bg-blue-100 text-blue-700",
    exito: "bg-green-100 text-green-700",
    error: "bg-red-100 text-red-700",
  };

  return (
    <div className={`p-3 rounded text-sm ${colores[tipo] || colores.info}`}>
      {mensaje}
    </div>
  );
};

export default Alerta;
