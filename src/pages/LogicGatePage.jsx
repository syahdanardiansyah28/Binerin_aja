import { useMemo, useState } from 'react';
import LogicGateSymbol from '../components/LogicGateSymbol';

const gates = ['AND', 'OR', 'XOR', 'NAND', 'NOR', 'XNOR', 'NOT'];

const explanations = {
  AND: 'Output 1 jika semua input bernilai 1.',
  OR: 'Output 1 jika minimal satu input bernilai 1.',
  XOR: 'Output 1 jika input berbeda.',
  NAND: 'Kebalikan AND, output 0 hanya saat semua input 1.',
  NOR: 'Kebalikan OR, output 1 hanya saat semua input 0.',
  XNOR: 'Kebalikan XOR, output 1 jika input sama.',
  NOT: 'Membalik input A: 0 menjadi 1, dan 1 menjadi 0.',
};

const calculateGate = (gate, a, b) => {
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

const truthRows = (gate) => {
  if (gate === 'NOT') {
    return ['0', '1'].map((a) => ({ a, output: calculateGate(gate, a, '0') }));
  }

  return [
    ['0', '0'],
    ['0', '1'],
    ['1', '0'],
    ['1', '1'],
  ].map(([a, b]) => ({ a, b, output: calculateGate(gate, a, b) }));
};

export default function LogicGatePage() {
  const [inputA, setInputA] = useState('1');
  const [inputB, setInputB] = useState('0');
  const [gate, setGate] = useState('AND');
  const isNot = gate === 'NOT';
  const output = useMemo(() => calculateGate(gate, inputA, inputB), [gate, inputA, inputB]);
  const rows = useMemo(() => truthRows(gate), [gate]);

  return (
    <div className="mx-auto grid max-w-7xl gap-5">
      <section className="cpu-card rounded p-5 sm:p-6">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-200/70">Logic Gate Simulator</p>
        <h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">Gerbang Logika</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
          Uji input 0 dan 1, pilih jenis gate, lalu lihat output, simbol visual, dan truth table mini secara otomatis.
        </p>
      </section>

      <div className="grid gap-5 xl:grid-cols-[1fr_380px]">
        <div className="grid gap-5">
          <section className="cpu-card rounded p-5">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm text-slate-300">
                Input A
                <select
                  className="mt-2 h-12 w-full rounded border border-cyan-300/20 bg-slate-950/80 px-4 font-mono text-lg text-cyan-100 outline-none focus:border-cyan-300/60"
                  value={inputA}
                  onChange={(event) => setInputA(event.target.value)}
                >
                  <option value="0">0</option>
                  <option value="1">1</option>
                </select>
              </label>
              <label className={`text-sm text-slate-300 ${isNot ? 'opacity-45' : ''}`}>
                Input B
                <select
                  className="mt-2 h-12 w-full rounded border border-cyan-300/20 bg-slate-950/80 px-4 font-mono text-lg text-cyan-100 outline-none focus:border-cyan-300/60 disabled:cursor-not-allowed"
                  value={inputB}
                  onChange={(event) => setInputB(event.target.value)}
                  disabled={isNot}
                >
                  <option value="0">0</option>
                  <option value="1">1</option>
                </select>
              </label>
            </div>

            <div className="mt-5">
              <p className="mb-3 text-sm font-semibold text-white">Pilih Gate</p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
                {gates.map((item) => (
                  <button
                    key={item}
                    className={`h-12 rounded border font-mono text-sm font-bold transition ${
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
          </section>

          <LogicGateSymbol gate={gate} inputA={inputA} inputB={inputB} output={output} />

          <section className="cpu-card rounded p-5">
            <h3 className="text-lg font-semibold text-white">Penjelasan</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">{explanations[gate]}</p>
          </section>
        </div>

        <div className="grid content-start gap-5">
          <section className="cpu-card rounded p-5">
            <h3 className="text-lg font-semibold text-white">Output</h3>
            <div className="mt-4 rounded border border-cyan-300/25 bg-cyan-300/10 p-5 text-center">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan-200/70">{gate} Result</p>
              <p className="mt-3 font-mono text-6xl font-bold text-cyan-100">{output}</p>
            </div>
          </section>

          <section className="cpu-card rounded p-5">
            <h3 className="text-lg font-semibold text-white">Mini Truth Table</h3>
            <div className="mt-4 overflow-x-auto rounded border border-cyan-300/20">
              <table className="w-full min-w-[260px] text-left font-mono text-sm">
                <thead className="bg-cyan-300/10 text-cyan-100">
                  <tr>
                    <th className="p-3">A</th>
                    {!isNot && <th className="p-3">B</th>}
                    <th className="p-3">Output</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  {rows.map((row) => (
                    <tr key={`${row.a}-${row.b ?? 'not'}`} className="border-t border-white/8">
                      <td className="p-3">{row.a}</td>
                      {!isNot && <td className="p-3">{row.b}</td>}
                      <td className="p-3 text-cyan-100">{row.output}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
