import { Handle, Position } from '@xyflow/react';

export default function OutputNode({ data }) {
  const value = data.value;
  const active = value === 1;

  return (
    <div className="min-w-[142px] rounded border border-cyan-300/40 bg-slate-950/90 p-3 text-cyan-100 shadow-neon">
      <Handle className="!h-3 !w-3 !border-cyan-100 !bg-cyan-300" type="target" position={Position.Left} id="in" />
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-200/70">Output LED</p>
      <div className="mt-3 flex items-center gap-3">
        <span className={`h-8 w-8 rounded-full border ${active ? 'border-emerald-200 bg-emerald-300 shadow-[0_0_22px_rgba(52,211,153,0.75)]' : 'border-slate-500 bg-slate-800'}`} />
        <div>
          <p className="font-mono text-2xl font-bold">{value ?? '-'}</p>
          <p className="text-xs text-slate-400">{data.status || 'Waiting Input'}</p>
        </div>
      </div>
    </div>
  );
}
