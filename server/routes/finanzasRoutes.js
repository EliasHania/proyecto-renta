import express from "express";
import {
  obtenerMovimientos,
  crearMovimiento,
  eliminarMovimiento,
} from "../controllers/finanzasController.js";

const router = express.Router();

router.get("/", obtenerMovimientos);
router.post("/", crearMovimiento);
router.delete("/:id", eliminarMovimiento);

export default router;
