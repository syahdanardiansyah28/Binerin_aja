import { useMemo, useState } from 'react';
import GateSymbol from '../circuit/GateSymbol';

const gates = ['AND', 'OR', 'XOR', 'NAND', 'NOR', 'XNOR', 'NOT'];
const modes = [
  { id: 'logic', label: 'Logic Gate' },
  { id: 'half', label: 'Half Adder' },
  { id: 'full', label: 'Full Adder' },
  { id: 'multi', label: 'Multi-bit Adder' },
];

const isBinary = (value) => /^[01]+$/.test(value);
const isBit = (value) => /^[01]$/.test(value);
const padBinary = (value, width) => value.padStart(width, '0');

const calculateBit = (gate, a, b = '0') => {
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

const explanations = {
  AND:
    'Gate AND menghasilkan 1 hanya pada posisi bit yang A dan B sama-sama 1. Pada operasi ini, setiap bit dari A dibandingkan dengan bit B. Jika salah satu bernilai 0, maka output pada bit tersebut menjadi 0. Contoh: A = 0000 dan B = 0011 menghasilkan A AND B = 0000. Input tetap valid, tetapi output tetap 0 karena tidak ada pasangan bit yang sama-sama 1.',
  OR:
    'Gate OR menghasilkan output 1 jika minimal salah satu input pada posisi bit yang sama bernilai 1. Operasi dilakukan dari bit kanan ke kiri. Jika A atau B memiliki nilai 1 pada posisi tertentu, maka output pada posisi tersebut menjadi 1.',
  XOR:
    'Gate XOR menghasilkan output 1 jika kedua input berbeda. Jika A dan B sama-sama 0 atau sama-sama 1, output menjadi 0. Operasi ini berguna untuk membandingkan perbedaan bit.',
  NAND:
    'Gate NAND adalah kebalikan dari AND. Setiap pasangan bit A dan B dihitung dengan aturan AND terlebih dahulu, lalu hasilnya dibalik. Output menjadi 0 hanya ketika kedua input pada posisi bit yang sama bernilai 1.',
  NOR:
    'Gate NOR adalah kebalikan dari OR. Setiap pasangan bit A dan B menghasilkan 1 hanya jika keduanya 0. Jika salah satu bit bernilai 1, hasil OR menjadi 1 lalu dibalik menjadi 0.',
  XNOR:
    'Gate XNOR adalah kebalikan dari XOR. Output bernilai 1 jika bit A dan bit B pada posisi yang sama memiliki nilai yang sama. Jika berbeda, output menjadi 0.',
  NOT:
    'Gate NOT hanya memakai Input A. Setiap bit pada A dibalik. Bit 0 menjadi 1, dan bit 1 menjadi 0. Operasi dilakukan bit per bit sehingga output memiliki panjang yang sama dengan Input A.',
};

function evaluateBinaryGate(inputA, inputB, gate) {
  const a = inputA.trim();
  const b = inputB.trim();
  const usesB = gate !== 'NOT';

  if (!a || (usesB && !b)) {
    return { isValid: false, errorMessage: usesB ? 'Input A dan Input B tidak boleh kosong.' : 'Input A tidak boleh kosong.', paddedA: a, paddedB: usesB ? b : '', binaryOutput: '', decimalOutput: '-', rows: [] };
  }

  if (!isBinary(a) || (usesB && !isBinary(b))) {
    return { isValid: false, errorMessage: 'Input hanya boleh berisi angka 0 dan 1.', paddedA: a, paddedB: usesB ? b : '', binaryOutput: '', decimalOutput: '-', rows: [] };
  }

  const width = usesB ? Math.max(a.length, b.length) : a.length;
  const paddedA = padBinary(a, width);
  const paddedB = usesB ? padBinary(b, width) : '';
  const outputBits = [...paddedA].map((bitA, index) => calculateBit(gate, bitA, paddedB[index]).toString());
  const binaryOutput = outputBits.join('');
  const rows = outputBits.map((output, index) => ({ bit: width - 1 - index, a: paddedA[index], b: usesB ? paddedB[index] : null, output }));

  return { isValid: true, errorMessage: '', paddedA, paddedB, binaryOutput, decimalOutput: parseInt(binaryOutput, 2), rows };
}

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
    carryOut: (bitA & bitB) | (carryIn & xorAB),
  };
};

