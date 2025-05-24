// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800">Proyecto Renta</h1>
      <nav className="flex space-x-4 text-sm">
        <Link to="/dashboard" className="text-gray-700 hover:underline">
          Dashboard
        </Link>
        <Link to="/wizard" className="text-gray-700 hover:underline">
          Declaración Fiscal
        </Link>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm"
        >
          Cerrar sesión
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
