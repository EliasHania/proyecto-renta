import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const GraficoFinanzas = () => {
  const [data, setData] = useState([
    { tipo: "Ingresos", total: 0 },
    { tipo: "Gastos", total: 0 },
  ]);

  useEffect(() => {
    const movimientos = JSON.parse(localStorage.getItem("movimientos") || "[]");
    const totalIngresos = movimientos
      .filter((m) => m.tipo === "ingreso")
      .reduce((acc, curr) => acc + curr.cantidad, 0);
    const totalGastos = movimientos
      .filter((m) => m.tipo === "gasto")
      .reduce((acc, curr) => acc + curr.cantidad, 0);

    setData([
      { tipo: "Ingresos", total: totalIngresos },
      { tipo: "Gastos", total: totalGastos },
    ]);
  }, []);

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="tipo" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="total" fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default GraficoFinanzas;
