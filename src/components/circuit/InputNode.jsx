import { Handle, Position } from '@xyflow/react';

export default function InputNode({ id, data }) {
  const value = Number(data.value || 0);

  return (
    <div className="min-w-[128px] rounded border border-cyan-300/40 bg-slate-950/90 p-3 text-cyan-100 shadow-neon">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-200/70">Input</p>
      <div className="mt-2 flex items-center justify-between gap-3">
        <span className="font-mono text-3xl font-bold">{value}</span>
        <button
          className={`rounded border px-3 py-1 font-mono text-xs font-bold ${value ? 'border-emerald-300/50 bg-emerald-300/20 text-emerald-100' : 'border-white/15 bg-white/5 text-slate-300'}`}
          type="button"
          onClick={() => data.onToggle?.(id)}
        >
          Toggle
        </button>
      </div>
      <Handle className="!h-3 !w-3 !border-cyan-100 !bg-cyan-300" type="source" position={Position.Right} id="out" />
    </div>
  );
}
