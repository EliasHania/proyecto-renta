// server/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    nombre: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // vacío si solo usa Google
    googleId: { type: String }, // opcional, para login con Google
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
