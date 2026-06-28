import { Handle, Position } from '@xyflow/react';

export default function InputNode({ id, data }) {
  const value = Number(data.value || 0);

  return (
    <div className="min-w-[128px] rounded-lg border border-linear-border/70 bg-linear-surface p-3 text-linear-text shadow-hairline">
      <p className="font-mono text-xs text-linear-muted">Input</p>
      <div className="mt-2 flex items-center justify-between gap-3">
        <span className="font-mono text-3xl font-bold">{value}</span>
        <button
          className={`rounded-md border px-3 py-1 font-mono text-xs ${value ? 'border-linear-success/40 bg-linear-successSurface text-linear-successText' : 'border-linear-border/70 bg-linear-surface2 text-linear-muted'}`}
          type="button"
          onClick={() => data.onToggle?.(id)}
        >
          Toggle
        </button>
      </div>
      <Handle className="!h-3 !w-3 !border-white !bg-linear-accent" type="source" position={Position.Right} id="out" />
    </div>
  );
}
