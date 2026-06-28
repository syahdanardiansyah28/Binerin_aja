import { Handle, Position } from '@xyflow/react';

export default function OutputNode({ data }) {
  const value = data.value;
  const active = value === 1;

  return (
    <div className="min-w-[142px] rounded-lg border border-linear-border/70 bg-linear-surface p-3 text-linear-text shadow-hairline">
      <Handle className="!h-3 !w-3 !border-white !bg-linear-accent" type="target" position={Position.Left} id="in" />
      <p className="font-mono text-xs text-linear-muted">Output LED</p>
      <div className="mt-3 flex items-center gap-3">
        <span className={`h-8 w-8 rounded-full border ${active ? 'border-linear-success bg-linear-success' : 'border-linear-border bg-linear-line'}`} />
        <div>
          <p className="font-mono text-2xl font-bold">{value ?? '-'}</p>
          <p className="text-xs text-linear-muted">{data.status || 'Waiting Input'}</p>
        </div>
      </div>
    </div>
  );
}
