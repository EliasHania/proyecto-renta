export const getResumenFiscal = async (req, res) => {
  try {
    const transacciones = await Transaccion.find({ usuarioId: req.usuario._id })
      .sort({ Fecha: 1 })
      .lean();

    const inventario = {};
    const resumen = {}; // { año: { categoria: { ganancias, perdidas, count } } }

    for (const tx of transacciones) {
      const fecha = new Date(tx.Fecha);
      const año = fecha.getFullYear();
      const activo = tx.activo || "GENERAL";

      // Definir categoría simple para desglose
      let categoria = "otros";
      if (tx.Tipo === "compra" || tx.Tipo === "venta")
        categoria = "cripto-cripto";
      else if (tx.Tipo === "fiat") categoria = "cripto-fiat";
      else if (tx.Tipo === "recompensa") categoria = "ingresos";
      else if (tx.Tipo === "futuros" || tx.Tipo === "futuros_estandar")
        categoria = "derivados";

      if (!resumen[año]) resumen[año] = {};
      if (!resumen[año][categoria])
        resumen[año][categoria] = { ganancias: 0, perdidas: 0, count: 0 };
      if (!inventario[activo]) inventario[activo] = [];

      if (
        tx.Tipo === "compra" ||
        tx.Tipo === "fiat" ||
        tx.Tipo === "recompensa"
      ) {
        inventario[activo].push({
          cantidad: tx.Cantidad,
          valorUnitario: tx.ValorEUR / tx.Cantidad || 0,
        });
      } else if (
        tx.Tipo === "venta" ||
        tx.Tipo === "futuros" ||
        tx.Tipo === "futuros_estandar"
      ) {
        let cantidadRestante = tx.Cantidad;
        let costeTotal = 0;

        while (cantidadRestante > 0 && inventario[activo].length) {
          const lote = inventario[activo][0];
          const usado = Math.min(lote.cantidad, cantidadRestante);

          costeTotal += usado * lote.valorUnitario;
          lote.cantidad -= usado;
          cantidadRestante -= usado;

          if (lote.cantidad === 0) inventario[activo].shift();
        }

        const valorVenta = tx.ValorEUR;
        const ganancia = valorVenta - costeTotal;

        if (ganancia >= 0) {
          resumen[año][categoria].ganancias += ganancia;
        } else {
          resumen[año][categoria].perdidas += Math.abs(ganancia);
        }
        resumen[año][categoria].count += 1;
      }
    }

    res.json(resumen);
  } catch (error) {
    console.error("Error al generar resumen fiscal:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};
