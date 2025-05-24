// server/controllers/authController.js
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { nombre, email, password } = req.body;
  try {
    const usuarioExistente = await User.findOne({ email });
    if (usuarioExistente)
      return res
        .status(400)
        .json({ mensaje: "Ya existe un usuario con ese email." });

    const hash = await bcrypt.hash(password, 10);
    const nuevoUsuario = new User({ nombre, email, password: hash });
    await nuevoUsuario.save();

    res.status(201).json({ mensaje: "Usuario creado con éxito" });
  } catch (err) {
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const usuario = await User.findOne({ email });
    if (!usuario || !usuario.password)
      return res.status(400).json({ mensaje: "Credenciales inválidas" });

    const coincide = await bcrypt.compare(password, usuario.password);
    if (!coincide)
      return res.status(400).json({ mensaje: "Credenciales inválidas" });

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({
      token,
      usuario: {
        id: usuario._id,
        email: usuario.email,
        nombre: usuario.nombre,
      },
    });
  } catch (err) {
    res.status(500).json({ mensaje: "Error al iniciar sesión" });
  }
};
