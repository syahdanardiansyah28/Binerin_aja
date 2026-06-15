import { Handle, Position } from '@xyflow/react';
import GateSymbol from './GateSymbol';

export default function GateNode({ data }) {
  const isNot = data.gateType === 'NOT';

  return (
    <div className="min-w-[168px] rounded border border-cyan-300/40 bg-slate-950/90 p-3 text-center text-cyan-100 shadow-neon">
      <Handle className="!h-3 !w-3 !border-cyan-100 !bg-cyan-300" type="target" position={Position.Left} id="a" style={{ top: isNot ? '50%' : '34%' }} />
      {!isNot && (
        <Handle className="!h-3 !w-3 !border-cyan-100 !bg-cyan-300" type="target" position={Position.Left} id="b" style={{ top: '66%' }} />
      )}
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-200/70">Gate</p>
      <GateSymbol gate={data.gateType} />
      <p className="font-mono text-lg font-bold">{data.gateType}</p>
      <p className="mt-2 rounded border border-white/10 bg-white/[0.04] px-2 py-1 font-mono text-sm">
        OUT: {data.value ?? '-'}
      </p>
      <p className="mt-2 text-[10px] text-slate-400">{data.status || 'Waiting Input'}</p>
      <Handle className="!h-3 !w-3 !border-cyan-100 !bg-cyan-300" type="source" position={Position.Right} id="out" />
    </div>
  );
}
