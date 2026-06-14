export default function InputRegister({ registerA, registerB, onChangeA, onChangeB, errors }) {
  const inputClass =
    'mt-2 h-12 w-full rounded border border-cyan-300/20 bg-slate-950/70 px-4 font-mono text-lg tracking-[0.22em] text-cyan-100 outline-none transition placeholder:text-slate-600 focus:border-cyan-300/60 focus:shadow-neon';

  return (
    <section className="cpu-card rounded p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Input Register</h3>
        <span className="rounded border border-cyan-300/20 px-2 py-1 font-mono text-xs text-cyan-200/70">BIN</span>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm text-slate-300">
          Register A
          <input className={inputClass} value={registerA} onChange={(event) => onChangeA(event.target.value)} placeholder="0101" />
          {errors.registerA && <p className="mt-2 text-xs text-pink-300">{errors.registerA}</p>}
        </label>
        <label className="text-sm text-slate-300">
          Register B
          <input className={inputClass} value={registerB} onChange={(event) => onChangeB(event.target.value)} placeholder="0011" />
          {errors.registerB && <p className="mt-2 text-xs text-pink-300">{errors.registerB}</p>}
        </label>
      </div>
    </section>
  );
}
