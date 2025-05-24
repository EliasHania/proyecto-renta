// server/controllers/finanzasController.js
import Transaccion from "../models/Transaccion.js";

export const obtenerResumenFinanzas = async (req, res) => {
  try {
    const usuarioId = req.usuario._id;
    const transacciones = await Transaccion.find({ usuarioId }).lean();

    let ganancias = 0;
    let gastos = 0;

    for (const tx of transacciones) {
      const valor = Number(tx.ValorEUR);
      if (isNaN(valor) || valor === 0) continue; // Ignorar valores 0 o inválidos

      if (
        tx.Tipo === "recompensa" ||
        tx.Tipo === "ingreso" ||
        tx.Tipo === "fiat" ||
        tx.Tipo === "compra"
      ) {
        // Solo sumar valores positivos para ganancias
        if (valor > 0) ganancias += valor;
      } else if (
        tx.Tipo === "gasto" ||
        tx.Tipo === "venta" ||
        tx.Tipo === "futuros" ||
        tx.Tipo === "futuros_estandar"
      ) {
        // Sumar valor absoluto para gastos (porque pueden venir negativos)
        gastos += Math.abs(valor);
      }
    }

    const saldo = ganancias - gastos;

    res.json({
      ganancias: ganancias.toFixed(2),
      gastos: gastos.toFixed(2),
      saldo: saldo.toFixed(2),
    });
  } catch (error) {
    console.error("Error en obtenerResumenFinanzas:", error);
    res.status(500).json({ mensaje: "Error al obtener resumen financiero" });
  }
};
