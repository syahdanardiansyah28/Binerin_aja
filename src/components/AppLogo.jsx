export default function AppLogo() {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <div className="relative grid h-12 w-12 shrink-0 place-items-center rounded border border-cyan-300/40 bg-cyan-300/10 shadow-neon">
        <div className="absolute inset-2 rounded border border-cyan-200/20" />
        <div className="absolute -left-1 top-3 h-1 w-2 bg-cyan-300/70" />
        <div className="absolute -left-1 bottom-3 h-1 w-2 bg-cyan-300/70" />
        <div className="absolute -right-1 top-3 h-1 w-2 bg-cyan-300/70" />
        <div className="absolute -right-1 bottom-3 h-1 w-2 bg-cyan-300/70" />
        <span className="font-mono text-lg font-black text-cyan-100">B</span>
      </div>
      <div className="min-w-0">
        <h1 className="truncate text-xl font-semibold text-white">Binerin Aja</h1>
        <p className="truncate font-mono text-xs uppercase tracking-[0.18em] text-cyan-200/70">
          Digital Logic Simulator
        </p>
      </div>
    </div>
  );
}
