import Transaccion from "../models/Transaccion.js";
import PDFDocument from "pdfkit";

// 🧠 Función auxiliar: agrupa ganancias/pérdidas por año (FIFO simulado)
const calcularResumenFiscal = async () => {
  const transacciones = await Transaccion.find().sort({ Fecha: 1 }).lean();

  const inventario = {};
  const resumen = {};

  for (const tx of transacciones) {
    const año = new Date(tx.Fecha).getFullYear();
    const activo = tx.activo || "GENERAL";

    // Categoría simplificada para ejemplo
    let categoria = "otros";
    if (tx.Tipo === "compra" || tx.Tipo === "venta")
      categoria = "cripto-cripto";
    else if (tx.Tipo === "fiat") categoria = "cripto-fiat";
    else if (tx.Tipo === "futuros" || tx.Tipo === "futuros_estandar")
      categoria = "derivados";
    else if (tx.Tipo === "recompensa") categoria = "ingresos";

    if (!resumen[año]) resumen[año] = {};
    if (!resumen[año][categoria])
      resumen[año][categoria] = { ganancias: 0, perdidas: 0, count: 0 };
    if (!inventario[activo]) inventario[activo] = [];

    console.log(
      `Procesando tx: tipo=${tx.Tipo}, cantidad=${tx.Cantidad}, valorEUR=${tx.ValorEUR}, año=${año}, activo=${activo}`
    );

    if (
      tx.Tipo === "compra" ||
      tx.Tipo === "fiat" ||
      tx.Tipo === "recompensa"
    ) {
      if (tx.Cantidad > 0 && tx.ValorEUR > 0) {
        const valorUnitario = tx.ValorEUR / tx.Cantidad;
        console.log(
          `Añadiendo lote a inventario: cantidad=${
            tx.Cantidad
          }, valorUnitario=${valorUnitario.toFixed(4)}`
        );
        inventario[activo].push({
          cantidad: tx.Cantidad,
          valorUnitario,
        });
      } else {
        console.warn(
          `Transacción inválida para inventario: cantidad=${tx.Cantidad}, valorEUR=${tx.ValorEUR}`
        );
      }
    } else if (
      tx.Tipo === "venta" ||
      tx.Tipo === "futuros" ||
      tx.Tipo === "futuros_estandar"
    ) {
      let cantidadRestante = tx.Cantidad;
      let costeTotal = 0;

      console.log(`Venta de ${cantidadRestante} unidades de ${activo}`);

      while (cantidadRestante > 0 && inventario[activo].length) {
        const lote = inventario[activo][0];
        const usado = Math.min(lote.cantidad, cantidadRestante);
        costeTotal += usado * lote.valorUnitario;
        lote.cantidad -= usado;
        cantidadRestante -= usado;

        console.log(
          `Usado ${usado} de lote con valorUnitario ${lote.valorUnitario.toFixed(
            4
          )}, queda cantidad ${lote.cantidad}`
        );

        if (lote.cantidad <= 0) {
          inventario[activo].shift();
          console.log(`Lote agotado, eliminado del inventario`);
        }
      }

      const valorVenta = tx.ValorEUR;
      const ganancia = valorVenta - costeTotal;

      console.log(
        `Coste total: ${costeTotal.toFixed(
          2
        )}, valor venta: ${valorVenta.toFixed(2)}, ganancia: ${ganancia.toFixed(
          2
        )}`
      );

      if (ganancia >= 0) {
        resumen[año][categoria].ganancias += ganancia;
      } else {
        resumen[año][categoria].perdidas += Math.abs(ganancia);
      }
      resumen[año][categoria].count += 1;
    }
  }

  console.log("Resumen final:", resumen);
  return resumen;
};

// 📊 GET /api/declaracion/resumen
export const obtenerResumen = async (req, res) => {
  try {
    const resumen = await calcularResumenFiscal();
    res.json(resumen);
  } catch (error) {
    console.error("❌ Error en obtenerResumen:", error.message);
    res.status(500).json({ mensaje: "Error al generar resumen fiscal" });
  }
};

// 📄 GET /api/declaracion/pdf
export const generarPDF = async (req, res) => {
  try {
    const resumen = await calcularResumenFiscal();

    const doc = new PDFDocument({ margin: 50, size: "A4" });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=Informe-Fiscal-${new Date().getFullYear()}.pdf`
    );

    doc.pipe(res);

    doc
      .fontSize(20)
      .text("Informe Fiscal - Proyecto Renta", { align: "center" });
    doc.moveDown();

    for (const año of Object.keys(resumen).sort()) {
      doc.fontSize(16).text(`🗓️ Año: ${año}`);
      doc.moveDown(0.5);

      doc.fontSize(12);
      doc.text(
        "Categoría".padEnd(25) +
          "Ganancias (€)".padEnd(20) +
          "Pérdidas (€)".padEnd(20) +
          "Operaciones"
      );
      doc.moveDown(0.3);

      const categorias = resumen[año];

      for (const [cat, datos] of Object.entries(categorias)) {
        doc.text(
          cat.padEnd(25) +
            datos.ganancias.toFixed(2).padEnd(20) +
            datos.perdidas.toFixed(2).padEnd(20) +
            datos.count
        );
      }
      doc.moveDown(1);
    }

    doc.addPage();
    doc.fontSize(14).text("Notas y explicación:", { underline: true });
    doc.moveDown();
    doc
      .fontSize(12)
      .text(
        `Este informe ha sido generado usando la metodología FIFO para el cálculo de ganancias y pérdidas.\n` +
          `Se han considerado costes de adquisición y comisiones incluidas en las operaciones.\n` +
          `Los datos mostrados son aproximados y deben ser revisados por un asesor fiscal.\n` +
          `El usuario debe asegurarse del cumplimiento con la normativa vigente de la AEAT.\n`
      );

    doc.end();
  } catch (error) {
    console.error("❌ Error en generarPDF:", error.message);
    res.status(500).json({ mensaje: "Error al generar el PDF" });
  }
};
