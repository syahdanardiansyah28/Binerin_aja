export default function ResultPanel({ result, mode }) {
  if (!result) {
    return (
      <section className="cpu-card w-full max-w-full min-w-0 rounded p-4 md:p-5">
        <h3 className="text-lg font-semibold text-white">Output Result</h3>
        <p className="mt-4 text-sm text-slate-400">Klik PROSES untuk menjalankan instruksi ALU.</p>
      </section>
    );
  }

  if (result.status === 'Error') {
    return (
      <section className="cpu-card w-full max-w-full min-w-0 rounded border-pink-300/30 p-4 md:p-5">
        <h3 className="text-lg font-semibold text-white">Output Result</h3>
        <p className="mt-4 rounded border border-pink-300/25 bg-pink-300/10 p-3 text-sm text-pink-200">
          {result.errorMessage}
        </p>
      </section>
    );
  }

  const commonItems = [
    { label: 'Hasil Biner', value: result.binaryResult },
    ...(mode === 'beginner' ? [{ label: 'Hasil Desimal', value: result.decimalResult }] : []),
  ];
  const addItems = ['ADD', 'INC'].includes(result.operation)
    ? [
        { label: 'Carry Out', value: result.carryOut },
        { label: 'Overflow', value: result.overflow ? 'Ya' : 'Tidak' },
      ]
    : [];
  const subItems = ['SUB', 'DEC'].includes(result.operation)
    ? [
        { label: 'Borrow Out', value: result.borrowOut },
        { label: 'Underflow', value: result.underflow ? 'Ya' : 'Tidak' },
      ]
    : [];
  const items = [...commonItems, ...addItems, ...subItems, { label: 'Status', value: result.status }];

  return (
    <section className="cpu-card w-full max-w-full min-w-0 rounded p-4 md:p-5">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold text-white">Output Result</h3>
        <span className="rounded border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-200">
          {result.status}
        </span>
      </div>
      <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {items.map((item) => (
          <div key={item.label} className="min-w-0 rounded border border-white/10 bg-white/[0.035] p-3">
            <p className="text-xs text-slate-400">{item.label}</p>
            <p className="mt-2 break-all font-mono text-lg font-bold text-cyan-100">{item.value}</p>
          </div>
        ))}
      </div>
      {mode === 'beginner' && <p className="mt-4 text-sm leading-6 text-slate-300">{result.explanation}</p>}
    </section>
  );
}
