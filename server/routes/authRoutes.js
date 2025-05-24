import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { register, login } from "../controllers/authController.js";
import { verificarToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Registro clásico
router.post("/register", register);

// Login clásico con email y contraseña
router.post("/login", login);

// Ruta de inicio de sesión con Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback de Google (genera el JWT y redirige al frontend)
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  (req, res) => {
    try {
      const token = jwt.sign(
        {
          id: req.user._id,
          nombre: req.user.nombre,
          email: req.user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      // 🔁 Redirección inteligente según origen
      const isLocalhost = req.headers.host.includes("localhost");
      const frontendURL = isLocalhost
        ? "http://localhost:5173"
        : process.env.FRONTEND_URL || "https://proyecto-renta.netlify.app";

      res.redirect(`${frontendURL}/login?token=${token}`);
    } catch (err) {
      console.error("❌ Error al generar token JWT:", err);
      res.status(500).send("Error generando token");
    }
  }
);

// Ruta protegida para obtener datos del usuario autenticado
router.get("/me", verificarToken, (req, res) => {
  res.json(req.usuario);
});

export default router;
