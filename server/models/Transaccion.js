import mongoose from "mongoose";

const transaccionSchema = new mongoose.Schema(
  {
    Tipo: String,
    Cantidad: Number,
    ValorEUR: Number,
    Fecha: String,
    // Puedes agregar más campos definidos si quieres, o dejarlo abierto
  },
  { strict: false, timestamps: true } // Permite campos dinámicos desde el CSV
);

export default mongoose.model("Transaccion", transaccionSchema);
