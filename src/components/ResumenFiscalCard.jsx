const ResumenFiscalCard = ({ transacciones }) => {
  if (!transacciones || transacciones.length === 0) return null;

  let totalGanancia = 0;
  let totalPerdida = 0;

  // Asumimos estructura simplificada: tipo: 'Compra' o 'Venta', columna 'Cantidad' y 'ValorEUR'
  const compras = [];

  transacciones.forEach((tx) => {
    const tipo = tx.Tipo?.toLowerCase();
    const cantidad = parseFloat(tx.Cantidad);
    const valor = parseFloat(tx.ValorEUR);

    if (tipo === "compra") {
      compras.push({ cantidad, valor });
    }

    if (tipo === "venta" && compras.length > 0) {
      let restante = cantidad;
      let costeTotal = 0;

      // FIFO: consumimos de las compras previas
      while (restante > 0 && compras.length > 0) {
        const lote = compras[0];
        const consumir = Math.min(restante, lote.cantidad);
        costeTotal += (lote.valor / lote.cantidad) * consumir;
        restante -= consumir;
        lote.cantidad -= consumir;
        if (lote.cantidad <= 0) compras.shift();
      }

      const beneficio = valor - costeTotal;
      if (beneficio >= 0) totalGanancia += beneficio;
      else totalPerdida += Math.abs(beneficio);
    }
  });

  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">
        Resumen Fiscal (Estimado)
      </h3>
      <ul className="text-sm text-gray-700 space-y-1">
        <li>
          Ganancias totales:{" "}
          <span className="text-green-600 font-bold">
            +€{totalGanancia.toFixed(2)}
          </span>
        </li>
        <li>
          Pérdidas totales:{" "}
          <span className="text-red-600 font-bold">
            -€{totalPerdida.toFixed(2)}
          </span>
        </li>
        <li>
          Resultado neto:{" "}
          <span className="font-bold">
            €{(totalGanancia - totalPerdida).toFixed(2)}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default ResumenFiscalCard;
