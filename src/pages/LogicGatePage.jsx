import { useState } from 'react';
import BasicBinaryGate from '../components/logic/BasicBinaryGate';
import AdvancedCircuitBuilder from '../components/logic/AdvancedCircuitBuilder';

const modes = [
  {
    id: 'basic',
    title: 'Basic Binary Mode',
    description: 'Operasi gate bit per bit untuk input biner 1-bit atau multi-bit.',
  },
  {
    id: 'advanced',
    title: 'Advanced Circuit Mode',
    description: 'Circuit builder berbasis React Flow dengan node, kabel, dan simulasi.',
  },
];

export default function LogicGatePage() {
  const [activeMode, setActiveMode] = useState('basic');

  return (
    <div className="mx-auto grid w-full max-w-full min-w-0 gap-5 overflow-x-hidden xl:max-w-7xl">
      <section className="cpu-card rounded p-4 sm:p-5">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan-200/70">Logic Gate</p>
        <h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">Digital Logic Workspace</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
          Pilih mode dasar untuk operasi biner langsung, atau mode advanced untuk membangun rangkaian digital visual.
        </p>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {modes.map((mode) => (
            <button
              key={mode.id}
              className={`rounded border p-4 text-left transition ${
                activeMode === mode.id
                  ? 'border-cyan-300/60 bg-cyan-300/15 text-cyan-100 shadow-neon'
                  : 'border-white/10 bg-white/[0.035] text-slate-300 hover:border-cyan-300/35 hover:text-cyan-100'
              }`}
              type="button"
              onClick={() => setActiveMode(mode.id)}
            >
              <span className="block font-mono text-sm font-bold">{mode.title}</span>
              <span className="mt-2 block text-xs leading-5 text-slate-400">{mode.description}</span>
            </button>
          ))}
        </div>
      </section>

      {activeMode === 'basic' ? <BasicBinaryGate /> : <AdvancedCircuitBuilder />}
    </div>
  );
}
