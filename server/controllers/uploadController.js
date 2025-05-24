import XLSX from "xlsx";
import Transaccion from "../models/Transaccion.js";
import parseArchivoBingX from "../utils/parseArchivoBingX.js";

const parseArchivo = (fileBuffer, tipo, usuarioId, origen = "BingX") => {
  const workbook = XLSX.read(fileBuffer, { type: "buffer" });
  const hoja = workbook.Sheets[workbook.SheetNames[0]];
  const datos = XLSX.utils.sheet_to_json(hoja);

  return datos
    .map((fila, index) => {
      console.log(`Fila ${index + 1} cruda:`, fila);

      // Fecha - openTime o closeTime (UTC+8)
      let fechaISO = new Date(
        fila._12 ?? fila.closeTime ?? fila["closeTime(UTC+8)"]
      );
      if (isNaN(fechaISO)) fechaISO = new Date();

      // Cantidad - margin (campo _4)
      const cantidad = Number(fila._4 ?? 0);

      // Precio unitario - closePrice (campo _6)
      const precio = Number(fila._6 ?? 0);

      // ValorEUR: Para futuros usar Realized PNL (_16), para otros margin * precio
      let valorEUR = 0;
      if (tipo === "futuros" || tipo === "futuros_estandar") {
        valorEUR = Number(fila._16 ?? 0); // Realized PNL
      } else {
        valorEUR = cantidad * precio;
      }

      const activo = fila._1 ?? "GENERAL";

      console.log(
        `Cantidad: ${cantidad}, ValorEUR: ${valorEUR}, Precio: ${precio}, Fecha: ${fechaISO.toISOString()}, Activo: ${activo}`
      );

      return {
        Tipo: tipo,
        Cantidad: cantidad > 0 ? cantidad : 0,
        ValorEUR: valorEUR !== 0 ? valorEUR : 0,
        Fecha: fechaISO.toISOString(),
        activo,
        precio: precio > 0 ? precio : 0,
        usuarioId,
        origen,
      };
    })
    .filter((tx) => tx.ValorEUR !== 0); // Filtra transacciones sin impacto fiscal
};

export const procesarFuturos = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ mensaje: "Archivo no recibido" });

    const transacciones = parseArchivoBingX(
      req.file.buffer,
      "futuros",
      req.usuario._id
    );

    await Transaccion.insertMany(transacciones);

    res
      .status(200)
      .json({ mensaje: "Futuros guardados", total: transacciones.length });
  } catch (error) {
    console.error("Error al procesar futuros:", error);
    res.status(500).json({ mensaje: "Error procesando archivo de futuros" });
  }
};

export const procesarFuturosEstandar = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ mensaje: "Archivo no recibido" });
    const transacciones = parseArchivo(
      req.file.buffer,
      "futuros_estandar",
      req.usuario._id
    );
    await Transaccion.insertMany(transacciones);
    res.status(200).json({
      mensaje: "Futuros estándar guardados",
      total: transacciones.length,
    });
  } catch (error) {
    console.error("Error al procesar futuros estándar:", error);
    res
      .status(500)
      .json({ mensaje: "Error procesando archivo de futuros estándar" });
  }
};

export const procesarFiat = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ mensaje: "Archivo no recibido" });
    const transacciones = parseArchivo(
      req.file.buffer,
      "fiat",
      req.usuario._id
    );
    await Transaccion.insertMany(transacciones);
    res.status(200).json({
      mensaje: "Movimientos fiat guardados",
      total: transacciones.length,
    });
  } catch (error) {
    console.error("Error al procesar fiat:", error);
    res.status(500).json({ mensaje: "Error procesando archivo fiat" });
  }
};

export const procesarRecompensas = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ mensaje: "Archivo no recibido" });
    const transacciones = parseArchivo(
      req.file.buffer,
      "recompensa",
      req.usuario._id
    );
    await Transaccion.insertMany(transacciones);
    res
      .status(200)
      .json({ mensaje: "Recompensas guardadas", total: transacciones.length });
  } catch (error) {
    console.error("Error al procesar recompensas:", error);
    res
      .status(500)
      .json({ mensaje: "Error procesando archivo de recompensas" });
  }
};
