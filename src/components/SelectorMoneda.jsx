import { useState } from "react";

const SelectorMoneda = ({ onChange }) => {
  const [moneda, setMoneda] = useState("EUR");

  const monedasDisponibles = ["EUR", "USD", "BTC", "ETH"];

  const manejarCambio = (e) => {
    const nueva = e.target.value;
    setMoneda(nueva);
    if (onChange) onChange(nueva);
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="moneda" className="text-sm font-medium text-gray-600">
        Moneda:
      </label>
      <select
        id="moneda"
        name="moneda"
        value={moneda}
        onChange={manejarCambio}
        className="border border-gray-300 rounded px-2 py-1 text-sm"
      >
        {monedasDisponibles.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectorMoneda;
