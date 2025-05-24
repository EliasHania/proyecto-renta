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
import uploadRoutes from "./routes/uploadRoutes.js";
import declaracionRoutes from "./routes/declaracionRoutes.js";

dotenv.config();

const app = express();

// ✅ CORS flexible para desarrollo y producción
const whitelist = [
  "http://localhost:5173",
  "https://proyecto-renta.netlify.app",
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || whitelist.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("No permitido por CORS"));
      }
    },
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
app.use("/api/auth", authRoutes);
app.use("/api/finanzas", finanzasRoutes);
app.use("/api/transacciones", transaccionRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/declaracion", declaracionRoutes); // Aquí están resumen y pdf

// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
