export default function AppLogo() {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.03]">
        <span className="font-mono text-lg text-white">B</span>
      </div>
      <div className="min-w-0">
        <p className="truncate text-base font-medium text-white">Binerin</p>
        <p className="truncate font-mono text-xs text-linear-muted">Logic to ALU</p>
      </div>
    </div>
  );
}
