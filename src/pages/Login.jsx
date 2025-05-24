import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      setError("Por favor, completa todos los campos.");
      return;
    }

    // Simulación de autenticación
    if (email === "admin@renta.com" && password === "123456") {
      localStorage.setItem("token", "token_simulado_123"); // Simulación de token
      navigate("/dashboard");
    } else {
      setError("Credenciales incorrectas.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Correo electrónico
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
            autoComplete="email"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Acceder
        </button>
      </form>
    </div>
  );
};

export default Login;
