import { useEffect, useState } from "react";
import SelectorMoneda from "../components/SelectorMoneda";

const Dashboard = () => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const handleMonedaChange = (nuevaMoneda) => {
    console.log("Moneda seleccionada:", nuevaMoneda);
    // Puedes guardar en contexto más adelante si lo necesitas
  };

  useEffect(() => {
    const obtenerUsuario = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No hay sesión activa.");
        setCargando(false);
        return;
      }

      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("No autorizado o token inválido");

        const data = await res.json();
        setUsuario(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    obtenerUsuario();
  }, []);

  if (cargando) return <p className="p-4">Cargando dashboard...</p>;

  if (error)
    return <div className="p-4 text-red-600 font-semibold">❌ {error}</div>;

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Bienvenido, {usuario.nombre} 👋
          </h2>
          <p className="text-sm text-gray-500">{usuario.email}</p>
        </div>
        <SelectorMoneda onChange={handleMonedaChange} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded shadow p-4">
          <h3 className="text-lg font-semibold text-gray-700">
            Ganancias Cripto
          </h3>
          <p className="text-2xl text-green-600 font-bold">+€109,30</p>
        </div>

        <div className="bg-white rounded shadow p-4">
          <h3 className="text-lg font-semibold text-gray-700">
            Gastos del Mes
          </h3>
          <p className="text-2xl text-red-600 font-bold">-€560,00</p>
        </div>

        <div className="bg-white rounded shadow p-4">
          <h3 className="text-lg font-semibold text-gray-700">
            Saldo disponible
          </h3>
          <p className="text-2xl text-blue-600 font-bold">€3.420,00</p>
        </div>
      </div>

      <div className="bg-white rounded shadow p-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">
          Accesos rápidos
        </h3>
        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
          <li>Importar transacciones cripto para declarar</li>
          <li>Registrar nuevos ingresos/gastos</li>
          <li>Generar y descargar informe fiscal en PDF</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
