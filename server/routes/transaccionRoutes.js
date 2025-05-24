import express from "express";
import {
  obtenerTransacciones,
  importarTransacciones,
  eliminarTodas,
} from "../controllers/transaccionController.js";

const router = express.Router();

router.get("/", obtenerTransacciones);
router.post("/importar", importarTransacciones);
router.delete("/eliminar-todo", eliminarTodas); // opcional para limpiar base de datos

export default router;
