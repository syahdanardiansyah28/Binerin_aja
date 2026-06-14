export default function Header() {
  return (
    <header className="flex flex-col gap-4 rounded border border-cyan-300/15 bg-white/[0.03] p-5 shadow-innerline md:flex-row md:items-center md:justify-between">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-200/70">Modern ALU CPU Dashboard</p>
        <h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">Binerin Aja</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
          Simulator operasi aritmatika dan logika berbasis biner dengan visualisasi register, carry, overflow, dan proses bit.
        </p>
      </div>
      <button
        className="h-11 rounded border border-cyan-300/30 bg-cyan-300/10 px-4 text-sm font-semibold text-cyan-100 shadow-neon transition hover:bg-cyan-300/15"
        type="button"
      >
        Dark Mode
      </button>
    </header>
  );
}
