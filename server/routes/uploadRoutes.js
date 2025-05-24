// server/routes/uploadRoutes.js
import express from "express";
import multer from "multer";
import { verificarToken } from "../middleware/authMiddleware.js";
import {
  procesarFuturos,
  procesarFuturosEstandar,
  procesarFiat,
  procesarRecompensas,
} from "../controllers/uploadController.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  "/futuros",
  verificarToken,
  upload.single("archivo"),
  procesarFuturos
);
router.post(
  "/futurosEstandar",
  verificarToken,
  upload.single("archivo"),
  procesarFuturosEstandar
);
router.post("/fiat", verificarToken, upload.single("archivo"), procesarFiat);
router.post(
  "/recompensas",
  verificarToken,
  upload.single("archivo"),
  procesarRecompensas
);

export default router;
