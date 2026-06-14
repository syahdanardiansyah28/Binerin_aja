export default function BitTable({ result }) {
  if (!result?.bitTable?.length) return null;

  const headersByOperation = {
    ADD: ['Bit', 'A', 'B', 'Carry In', 'Result', 'Carry Out'],
    SUB: ['Bit', 'A', 'B', 'Borrow In', 'Result', 'Borrow Out'],
    INC: ['Bit', 'A', '+1', 'Carry In', 'Result', 'Carry Out'],
    DEC: ['Bit', 'A', '-1', 'Borrow In', 'Result', 'Borrow Out'],
    AND: ['Bit', 'A', 'B', 'Result'],
    OR: ['Bit', 'A', 'B', 'Result'],
    XOR: ['Bit', 'A', 'B', 'Result'],
    NOT: ['Bit', 'A', 'Result'],
  };
  const headers = headersByOperation[result.operation] || headersByOperation.ADD;
  const valueFor = (row, header) => {
    if (header === 'Bit') return row.bit;
    if (header === 'A') return row.a;
    if (header === 'B') return row.b;
    if (header === '+1') return row.b;
    if (header === '-1') return row.b;
    if (header === 'Carry In') return row.carryIn;
    if (header === 'Carry Out') return row.carryOut;
    if (header === 'Borrow In') return row.borrowIn;
    if (header === 'Borrow Out') return row.borrowOut;
    if (header === 'Result') return row.result;
    return '';
  };

  return (
    <section className="cpu-card w-full max-w-full min-w-0 rounded p-4 md:p-5">
      <h3 className="mb-4 text-lg font-semibold text-white">Bit by Bit Table</h3>
      <div className="max-w-full overflow-x-auto">
        <table className="min-w-max border-collapse text-sm">
          <thead>
            <tr className="border-b border-cyan-300/20 text-left text-cyan-100">
              {headers.map((head) => (
                <th key={head} className="px-3 py-3 font-mono font-semibold">{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {result.bitTable.map((row) => (
              <tr key={row.bit} className="border-b border-white/8 text-slate-300">
                {headers.map((head) => (
                  <td key={head} className={`px-3 py-3 font-mono ${head === 'Result' ? 'text-cyan-100' : ''}`}>
                    {valueFor(row, head)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
