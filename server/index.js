// server/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import finanzasRoutes from "./routes/finanzasRoutes.js"; // ✅ Nueva ruta
import transaccionRoutes from "./routes/transaccionRoutes.js"; // ✅ Ruta para cripto

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexión MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error de conexión:", err));

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("API Proyecto Renta funcionando");
});

// Rutas API
app.use("/api/finanzas", finanzasRoutes); // ✅ Aquí conectamos las rutas de finanzas
app.use("/api/transacciones", transaccionRoutes); // ✅ Aquí conectamos las rutas de transacciones cripto

// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
