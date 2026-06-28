import GateSymbol from '../circuit/GateSymbol';
import CardSwap, { Card } from './CardSwap';

const gateCards = [
  { gate: 'AND' },
  { gate: 'OR' },
  { gate: 'XOR' },
  { gate: 'NOT' },
  { gate: 'NAND' },
  { gate: 'NOR' },
];

export default function LogicGateShowcase() {
  return (
    <div className="relative min-h-[470px] overflow-visible md:min-h-[500px]">
      <CardSwap cardDistance={58} delay={3600} height={320} pauseOnHover verticalDistance={54} width={460}>
        {gateCards.map((item) => (
          <Card
            key={item.gate}
            className="grid content-center gap-5 p-6"
            aria-label={`${item.gate} logic gate card`}
          >
            <h3 className="text-center text-4xl font-medium text-linear-strong">{item.gate}</h3>
            <div className="h-44 rounded-lg border border-linear-border/70 bg-linear-bg p-5">
              <GateSymbol gate={item.gate} />
            </div>
            <div className="grid grid-cols-3 gap-3 text-center font-mono text-sm text-linear-muted">
              <span className="rounded-md border border-linear-border/70 bg-linear-surface2 px-3 py-2">Input A</span>
              <span className="rounded-md border border-linear-border/70 bg-linear-surface2 px-3 py-2">Input B</span>
              <span className="rounded-md border border-linear-border/70 bg-linear-surface2 px-3 py-2">Output X</span>
            </div>
          </Card>
        ))}
      </CardSwap>
    </div>
  );
}
