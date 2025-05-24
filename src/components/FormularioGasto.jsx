import { useState } from "react";

const FormularioGasto = () => {
  const [descripcion, setDescripcion] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [tipo, setTipo] = useState("gasto");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!descripcion || !cantidad || isNaN(cantidad)) {
      setMensaje("Completa todos los campos correctamente.");
      return;
    }

    const nuevoMovimiento = {
      id: Date.now(),
      descripcion,
      cantidad: parseFloat(cantidad),
      tipo,
      fecha: new Date().toISOString(),
    };

    const guardados = JSON.parse(localStorage.getItem("movimientos") || "[]");
    localStorage.setItem(
      "movimientos",
      JSON.stringify([...guardados, nuevoMovimiento])
    );

    setDescripcion("");
    setCantidad("");
    setTipo("gasto");
    setMensaje("Movimiento registrado con éxito ✅");
    setTimeout(() => setMensaje(""), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {mensaje && <p className="text-sm text-green-600">{mensaje}</p>}

      <div>
        <label htmlFor="descripcion" className="block text-sm font-medium mb-1">
          Descripción
        </label>
        <input
          id="descripcion"
          name="descripcion"
          type="text"
          className="w-full border px-3 py-2 rounded"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="cantidad" className="block text-sm font-medium mb-1">
          Cantidad (€)
        </label>
        <input
          id="cantidad"
          name="cantidad"
          type="number"
          className="w-full border px-3 py-2 rounded"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="tipo" className="block text-sm font-medium mb-1">
          Tipo
        </label>
        <select
          id="tipo"
          name="tipo"
          className="w-full border px-3 py-2 rounded"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        >
          <option value="gasto">Gasto</option>
          <option value="ingreso">Ingreso</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
      >
        Guardar
      </button>
    </form>
  );
};

export default FormularioGasto;
