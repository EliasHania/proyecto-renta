import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SelectorMoneda from "../components/SelectorMoneda";

const Dashboard = () => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [resumenFinanciero, setResumenFinanciero] = useState(null);

  const handleMonedaChange = (nuevaMoneda) => {
    console.log("Moneda seleccionada:", nuevaMoneda);
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

  useEffect(() => {
    const fetchResumen = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/finanzas/resumen`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) throw new Error("Error al obtener resumen financiero");
        const data = await res.json();
        setResumenFinanciero(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchResumen();
  }, []);

  if (cargando) return <p className="p-4">Cargando dashboard...</p>;
  if (error)
    return <div className="p-4 text-red-600 font-semibold">❌ {error}</div>;

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Bienvenido, {usuario?.nombre} 👋
          </h2>
          <p className="text-sm text-gray-500">{usuario?.email}</p>
        </div>
        <SelectorMoneda onChange={handleMonedaChange} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded shadow p-4">
          <h3 className="text-lg font-semibold text-gray-700">
            Ganancias Cripto
          </h3>
          <p className="text-2xl text-green-600 font-bold">
            {resumenFinanciero
              ? `+€${Number(resumenFinanciero.ganancias).toFixed(2)}`
              : "+€0.00"}
          </p>
        </div>
        <div className="bg-white rounded shadow p-4">
          <h3 className="text-lg font-semibold text-gray-700">
            Gastos del Mes
          </h3>
          <p className="text-2xl text-red-600 font-bold">
            {resumenFinanciero
              ? `-€${Number(resumenFinanciero.gastos).toFixed(2)}`
              : "-€0.00"}
          </p>
        </div>
        <div className="bg-white rounded shadow p-4">
          <h3 className="text-lg font-semibold text-gray-700">
            Saldo disponible
          </h3>
          <p className="text-2xl text-blue-600 font-bold">
            {resumenFinanciero
              ? `€${Number(resumenFinanciero.saldo).toFixed(2)}`
              : "€0.00"}
          </p>
        </div>
      </div>

      <div className="bg-white rounded shadow p-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">
          Accesos rápidos
        </h3>
        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 mb-4">
          <li>Importar transacciones cripto para declarar</li>
          <li>Registrar nuevos ingresos/gastos</li>
          <li>Generar y descargar informe fiscal en PDF</li>
        </ul>
        <Link
          to="/wizard"
          className="inline-block mt-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded text-sm font-medium"
        >
          Ir al Asistente Fiscal
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