function evaluateHalfAdder(a, b) {
  if (!a.trim() || !b.trim()) return { isValid: false, errorMessage: 'Input A dan B tidak boleh kosong.', sum: '-', carry: '-', rows: [] };
  if (!isBit(a.trim()) || !isBit(b.trim())) return { isValid: false, errorMessage: 'Half Adder hanya menerima 1 bit untuk A dan B.', sum: '-', carry: '-', rows: [] };
  const output = halfAdder(a.trim(), b.trim());
  return { isValid: true, errorMessage: '', ...output, rows: halfAdderRows() };
}

function evaluateFullAdder(a, b, cin) {
  if (!a.trim() || !b.trim() || !cin.trim()) return { isValid: false, errorMessage: 'Input A, B, dan Carry In tidak boleh kosong.', sum: '-', carryOut: '-', rows: [] };
  if (!isBit(a.trim()) || !isBit(b.trim()) || !isBit(cin.trim())) return { isValid: false, errorMessage: 'Full Adder hanya menerima 1 bit untuk A, B, dan Carry In.', sum: '-', carryOut: '-', rows: [] };
  const output = fullAdder(a.trim(), b.trim(), cin.trim());
  return { isValid: true, errorMessage: '', ...output, rows: fullAdderRows() };
}

function evaluateMultiAdder(aInput, bInput, cinInput) {
  const a = aInput.trim();
  const b = bInput.trim();
  const cin = cinInput.trim() || '0';
  if (!a || !b) return { isValid: false, errorMessage: 'Input A dan B tidak boleh kosong.', result: '', decimal: '-', carryOut: '-', rows: [] };
  if (!isBinary(a) || !isBinary(b) || !isBit(cin)) return { isValid: false, errorMessage: 'Input A, B, dan Carry In hanya boleh berisi 0 atau 1. Carry In harus 1 bit.', result: '', decimal: '-', carryOut: '-', rows: [] };

  const width = Math.max(a.length, b.length);
  const paddedA = padBinary(a, width);
  const paddedB = padBinary(b, width);
  let carry = Number(cin);
  let result = '';
  const rows = [];

  for (let index = width - 1; index >= 0; index -= 1) {
    const current = fullAdder(paddedA[index], paddedB[index], carry);
    rows.unshift({
      bit: width - 1 - index,
      a: paddedA[index],
      b: paddedB[index],
      cin: carry,
      sum: current.sum,
      cout: current.carryOut,
    });
    result = `${current.sum}${result}`;
    carry = current.carryOut;
  }

  return { isValid: true, errorMessage: '', paddedA, paddedB, result, decimal: parseInt(result, 2), carryOut: carry, rows };
}

const halfAdderRows = () =>
  ['00', '01', '10', '11'].map((pair) => {
    const output = halfAdder(pair[0], pair[1]);
    return { a: pair[0], b: pair[1], ...output };
  });

const fullAdderRows = () =>
  ['000', '001', '010', '011', '100', '101', '110', '111'].map((bits) => {
    const output = fullAdder(bits[0], bits[1], bits[2]);
    return { a: bits[0], b: bits[1], cin: bits[2], ...output };
  });

function StatusCard({ isValid, errorMessage }) {
  return (
    <div className={`rounded border p-4 ${isValid ? 'border-emerald-300/30 bg-emerald-300/10' : 'border-pink-300/30 bg-pink-300/10'}`}>
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-300">Status Input</p>
      <p className={`mt-2 text-sm font-semibold ${isValid ? 'text-emerald-200' : 'text-pink-200'}`}>{isValid ? 'Valid' : 'Tidak Valid'}</p>
      {!isValid && <p className="mt-3 text-sm leading-6 text-pink-100">{errorMessage}</p>}
      <p className="mt-3 text-xs leading-5 text-slate-300">
        Status Input hanya menunjukkan apakah input berisi angka biner 0 dan 1. Hasil gate tetap dilihat dari Output Biner dan Output Desimal.
      </p>
    </div>
  );
}

