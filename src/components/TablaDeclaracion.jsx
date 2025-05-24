const TablaDeclaracion = ({ transacciones }) => {
  if (!transacciones || transacciones.length === 0) {
    return <p className="text-sm text-gray-500">No hay datos cargados.</p>;
  }

  const columnas = Object.keys(transacciones[0]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm border">
        <thead className="bg-gray-100">
          <tr>
            {columnas.map((col) => (
              <th
                key={col}
                className="px-4 py-2 border text-left font-semibold capitalize"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {transacciones.slice(0, 10).map((tx, index) => (
            <tr key={index} className="hover:bg-gray-50">
              {columnas.map((col) => (
                <td key={col} className="px-4 py-2 border">
                  {tx[col]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {transacciones.length > 10 && (
        <p className="text-xs text-gray-500 mt-2">
          Mostrando solo las primeras 10 filas...
        </p>
      )}
    </div>
  );
};

export default TablaDeclaracion;
