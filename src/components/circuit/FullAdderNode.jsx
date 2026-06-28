import { Handle, Position } from '@xyflow/react';

export default function FullAdderNode({ data }) {
  return (
    <div className="min-w-[164px] rounded-lg border border-linear-border/70 bg-linear-surface p-3 text-linear-text shadow-hairline">
      <Handle className="!h-3 !w-3 !border-white !bg-linear-accent" type="target" position={Position.Left} id="a" style={{ top: '30%' }} />
      <Handle className="!h-3 !w-3 !border-white !bg-linear-accent" type="target" position={Position.Left} id="b" style={{ top: '50%' }} />
      <Handle className="!h-3 !w-3 !border-white !bg-linear-accent" type="target" position={Position.Left} id="cin" style={{ top: '70%' }} />
      <p className="font-mono text-xs text-linear-muted">Full Adder</p>
      <div className="mt-2 grid grid-cols-2 gap-2 font-mono text-sm">
        <span className="rounded-md bg-linear-surface2 p-2">S: {data.outputs?.sum ?? '-'}</span>
        <span className="rounded-md bg-linear-surface2 p-2">C: {data.outputs?.carry ?? '-'}</span>
      </div>
      <p className="mt-2 text-[10px] text-linear-muted">{data.status || 'Waiting Input'}</p>
      <Handle className="!h-3 !w-3 !border-white !bg-linear-success" type="source" position={Position.Right} id="sum" style={{ top: '35%' }} />
      <Handle className="!h-3 !w-3 !border-white !bg-linear-accent" type="source" position={Position.Right} id="carry" style={{ top: '65%' }} />
    </div>
  );
}
