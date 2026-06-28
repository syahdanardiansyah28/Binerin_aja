import GateSymbol from '../circuit/GateSymbol';
import CardSwap, { Card } from './CardSwap';

const gateCards = [
  {
    gate: 'AND',
    formula: 'A * B',
    detail: 'Output 1 hanya saat A dan B bernilai 1.',
  },
  {
    gate: 'OR',
    formula: 'A + B',
    detail: 'Output 1 saat minimal satu input bernilai 1.',
  },
  {
    gate: 'XOR',
    formula: 'A XOR B',
    detail: 'Output 1 saat kedua input berbeda.',
  },
  {
    gate: 'NOT',
    formula: "A'",
    detail: 'Membalik nilai input tunggal dari 0 ke 1 atau sebaliknya.',
  },
  {
    gate: 'NAND',
    formula: "(A * B)'",
    detail: 'Kebalikan AND, output 0 hanya saat semua input 1.',
  },
  {
    gate: 'NOR',
    formula: "(A + B)'",
    detail: 'Kebalikan OR, output 1 hanya saat semua input 0.',
  },
];

export default function LogicGateShowcase() {
  return (
    <div className="relative min-h-[420px] overflow-visible md:min-h-[440px]">
      <CardSwap cardDistance={44} delay={3600} height={240} pauseOnHover verticalDistance={44} width={330}>
        {gateCards.map((item) => (
          <Card
            key={item.gate}
            className="grid content-between p-5"
            aria-label={`${item.gate} logic gate card`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-xs text-linear-muted">Gate</p>
                <h3 className="mt-1 text-3xl font-medium text-linear-strong">{item.gate}</h3>
              </div>
              <span className="rounded-full border border-linear-accent/30 bg-linear-accent/10 px-3 py-1 font-mono text-xs text-linear-accent">
                {item.formula}
              </span>
            </div>

            <div className="my-3 rounded-lg border border-linear-border/70 bg-linear-bg p-3">
              <GateSymbol gate={item.gate} />
            </div>

            <p className="text-sm leading-6 text-linear-muted">{item.detail}</p>
          </Card>
        ))}
      </CardSwap>
    </div>
  );
}
