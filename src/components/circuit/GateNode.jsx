import { Handle, Position } from '@xyflow/react';
import GateSymbol from './GateSymbol';

export default function GateNode({ data }) {
  const isNot = data.gateType === 'NOT';

  return (
    <div className="min-w-[168px] rounded-lg border border-white/10 bg-linear-surface p-3 text-center text-linear-text shadow-hairline">
      <Handle className="!h-3 !w-3 !border-white !bg-linear-accent" type="target" position={Position.Left} id="a" style={{ top: isNot ? '50%' : '34%' }} />
      {!isNot && (
        <Handle className="!h-3 !w-3 !border-white !bg-linear-accent" type="target" position={Position.Left} id="b" style={{ top: '66%' }} />
      )}
      <p className="font-mono text-xs text-linear-muted">Gate</p>
      <GateSymbol gate={data.gateType} />
      <p className="font-mono text-lg font-bold">{data.gateType}</p>
      <p className="mt-2 rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 font-mono text-sm">
        OUT: {data.value ?? '-'}
      </p>
      <p className="mt-2 text-[10px] text-linear-muted">{data.status || 'Waiting Input'}</p>
      <Handle className="!h-3 !w-3 !border-white !bg-linear-accent" type="source" position={Position.Right} id="out" />
    </div>
  );
}