export default function BasicBinaryGate() {
  const [activeMode, setActiveMode] = useState('logic');
  const [inputA, setInputA] = useState('0101');
  const [inputB, setInputB] = useState('0011');
  const [gate, setGate] = useState('AND');
  const [adderA, setAdderA] = useState('1');
  const [adderB, setAdderB] = useState('0');
  const [carryIn, setCarryIn] = useState('0');
  const [multiA, setMultiA] = useState('0101');
  const [multiB, setMultiB] = useState('0011');
  const [multiCarryIn, setMultiCarryIn] = useState('0');

  const usesInputB = gate !== 'NOT';
  const gateResult = useMemo(() => evaluateBinaryGate(inputA, inputB, gate), [inputA, inputB, gate]);
  const halfResult = useMemo(() => evaluateHalfAdder(adderA, adderB), [adderA, adderB]);
  const fullResult = useMemo(() => evaluateFullAdder(adderA, adderB, carryIn), [adderA, adderB, carryIn]);
  const multiResult = useMemo(() => evaluateMultiAdder(multiA, multiB, multiCarryIn), [multiA, multiB, multiCarryIn]);

  return (
    <div className="grid w-full max-w-full min-w-0 gap-5 overflow-x-hidden">
      <section className="cpu-card rounded p-4 sm:p-5">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan-200/70">Basic Binary Mode</p>
        <h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">Binary Gate and Adder Lab</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
          Gunakan mode Logic Gate untuk operasi bitwise, atau mode Adder untuk memahami Half Adder, Full Adder, dan penjumlahan multi-bit.
        </p>
        <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {modes.map((mode) => (
            <button
              key={mode.id}
              className={`h-12 rounded border font-mono text-xs font-bold transition sm:text-sm ${activeMode === mode.id ? 'border-cyan-300/60 bg-cyan-300/15 text-cyan-100 shadow-neon' : 'border-white/10 bg-white/[0.035] text-slate-300 hover:border-cyan-300/35 hover:text-cyan-100'}`}
              type="button"
              onClick={() => setActiveMode(mode.id)}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </section>

      {activeMode === 'logic' && (
        <div className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="grid min-w-0 gap-5">
            <section className="cpu-card rounded p-4 sm:p-5">
              <div className="grid min-w-0 gap-4 md:grid-cols-2">
                <label className="min-w-0 text-sm text-slate-300">Input A
                  <input className="mt-2 h-12 w-full max-w-full rounded border border-cyan-300/20 bg-slate-950/80 px-4 font-mono text-base tracking-[0.16em] text-cyan-100 outline-none focus:border-cyan-300/60" value={inputA} onChange={(event) => setInputA(event.target.value)} placeholder="0101" />
                </label>
                <label className={`min-w-0 text-sm text-slate-300 ${usesInputB ? '' : 'opacity-45'}`}>Input B
                  <input className="mt-2 h-12 w-full max-w-full rounded border border-cyan-300/20 bg-slate-950/80 px-4 font-mono text-base tracking-[0.16em] text-cyan-100 outline-none focus:border-cyan-300/60 disabled:cursor-not-allowed" value={inputB} onChange={(event) => setInputB(event.target.value)} placeholder="0011" disabled={!usesInputB} />
                </label>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
                {gates.map((item) => (
                  <button key={item} className={`h-12 rounded border font-mono text-sm font-bold transition ${gate === item ? 'border-cyan-300/60 bg-cyan-300/15 text-cyan-100 shadow-neon' : 'border-white/10 bg-white/[0.035] text-slate-300 hover:border-cyan-300/35 hover:text-cyan-100'}`} type="button" onClick={() => setGate(item)}>{item}</button>
                ))}
              </div>
            </section>

            <section className="cpu-card rounded p-4 sm:p-5">
              <div className="grid gap-4 md:grid-cols-[220px_minmax(0,1fr)] md:items-center">
                <div className="rounded border border-cyan-300/20 bg-slate-950/60 p-3"><GateSymbol gate={gate} /></div>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-white">Penjelasan {gate}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{explanations[gate]}</p>
                  {gateResult.isValid && <p className="mt-3 text-sm leading-6 text-slate-400">Input A dibaca sebagai <span className="font-mono text-cyan-100">{gateResult.paddedA}</span>{usesInputB && <> dan Input B dibaca sebagai <span className="font-mono text-cyan-100">{gateResult.paddedB}</span></>}. Output akhir disusun dari hasil setiap posisi bit.</p>}
                </div>
              </div>
            </section>

            <section className="cpu-card rounded p-4 sm:p-5">
              <h3 className="text-lg font-semibold text-white">Bit by Bit Table</h3>
              <div className="mt-4 max-w-full overflow-x-auto rounded border border-cyan-300/20">
                <table className="w-full min-w-[360px] text-left font-mono text-sm">
                  <thead className="bg-cyan-300/10 text-cyan-100"><tr><th className="p-3">Bit</th><th className="p-3">A</th>{usesInputB && <th className="p-3">B</th>}<th className="p-3">Output</th></tr></thead>
                  <tbody className="text-slate-300">
                    {gateResult.rows.length ? gateResult.rows.map((row) => <tr key={row.bit} className="border-t border-white/8"><td className="p-3">{row.bit}</td><td className="p-3">{row.a}</td>{usesInputB && <td className="p-3">{row.b}</td>}<td className="p-3 text-cyan-100">{row.output}</td></tr>) : <tr className="border-t border-white/8"><td className="p-3 text-slate-400" colSpan={usesInputB ? 4 : 3}>Tabel muncul setelah input valid.</td></tr>}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          <aside className="grid min-w-0 content-start gap-5">
            <section className="cpu-card rounded p-4 sm:p-5">
              <h3 className="text-lg font-semibold text-white">Output</h3>
              <div className="mt-4"><StatusCard isValid={gateResult.isValid} errorMessage={gateResult.errorMessage} /></div>
              <div className="mt-4 grid gap-3">
                <div className="rounded border border-white/10 bg-white/[0.035] p-3"><p className="text-xs text-slate-400">Output Biner</p><p className="mt-2 break-all font-mono text-2xl font-bold text-cyan-100">{gateResult.binaryOutput || '-'}</p></div>
                <div className="rounded border border-white/10 bg-white/[0.035] p-3"><p className="text-xs text-slate-400">Output Desimal</p><p className="mt-2 font-mono text-2xl font-bold text-cyan-100">{gateResult.decimalOutput}</p></div>
              </div>
            </section>
          </aside>
        </div>
      )}

      {activeMode === 'half' && (
        <AdderLayout title="Half Adder" status={halfResult.isValid} errorMessage={halfResult.errorMessage} explanation="Half Adder menjumlahkan dua input 1 bit tanpa Carry In. Sum dihitung dengan XOR, sehingga bernilai 1 ketika A dan B berbeda. Carry dihitung dengan AND, sehingga bernilai 1 hanya ketika A dan B sama-sama 1. Rangkaian ini adalah dasar penjumlahan biner sederhana.">
          <div className="grid gap-4 md:grid-cols-2">
            <BitInput label="A" value={adderA} onChange={setAdderA} />
            <BitInput label="B" value={adderB} onChange={setAdderB} />
          </div>
          <OutputGrid items={[['Sum', halfResult.sum], ['Carry', halfResult.carry], ['Output Desimal', halfResult.isValid ? halfResult.sum + halfResult.carry * 2 : '-']]} />
          <Table headers={['A', 'B', 'Sum', 'Carry']} rows={(halfResult.rows.length ? halfResult.rows : halfAdderRows()).map((row) => [row.a, row.b, row.sum, row.carry])} />
        </AdderLayout>
      )}

      {activeMode === 'full' && (
        <AdderLayout title="Full Adder" status={fullResult.isValid} errorMessage={fullResult.errorMessage} explanation="Full Adder menjumlahkan A, B, dan Carry In. Sum dihasilkan dari A XOR B XOR Cin. Carry Out bernilai 1 jika minimal dua dari tiga input bernilai 1. Full Adder dipakai sebagai blok utama dalam penjumlahan biner multi-bit.">
          <div className="grid gap-4 md:grid-cols-3">
            <BitInput label="A" value={adderA} onChange={setAdderA} />
            <BitInput label="B" value={adderB} onChange={setAdderB} />
            <BitInput label="Carry In" value={carryIn} onChange={setCarryIn} />
          </div>
          <OutputGrid items={[['Sum', fullResult.sum], ['Carry Out', fullResult.carryOut]]} />
          <Table headers={['A', 'B', 'Cin', 'Sum', 'Cout']} rows={(fullResult.rows.length ? fullResult.rows : fullAdderRows()).map((row) => [row.a, row.b, row.cin, row.sum, row.carryOut])} />
        </AdderLayout>
      )}

      {activeMode === 'multi' && (
        <AdderLayout title="Multi-bit Adder" status={multiResult.isValid} errorMessage={multiResult.errorMessage} explanation="Multi-bit Adder memakai konsep Full Adder berantai. Perhitungan dimulai dari bit paling kanan. Carry Out dari satu posisi bit menjadi Carry In untuk posisi bit berikutnya di sebelah kiri. Jika panjang input berbeda, sistem menambahkan padding 0 di kiri agar kedua register sejajar.">
          <div className="grid gap-4 md:grid-cols-3">
            <TextInput label="A" value={multiA} onChange={setMultiA} placeholder="0101" />
            <TextInput label="B" value={multiB} onChange={setMultiB} placeholder="0011" />
            <TextInput label="Carry In awal" value={multiCarryIn} onChange={setMultiCarryIn} placeholder="0" />
          </div>
          <OutputGrid items={[['Result Biner', multiResult.result || '-'], ['Result Desimal', multiResult.decimal], ['Carry Out', multiResult.carryOut]]} />
          <Table headers={['Bit', 'A', 'B', 'Cin', 'Sum', 'Cout']} rows={multiResult.rows.map((row) => [row.bit, row.a, row.b, row.cin, row.sum, row.cout])} emptyText="Tabel muncul setelah input valid." />
        </AdderLayout>
      )}
    </div>
  );
}

function AdderLayout({ title, status, errorMessage, explanation, children }) {
  return (
    <div className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
      <div className="grid min-w-0 gap-5">
        <section className="cpu-card rounded p-4 sm:p-5">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-300">{explanation}</p>
        </section>
        <section className="cpu-card rounded p-4 sm:p-5">{children}</section>
      </div>
      <aside className="grid min-w-0 content-start gap-5">
        <section className="cpu-card rounded p-4 sm:p-5">
          <h3 className="text-lg font-semibold text-white">Status Input</h3>
          <div className="mt-4"><StatusCard isValid={status} errorMessage={errorMessage} /></div>
        </section>
      </aside>
    </div>
  );
}

function BitInput({ label, value, onChange }) {
  return <TextInput label={label} value={value} onChange={onChange} placeholder="0 atau 1" />;
}

function TextInput({ label, value, onChange, placeholder }) {
  return (
    <label className="min-w-0 text-sm text-slate-300">{label}
      <input className="mt-2 h-12 w-full max-w-full rounded border border-cyan-300/20 bg-slate-950/80 px-4 font-mono text-base tracking-[0.16em] text-cyan-100 outline-none focus:border-cyan-300/60" value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />
    </label>
  );
}

function OutputGrid({ items }) {
  return (
    <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(([label, value]) => (
        <div key={label} className="rounded border border-white/10 bg-white/[0.035] p-3">
          <p className="text-xs text-slate-400">{label}</p>
          <p className="mt-2 break-all font-mono text-2xl font-bold text-cyan-100">{value}</p>
        </div>
      ))}
    </div>
  );
}

function Table({ headers, rows, emptyText = 'Tidak ada data.' }) {
  return (
    <div className="mt-5 max-w-full overflow-x-auto rounded border border-cyan-300/20">
      <table className="w-full min-w-[420px] text-left font-mono text-sm">
        <thead className="bg-cyan-300/10 text-cyan-100">
          <tr>{headers.map((header) => <th key={header} className="p-3">{header}</th>)}</tr>
        </thead>
        <tbody className="text-slate-300">
          {rows.length ? rows.map((row, rowIndex) => (
            <tr key={row.join('-') || rowIndex} className="border-t border-white/8">
              {row.map((cell, index) => <td key={`${cell}-${index}`} className="p-3">{cell}</td>)}
            </tr>
          )) : (
            <tr className="border-t border-white/8"><td className="p-3 text-slate-400" colSpan={headers.length}>{emptyText}</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
