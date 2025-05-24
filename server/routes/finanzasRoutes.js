import express from "express";
import {
  obtenerFinanzas,
  crearFinanza,
  eliminarFinanza,
} from "../controllers/finanzasController.js";

const router = express.Router();

router.get("/", obtenerFinanzas);
router.post("/", crearFinanza);
router.delete("/:id", eliminarFinanza);

export default router;
