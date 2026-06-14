const gates = [
  { name: 'AND', description: 'Output 1 jika semua input 1.' },
  { name: 'OR', description: 'Output 1 jika minimal satu input 1.' },
  { name: 'XOR', description: 'Output 1 jika input berbeda.' },
  { name: 'NAND', description: 'Kebalikan AND.' },
  { name: 'NOR', description: 'Kebalikan OR.' },
  { name: 'XNOR', description: 'Kebalikan XOR.' },
  { name: 'NOT', description: 'Membalik input.' },
];

const calculateGate = (gate, a, b = '0') => {
  const bitA = Number(a);
  const bitB = Number(b);

  if (gate === 'AND') return bitA & bitB;
  if (gate === 'OR') return bitA | bitB;
  if (gate === 'XOR') return bitA ^ bitB;
  if (gate === 'NAND') return Number(!(bitA & bitB));
  if (gate === 'NOR') return Number(!(bitA | bitB));
  if (gate === 'XNOR') return Number(!(bitA ^ bitB));
  if (gate === 'NOT') return Number(!bitA);
  return 0;
};

const rowsFor = (gate) => {
  if (gate === 'NOT') return ['0', '1'].map((a) => ({ a, output: calculateGate(gate, a) }));
  return [
    ['0', '0'],
    ['0', '1'],
    ['1', '0'],
    ['1', '1'],
  ].map(([a, b]) => ({ a, b, output: calculateGate(gate, a, b) }));
};

export default function TruthTablePage() {
  return (
    <div className="mx-auto grid max-w-7xl gap-5">
      <section className="cpu-card rounded p-5 sm:p-6">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-200/70">Digital Logic Reference</p>
        <h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">Truth Table</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
          Tabel kebenaran lengkap untuk gerbang logika dasar dengan input biner 0 dan 1.
        </p>
      </section>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {gates.map((gate) => {
          const isNot = gate.name === 'NOT';
          return (
            <section key={gate.name} className="cpu-card rounded p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-mono text-xl font-bold text-cyan-100">{gate.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{gate.description}</p>
                </div>
                <span className="rounded border border-cyan-300/20 px-2 py-1 font-mono text-xs text-cyan-200/70">
                  {isNot ? '1-IN' : '2-IN'}
                </span>
              </div>

              <div className="mt-4 overflow-x-auto rounded border border-cyan-300/20">
                <table className="w-full min-w-[240px] text-left font-mono text-sm">
                  <thead className="bg-cyan-300/10 text-cyan-100">
                    <tr>
                      <th className="p-3">A</th>
                      {!isNot && <th className="p-3">B</th>}
                      <th className="p-3">Output</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300">
                    {rowsFor(gate.name).map((row) => (
                      <tr key={`${gate.name}-${row.a}-${row.b ?? 'not'}`} className="border-t border-white/8">
                        <td className="p-3">{row.a}</td>
                        {!isNot && <td className="p-3">{row.b}</td>}
                        <td className="p-3 text-cyan-100">{row.output}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
