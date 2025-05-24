import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkClass =
    "block px-4 py-2 rounded hover:bg-blue-100 text-gray-700 font-medium";

  const activeClass =
    "block px-4 py-2 rounded bg-blue-500 text-white font-semibold";

  return (
    <aside className="w-60 bg-white border-r p-4 space-y-2">
      <nav className="flex flex-col gap-2">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => (isActive ? activeClass : linkClass)}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/declaracion"
          className={({ isActive }) => (isActive ? activeClass : linkClass)}
        >
          Declaración Cripto
        </NavLink>
        <NavLink
          to="/finanzas"
          className={({ isActive }) => (isActive ? activeClass : linkClass)}
        >
          Finanzas Personales
        </NavLink>
        <NavLink
          to="/informe"
          className={({ isActive }) => (isActive ? activeClass : linkClass)}
        >
          Informe PDF
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
