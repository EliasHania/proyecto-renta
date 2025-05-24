import mongoose from "mongoose";

const movimientoSchema = new mongoose.Schema({
  descripcion: { type: String, required: true },
  cantidad: { type: Number, required: true },
  tipo: { type: String, enum: ["ingreso", "gasto"], required: true },
  fecha: { type: Date, default: Date.now },
});

export default mongoose.model("Movimiento", movimientoSchema);
