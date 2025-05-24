import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

// Páginas
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DeclaracionCripto from "./pages/DeclaracionCripto";
import FinanzasPersonales from "./pages/FinanzasPersonales";
import InformePDF from "./pages/InformePDF";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta pública */}
        <Route path="/login" element={<Login />} />

        {/* Rutas protegidas bajo layout */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="declaracion" element={<DeclaracionCripto />} />
          <Route path="finanzas" element={<FinanzasPersonales />} />
          <Route path="informe" element={<InformePDF />} />
        </Route>

        {/* Página 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
