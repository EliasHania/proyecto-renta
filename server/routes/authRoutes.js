import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { register, login } from "../controllers/authController.js";

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

      const frontendURL = process.env.FRONTEND_URL || "http://localhost:5173";
      res.redirect(`${frontendURL}/login?token=${token}`);
    } catch (err) {
      console.error("❌ Error al generar token JWT:", err);
      res.status(500).send("Error generando token");
    }
  }
);

export default router;
