import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-5xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-6">Página no encontrada.</p>
      <Link
        to="/dashboard"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Volver al dashboard
      </Link>
    </div>
  );
};

export default NotFound;
