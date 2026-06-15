import { useMemo, useState } from 'react';

const gates = ['AND', 'OR', 'XOR', 'NAND', 'NOR', 'XNOR', 'NOT'];

const descriptions = {
  AND: 'Output 1 jika A dan B sama-sama 1.',
  OR: 'Output 1 jika minimal salah satu input 1.',
  XOR: 'Output 1 jika input berbeda.',
  NAND: 'Kebalikan AND.',
  NOR: 'Kebalikan OR.',
  XNOR: 'Kebalikan XOR.',
  NOT: 'Membalik input.',
  'Half Adder': 'Sum = A XOR B, Carry = A AND B.',
  'Full Adder': 'Sum = A XOR B XOR Cin, Cout = (A AND B) OR (Cin AND (A XOR B)).',
};

const isBinary = (value) => /^[01]+$/.test(value);
const padBinary = (value, width) => value.padStart(width, '0');

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

const halfAdder = (a, b) => ({
  sum: Number(a) ^ Number(b),
  carry: Number(a) & Number(b),
});

const fullAdder = (a, b, cin) => {
  const bitA = Number(a);
  const bitB = Number(b);
  const carryIn = Number(cin);
  const xorAB = bitA ^ bitB;
  return {
    sum: xorAB ^ carryIn,
    cout: (bitA & bitB) | (carryIn & xorAB),
  };
};

function evaluateInteractive(inputA, inputB, gate) {
  const a = inputA.trim();
  const b = inputB.trim();
  const usesB = gate !== 'NOT';

  if (!a || (usesB && !b)) {
    return {
      isValid: false,
      errorMessage: usesB ? 'Input A dan Input B tidak boleh kosong.' : 'Input A tidak boleh kosong.',
      paddedA: a,
      paddedB: usesB ? b : 'Unused',
      output: '',
      decimal: '-',
      rows: [],
    };
  }

  if (!isBinary(a) || (usesB && !isBinary(b))) {
    return {
      isValid: false,
      errorMessage: 'Input hanya boleh berisi angka 0 dan 1.',
      paddedA: a,
      paddedB: usesB ? b : 'Unused',
      output: '',
      decimal: '-',
      rows: [],
    };
  }

  const width = usesB ? Math.max(a.length, b.length) : a.length;
  const paddedA = padBinary(a, width);
  const paddedB = usesB ? padBinary(b, width) : 'Unused';
  const outputBits = [...paddedA].map((bitA, index) => calculateGate(gate, bitA, usesB ? paddedB[index] : '0').toString());
  const output = outputBits.join('');
  const rows = outputBits.map((bit, index) => ({
    bit: width - 1 - index,
    a: paddedA[index],
    b: usesB ? paddedB[index] : null,
    output: bit,
  }));

  return {
    isValid: true,
    errorMessage: '',
    paddedA,
    paddedB,
    output,
    decimal: parseInt(output, 2),
    rows,
  };
}

const gateRows = (gate) => {
  if (gate === 'NOT') return ['0', '1'].map((a) => [a, calculateGate(gate, a)]);
  return [
    ['0', '0'],
    ['0', '1'],
    ['1', '0'],
    ['1', '1'],
  ].map(([a, b]) => [a, b, calculateGate(gate, a, b)]);
};

const halfAdderRows = () =>
  ['00', '01', '10', '11'].map((bits) => {
    const result = halfAdder(bits[0], bits[1]);
    return [bits[0], bits[1], result.sum, result.carry];
  });

const fullAdderRows = () =>
  ['000', '001', '010', '011', '100', '101', '110', '111'].map((bits) => {
    const result = fullAdder(bits[0], bits[1], bits[2]);
    return [bits[0], bits[1], bits[2], result.sum, result.cout];
  });

const staticTables = [
  ...gates.map((gate) => ({
    name: gate,
    description: descriptions[gate],
    headers: gate === 'NOT' ? ['A', 'Output'] : ['A', 'B', 'Output'],
    rows: gateRows(gate),
  })),
  {
    name: 'Half Adder',
    description: descriptions['Half Adder'],
    headers: ['A', 'B', 'Sum', 'Carry'],
    rows: halfAdderRows(),
  },
  {
    name: 'Full Adder',
    description: descriptions['Full Adder'],
    headers: ['A', 'B', 'Cin', 'Sum', 'Cout'],
    rows: fullAdderRows(),
  },
];

