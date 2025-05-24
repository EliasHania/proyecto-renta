import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const verificarToken = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) return res.status(401).json({ mensaje: "Token requerido" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const usuario = await User.findById(decoded.id).select("-password");

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    console.error("Error de autenticación:", error.message);
    return res.status(401).json({ mensaje: "Token inválido o expirado" });
  }
};
