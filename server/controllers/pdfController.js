import PDFDocument from "pdfkit";
import Transaccion from "../models/Transaccion.js";

export const generarPDF = async (req, res) => {
  try {
    const transacciones = await Transaccion.find({ usuarioId: req.usuario._id })
      .sort({ Fecha: 1 })
      .lean();

    const resumen = {};
    const inventario = {};
    const detallePorAño = {};

    for (const tx of transacciones) {
      const fecha = new Date(tx.Fecha);
      const año = fecha.getFullYear();
      const activo = tx.activo || "GENERAL";
      const tipo = tx.Tipo;

      if (!resumen[año]) resumen[año] = { ganancias: 0, perdidas: 0 };
      if (!detallePorAño[año]) detallePorAño[año] = [];
      if (!inventario[activo]) inventario[activo] = [];

      if (tipo === "compra" || tipo === "fiat" || tipo === "recompensa") {
        if (tx.Cantidad > 0 && tx.ValorEUR > 0) {
          inventario[activo].push({
            cantidad: tx.Cantidad,
            valorUnitario: tx.ValorEUR / tx.Cantidad,
          });
        }
      } else if (
        tipo === "venta" ||
        tipo === "futuros" ||
        tipo === "futuros_estandar"
      ) {
        let cantidadRestante = tx.Cantidad;
        let costeTotal = 0;

        while (cantidadRestante > 0 && inventario[activo].length) {
          const lote = inventario[activo][0];
          const usado = Math.min(lote.cantidad, cantidadRestante);
          costeTotal += usado * lote.valorUnitario;
          lote.cantidad -= usado;
          cantidadRestante -= usado;
          if (lote.cantidad <= 0) inventario[activo].shift();
        }

        const valorVenta = tx.ValorEUR;
        const ganancia = valorVenta - costeTotal;

        if (ganancia >= 0) {
          resumen[año].ganancias += ganancia;
        } else {
          resumen[año].perdidas += Math.abs(ganancia);
        }

        detallePorAño[año].push({
          fecha: tx.Fecha,
          tipo,
          activo,
          cantidad: tx.Cantidad,
          valorVenta,
          costeTotal,
          resultado: ganancia,
        });
      }
    }

    // Crear PDF
    const doc = new PDFDocument({ margin: 50, size: "A4" });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=InformeFiscal.pdf"
    );
    doc.pipe(res);

    // Portada
    doc.fontSize(22).text("Informe Fiscal Cripto", { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(`Generado el: ${new Date().toLocaleDateString()}`, {
      align: "center",
    });
    doc.text(
      `Usuario: ${req.usuario.nombre || req.usuario.email || req.usuario._id}`,
      { align: "center" }
    );
    doc.addPage();

    // Resumen por año
    doc
      .fontSize(18)
      .text("Resumen de Ganancias y Pérdidas", { underline: true });
    doc.moveDown();
    Object.entries(resumen).forEach(([año, { ganancias, perdidas }]) => {
      doc.fontSize(14).text(`Año ${año}`);
      doc.fontSize(12).text(`Ganancias: +${ganancias.toFixed(2)} €`);
      doc.fontSize(12).text(`Pérdidas: -${perdidas.toFixed(2)} €`);
      doc.moveDown();
    });

    // Detalle (opcional)
    doc.addPage();
    doc
      .fontSize(16)
      .text("Detalle de Transacciones con Impacto Fiscal", { underline: true });
    Object.entries(detallePorAño).forEach(([año, operaciones]) => {
      doc.moveDown().fontSize(14).text(`Año ${año}`, { bold: true });
      operaciones.forEach((tx) => {
        doc
          .fontSize(10)
          .text(
            `Fecha: ${new Date(
              tx.fecha
            ).toLocaleDateString()} | ${tx.tipo.toUpperCase()} | Activo: ${
              tx.activo
            } | Cant: ${tx.cantidad} | Valor: ${tx.valorVenta.toFixed(
              2
            )} € | Coste: ${tx.costeTotal.toFixed(
              2
            )} € | Resultado: ${tx.resultado.toFixed(2)} €`
          );
      });
    });

    doc.end();
  } catch (error) {
    console.error("Error al generar PDF:", error);
    res.status(500).json({ mensaje: "Error generando PDF" });
  }
};
