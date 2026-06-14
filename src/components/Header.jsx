export default function Header() {
  return (
    <header className="flex w-full max-w-full min-w-0 flex-col gap-4 rounded border border-cyan-300/15 bg-white/[0.03] p-4 shadow-innerline md:flex-row md:items-center md:justify-between md:p-5">
      <div className="min-w-0">
        <p className="break-words font-mono text-xs uppercase tracking-[0.18em] text-cyan-200/70 md:tracking-[0.28em]">
          Modern ALU CPU Dashboard
        </p>
        <h2 className="mt-2 break-words text-2xl font-bold text-white md:text-3xl">Binerin Aja</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
          Simulator operasi aritmatika dan logika berbasis biner dengan visualisasi register, carry, overflow, dan proses bit.
        </p>
      </div>
      <button
        className="h-11 w-full rounded border border-cyan-300/30 bg-cyan-300/10 px-4 text-sm font-semibold text-cyan-100 shadow-neon transition hover:bg-cyan-300/15 md:w-auto"
        type="button"
      >
        Dark Mode
      </button>
    </header>
  );
}