export default function TruthTablePage() {
  const [inputA, setInputA] = useState('0101');
  const [inputB, setInputB] = useState('0011');
  const [gate, setGate] = useState('AND');
  const usesB = gate !== 'NOT';
  const result = useMemo(() => evaluateInteractive(inputA, inputB, gate), [inputA, inputB, gate]);

  return (
    <div className="mx-auto grid w-full max-w-full min-w-0 gap-5 overflow-x-hidden xl:max-w-7xl">
      <section className="cpu-card rounded p-5 sm:p-6">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-cyan-200/70 md:tracking-[0.28em]">
          Digital Logic Reference
        </p>
        <h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">Truth Table</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
          Pelajari tabel kebenaran lewat input biner interaktif dan referensi standar untuk gate, Half Adder, dan Full Adder.
        </p>
      </section>

      <section className="cpu-card rounded p-4 sm:p-5">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan-200/70">A</p>
            <h3 className="mt-2 text-xl font-semibold text-white">Interactive Binary Truth Table</h3>
          </div>
          <span className={`rounded border px-3 py-2 text-sm font-semibold ${result.isValid ? 'border-emerald-300/30 bg-emerald-300/10 text-emerald-100' : 'border-pink-300/30 bg-pink-300/10 text-pink-100'}`}>
            Status Input: {result.isValid ? 'Valid' : 'Tidak Valid'}
          </span>
        </div>

        <div className="mt-5 grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="grid min-w-0 gap-4">
            <div className="grid min-w-0 gap-4 md:grid-cols-2">
              <label className="min-w-0 text-sm text-slate-300">
                Input A
                <input
                  className="mt-2 h-12 w-full max-w-full rounded border border-cyan-300/20 bg-slate-950/80 px-4 font-mono text-base tracking-[0.16em] text-cyan-100 outline-none focus:border-cyan-300/60"
                  value={inputA}
                  onChange={(event) => setInputA(event.target.value)}
                  placeholder="0101"
                />
              </label>
              <label className={`min-w-0 text-sm text-slate-300 ${usesB ? '' : 'opacity-45'}`}>
                Input B
                <input
                  className="mt-2 h-12 w-full max-w-full rounded border border-cyan-300/20 bg-slate-950/80 px-4 font-mono text-base tracking-[0.16em] text-cyan-100 outline-none focus:border-cyan-300/60 disabled:cursor-not-allowed"
                  value={inputB}
                  onChange={(event) => setInputB(event.target.value)}
                  placeholder="0011"
                  disabled={!usesB}
                />
              </label>
            </div>

            <div>
              <p className="mb-3 text-sm font-semibold text-white">Pilih Gate</p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
                {gates.map((item) => (
                  <button
                    key={item}
                    className={`h-11 rounded border font-mono text-sm font-bold transition ${
                      gate === item
                        ? 'border-cyan-300/60 bg-cyan-300/15 text-cyan-100 shadow-neon'
                        : 'border-white/10 bg-white/[0.035] text-slate-300 hover:border-cyan-300/35 hover:text-cyan-100'
                    }`}
                    type="button"
                    onClick={() => setGate(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {!result.isValid && (
              <div className="rounded border border-pink-300/25 bg-pink-300/10 p-3 text-sm leading-6 text-pink-100">
                {result.errorMessage}
              </div>
            )}

            <div className="max-w-full overflow-x-auto rounded border border-cyan-300/20">
              <table className="w-full min-w-[360px] text-left font-mono text-sm">
                <thead className="bg-cyan-300/10 text-cyan-100">
                  <tr>
                    <th className="p-3">Bit</th>
                    <th className="p-3">A</th>
                    {usesB && <th className="p-3">B</th>}
                    <th className="p-3">Output</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  {result.rows.length ? (
                    result.rows.map((row) => (
                      <tr key={row.bit} className="border-t border-white/8">
                        <td className="p-3">{row.bit}</td>
                        <td className="p-3">{row.a}</td>
                        {usesB && <td className="p-3">{row.b}</td>}
                        <td className="p-3 text-cyan-100">{row.output}</td>
                      </tr>
                    ))
                  ) : (
                    <tr className="border-t border-white/8">
                      <td className="p-3 text-slate-400" colSpan={usesB ? 4 : 3}>
                        Tabel proses muncul setelah input valid.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <aside className="grid min-w-0 content-start gap-3">
            {[
              ['Input A Padding', result.paddedA || '-'],
              ['Input B Padding', result.paddedB || '-'],
              ['Gate', gate],
              ['Output Biner', result.output || '-'],
              ['Output Desimal', result.decimal],
            ].map(([label, value]) => (
              <div key={label} className="rounded border border-white/10 bg-white/[0.035] p-3">
                <p className="text-xs text-slate-400">{label}</p>
                <p className="mt-2 break-all font-mono text-xl font-bold text-cyan-100">{value}</p>
              </div>
            ))}
          </aside>
        </div>
      </section>

      <section className="grid gap-5">
        <div className="cpu-card rounded p-4 sm:p-5">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan-200/70">B</p>
          <h3 className="mt-2 text-xl font-semibold text-white">Static Truth Table Reference</h3>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
            Referensi standar untuk semua kombinasi input 1 bit. Gunakan bagian ini sebagai pembanding saat membaca hasil interaktif.
          </p>
        </div>

        <div className="grid min-w-0 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {staticTables.map((table) => (
            <section key={table.name} className="cpu-card min-w-0 rounded p-4 sm:p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h4 className="break-words font-mono text-xl font-bold text-cyan-100">{table.name}</h4>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{table.description}</p>
                </div>
                <span className="shrink-0 rounded border border-cyan-300/20 px-2 py-1 font-mono text-xs text-cyan-200/70">
                  {table.headers.length - 1} OUT
                </span>
              </div>

              <div className="mt-4 max-w-full overflow-x-auto rounded border border-cyan-300/20">
                <table className="w-full min-w-[240px] text-left font-mono text-sm">
                  <thead className="bg-cyan-300/10 text-cyan-100">
                    <tr>
                      {table.headers.map((header) => (
                        <th key={header} className="p-3">{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-slate-300">
                    {table.rows.map((row, index) => (
                      <tr key={`${table.name}-${row.join('')}-${index}`} className="border-t border-white/8">
                        {row.map((cell, cellIndex) => (
                          <td key={`${cell}-${cellIndex}`} className={`p-3 ${cellIndex >= table.headers.length - 2 ? 'text-cyan-100' : ''}`}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}
