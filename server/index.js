// server/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";

import "./config/passport.js"; // ✅ Configuración de Google Strategy
import authRoutes from "./routes/authRoutes.js";
import finanzasRoutes from "./routes/finanzasRoutes.js";
import transaccionRoutes from "./routes/transaccionRoutes.js";

dotenv.config();

const app = express();

// CORS con origen específico
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());

// 🔐 Configuración de sesión (requerida por Passport)
app.use(
  session({
    secret: "clave_secreta_oauth",
    resave: false,
    saveUninitialized: false,
  })
);

// Inicializar Passport
app.use(passport.initialize());
app.use(passport.session());

// Conexión MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error de conexión:", err));

// Ruta base
app.get("/", (req, res) => {
  res.send("API Proyecto Renta funcionando");
});

// Rutas API
app.use("/api/auth", authRoutes); // ✅ Autenticación: login, register, Google
app.use("/api/finanzas", finanzasRoutes);
app.use("/api/transacciones", transaccionRoutes);

// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
