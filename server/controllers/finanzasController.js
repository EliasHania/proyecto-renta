// server/controllers/finanzasController.js
import Finanza from "../models/Finanza.js";

// Obtener todas las finanzas
export const obtenerFinanzas = async (req, res) => {
  try {
    const finanzas = await Finanza.find().sort({ fecha: -1 });
    res.json(finanzas);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener finanzas" });
  }
};

// Crear nueva entrada
export const crearFinanza = async (req, res) => {
  try {
    const nueva = new Finanza(req.body);
    const guardada = await nueva.save();
    res.status(201).json(guardada);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al guardar" });
  }
};

// Eliminar por ID
export const eliminarFinanza = async (req, res) => {
  try {
    const { id } = req.params;
    await Finanza.findByIdAndDelete(id);
    res.json({ mensaje: "Eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ mensaje: "Error al eliminar" });
  }
};
