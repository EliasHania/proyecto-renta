// server/models/TransaccionCripto.js
import mongoose from "mongoose";

const transaccionCriptoSchema = new mongoose.Schema(
  {
    tipo: { type: String, required: true },
    cantidad: { type: Number, required: true },
    valorEUR: { type: Number, required: true },
    fecha: { type: Date, required: true },
    moneda: { type: String },
    exchange: { type: String },
    usuario: { type: String }, // Por si más adelante se usa autenticación
  },
  { timestamps: true }
);

export default mongoose.model("TransaccionCripto", transaccionCriptoSchema);
