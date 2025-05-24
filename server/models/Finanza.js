import mongoose from "mongoose";

const finanzaSchema = new mongoose.Schema(
  {
    descripcion: {
      type: String,
      required: true,
    },
    cantidad: {
      type: Number,
      required: true,
    },
    tipo: {
      type: String,
      enum: ["ingreso", "gasto"],
      required: true,
    },
    fecha: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Finanza", finanzaSchema);
