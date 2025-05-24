// server/routes/pdfRoutes.js
import express from "express";
import { verificarToken } from "../middleware/authMiddleware.js";
import { generarPDF } from "../controllers/pdfController.js";

const router = express.Router();

router.get("/pdf", verificarToken, generarPDF);

export default router;
