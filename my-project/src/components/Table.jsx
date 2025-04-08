const Table = ({ columns, data }) => {
    const formatCell = (value) => {
      if (value == null) return "N/A";
  
      // If it's an object, try to extract meaningful display value
      if (typeof value === "object") {
        // Example: { common: "Sri Lanka" }
        if (value.common) return value.common;
        if (Array.isArray(value)) return value.join(", ");
        return JSON.stringify(value);
      }
  
      return value;
    };
  
    return (
      <div className="overflow-x-auto shadow rounded-lg bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((col) => (
                <th
                  key={col}
                  className="px-4 py-2 text-left text-sm font-semibold text-gray-700"
                >
                  {col.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                {columns.map((col) => (
                  <td key={col} className="px-4 py-2 text-sm text-gray-800">
                    {formatCell(row[col])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default Table;
  