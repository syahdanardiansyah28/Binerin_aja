export default function AppLogo() {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-linear-border/70 bg-linear-surface2">
        <span className="font-mono text-lg text-linear-strong">B</span>
      </div>
      <div className="min-w-0">
        <p className="truncate text-base font-medium text-linear-strong">Binerin</p>
        <p className="truncate font-mono text-xs text-linear-muted">Logic to ALU</p>
      </div>
    </div>
  );
}
