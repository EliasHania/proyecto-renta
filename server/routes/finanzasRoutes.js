import express from "express";
import { obtenerResumenFinanzas } from "../controllers/finanzasController.js";
import { verificarToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Ruta para obtener resumen financiero (protegida con token)
router.get("/resumen", verificarToken, obtenerResumenFinanzas);

// Si quieres implementar otras rutas como obtenerFinanzas,
// tendrás que definir esa función y luego agregarla aquí.

export default router;
