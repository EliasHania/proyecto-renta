// server/routes/resumenRoutes.js
import express from "express";
import { verificarToken } from "../middleware/authMiddleware.js";
import { getResumenFiscal } from "../controllers/resumenController.js";

const router = express.Router();

router.get("/resumen", verificarToken, getResumenFiscal);

export default router;
