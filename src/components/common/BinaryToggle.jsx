export default function BinaryToggle({ label, value, onChange, disabled = false }) {
  const active = Number(value) === 1;

  return (
    <button
      className={`flex min-h-12 items-center justify-between gap-3 rounded-md border px-3 text-left transition ${
        active
          ? 'border-linear-accent bg-linear-accent/15 text-white'
          : 'border-white/10 bg-white/[0.02] text-linear-muted hover:text-linear-text'
      } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
      type="button"
      onClick={() => !disabled && onChange(active ? 0 : 1)}
      disabled={disabled}
    >
      <span className="text-sm">{label}</span>
      <span className="font-mono text-lg text-linear-text">{active ? 1 : 0}</span>
    </button>
  );
}
