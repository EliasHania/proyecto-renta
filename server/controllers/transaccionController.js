// server/controllers/transaccionController.js
import Transaccion from "../models/Transaccion.js";

// GET /api/transacciones
export const obtenerTransacciones = async (req, res) => {
  try {
    const datos = await Transaccion.find().sort({ createdAt: -1 });
    res.json(datos);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener transacciones." });
  }
};

// POST /api/transacciones/importar
export const importarTransacciones = async (req, res) => {
  try {
    const transacciones = req.body;

    if (!Array.isArray(transacciones) || transacciones.length === 0) {
      return res
        .status(400)
        .json({ mensaje: "No hay datos válidos para importar." });
    }

    const resultado = await Transaccion.insertMany(transacciones);
    res.status(201).json(resultado);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al importar transacciones." });
  }
};

// DELETE /api/transacciones/eliminar-todo
export const eliminarTodas = async (req, res) => {
  try {
    await Transaccion.deleteMany();
    res.json({ mensaje: "Todas las transacciones han sido eliminadas." });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar transacciones." });
  }
};
