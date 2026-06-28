export default function DataTable({ headers, rows, emptyText = 'Belum ada data.' }) {
  return (
    <div className="overflow-x-auto rounded-md border border-white/10">
      <table className="w-full min-w-[360px] border-collapse text-left font-mono text-sm">
        <thead className="bg-white/[0.04] text-linear-text">
          <tr>
            {headers.map((header) => (
              <th key={header} className="px-3 py-3 font-normal">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-linear-muted">
          {rows.length ? (
            rows.map((row, rowIndex) => (
              <tr key={row.join('-') || rowIndex} className="border-t border-white/10">
                {row.map((cell, cellIndex) => (
                  <td key={`${cell}-${cellIndex}`} className="px-3 py-3">
                    {cell}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr className="border-t border-white/10">
              <td className="px-3 py-3 text-linear-subtle" colSpan={headers.length}>
                {emptyText}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
