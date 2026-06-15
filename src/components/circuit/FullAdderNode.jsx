import { Handle, Position } from '@xyflow/react';

export default function FullAdderNode({ data }) {
  return (
    <div className="min-w-[164px] rounded border border-cyan-300/40 bg-slate-950/90 p-3 text-cyan-100 shadow-neon">
      <Handle className="!h-3 !w-3 !border-cyan-100 !bg-cyan-300" type="target" position={Position.Left} id="a" style={{ top: '30%' }} />
      <Handle className="!h-3 !w-3 !border-cyan-100 !bg-cyan-300" type="target" position={Position.Left} id="b" style={{ top: '50%' }} />
      <Handle className="!h-3 !w-3 !border-cyan-100 !bg-cyan-300" type="target" position={Position.Left} id="cin" style={{ top: '70%' }} />
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-200/70">Full Adder</p>
      <div className="mt-2 grid grid-cols-2 gap-2 font-mono text-sm">
        <span className="rounded bg-white/[0.04] p-2">S: {data.outputs?.sum ?? '-'}</span>
        <span className="rounded bg-white/[0.04] p-2">C: {data.outputs?.carry ?? '-'}</span>
      </div>
      <p className="mt-2 text-[10px] text-slate-400">{data.status || 'Waiting Input'}</p>
      <Handle className="!h-3 !w-3 !border-emerald-100 !bg-emerald-300" type="source" position={Position.Right} id="sum" style={{ top: '35%' }} />
      <Handle className="!h-3 !w-3 !border-cyan-100 !bg-cyan-300" type="source" position={Position.Right} id="carry" style={{ top: '65%' }} />
    </div>
  );
}
