import express from "express";
import { verificarToken } from "../middleware/authMiddleware.js";
import {
  obtenerResumen,
  generarPDF,
} from "../controllers/declaracionController.js";

const router = express.Router();

router.get("/resumen", verificarToken, obtenerResumen);
router.get("/pdf", verificarToken, generarPDF);

export default router;
