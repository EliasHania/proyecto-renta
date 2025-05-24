import XLSX from "xlsx";

const parseArchivoBingX = (fileBuffer, tipo, usuarioId, origen = "BingX") => {
  const workbook = XLSX.read(fileBuffer, { type: "buffer" });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(sheet, { defval: "" });

  return data
    .map((row, index) => {
      // Fecha de la operación: openTime(UTC+8)
      let fecha = new Date(row["openTime(UTC+8)"] ?? row._12 ?? "");
      if (isNaN(fecha)) fecha = new Date();

      // Cantidad operada: margin
      const cantidad = Number(row.margin ?? row._4 ?? 0);

      // Precio unitario: closePrice
      const precio = Number(row.closePrice ?? row._6 ?? 0);

      // Valor total aproximado = cantidad * precio
      const valorEUR = cantidad * precio;

      // Activo: category
      const activo = row.category ?? row._1 ?? "GENERAL";

      // Filtrar valores inválidos
      if (cantidad <= 0 || valorEUR <= 0) {
        console.log(
          `Fila ${
            index + 2
          } descartada: cantidad=${cantidad}, valorEUR=${valorEUR}`
        );
        return null;
      }

      return {
        Tipo: tipo,
        Cantidad: cantidad,
        ValorEUR: valorEUR,
        Fecha: fecha.toISOString(),
        activo,
        precio,
        usuarioId,
        origen,
      };
    })
    .filter((tx) => tx !== null);
};

export default parseArchivoBingX;
