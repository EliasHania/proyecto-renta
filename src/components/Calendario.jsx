import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Calendario = ({ onChange, fechaInicial = null }) => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(fechaInicial);

  const manejarCambio = (fecha) => {
    setFechaSeleccionada(fecha);
    if (onChange) onChange(fecha);
  };

  return (
    <div className="text-sm text-gray-700">
      <label htmlFor="calendario" className="block mb-1 font-medium">
        Selecciona una fecha:
      </label>
      <DatePicker
        id="calendario"
        selected={fechaSeleccionada}
        onChange={manejarCambio}
        dateFormat="dd/MM/yyyy"
        className="border px-3 py-2 rounded w-full"
        placeholderText="Elige una fecha"
        isClearable
      />
    </div>
  );
};

export default Calendario;
