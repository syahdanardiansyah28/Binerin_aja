import { operations } from '../data/operations';

export default function OperationPanel({ selectedOperation, onSelectOperation, onProcess }) {
  return (
    <section className="cpu-card rounded p-5">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold text-white">Operation Panel</h3>
        <span className="font-mono text-xs text-cyan-200/60">OPCODE: {selectedOperation}</span>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {operations.map((operation) => (
          <button
            key={operation.id}
            className={`rounded border px-3 py-3 text-left transition ${
              selectedOperation === operation.id
                ? 'border-cyan-300/60 bg-cyan-300/15 text-cyan-100 shadow-neon'
                : 'border-white/10 bg-white/[0.035] text-slate-300 hover:border-cyan-300/35 hover:text-cyan-100'
            }`}
            type="button"
            onClick={() => onSelectOperation(operation.id)}
          >
            <span className="block font-mono text-base font-bold">{operation.label}</span>
            <span className="mt-1 block text-xs text-slate-400">{operation.description}</span>
          </button>
        ))}
      </div>
      <button
        className="mt-5 h-12 w-full rounded border border-emerald-300/35 bg-emerald-300/15 font-mono text-sm font-bold uppercase tracking-[0.22em] text-emerald-100 shadow-neon transition hover:bg-emerald-300/20"
        type="button"
        onClick={onProcess}
      >
        Proses
      </button>
    </section>
  );
}
