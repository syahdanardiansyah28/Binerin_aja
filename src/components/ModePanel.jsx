export default function ModePanel({ mode, onChangeMode }) {
  const modes = [
    { id: 'beginner', label: 'Beginner Mode', copy: 'Desimal dan penjelasan langkah aktif.' },
    { id: 'expert', label: 'Expert Mode', copy: 'Fokus register, carry, dan overflow.' },
  ];

  return (
    <section className="cpu-card rounded p-5">
      <h3 className="mb-4 text-lg font-semibold text-white">Mode</h3>
      <div className="grid gap-3">
        {modes.map((item) => (
          <button
            key={item.id}
            className={`rounded border p-4 text-left transition ${
              mode === item.id
                ? 'border-cyan-300/50 bg-cyan-300/12 text-cyan-100'
                : 'border-white/10 bg-white/[0.03] text-slate-300 hover:border-cyan-300/30'
            }`}
            type="button"
            onClick={() => onChangeMode(item.id)}
          >
            <span className="block text-sm font-semibold">{item.label}</span>
            <span className="mt-1 block text-xs text-slate-400">{item.copy}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
