import { useState } from 'react';
import Header from '../components/Header';
import InputRegister from '../components/InputRegister';
import OperationPanel from '../components/OperationPanel';
import ModePanel from '../components/ModePanel';
import ALUProcess from '../components/ALUProcess';
import ResultPanel from '../components/ResultPanel';
import StepByStep from '../components/StepByStep';
import BitTable from '../components/BitTable';
import { calculateALU, isBinary } from '../utils/alu';

const needsRegisterB = (operation) => ['ADD', 'SUB', 'AND', 'OR', 'XOR'].includes(operation);

export default function SimulatorPage() {
  const [registerA, setRegisterA] = useState('0101');
  const [registerB, setRegisterB] = useState('0011');
  const [selectedOperation, setSelectedOperation] = useState('ADD');
  const [mode, setMode] = useState('beginner');
  const [result, setResult] = useState(() => calculateALU({ registerA: '0101', registerB: '0011', operation: 'ADD' }));

  const errors = {
    registerA: registerA && !isBinary(registerA) ? 'Register A hanya boleh berisi 0 dan 1.' : '',
    registerB: needsRegisterB(selectedOperation) && registerB && !isBinary(registerB)
      ? 'Register B hanya boleh berisi 0 dan 1.'
      : '',
  };

  const handleProcess = () => {
    setResult(calculateALU({ registerA, registerB, operation: selectedOperation }));
  };

  return (
    <div className="mx-auto grid w-full max-w-full min-w-0 gap-5 overflow-x-hidden px-0 md:px-0 xl:max-w-7xl">
      <Header />

      <div className="grid w-full min-w-0 gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="grid min-w-0 gap-5">
          <InputRegister
            registerA={registerA}
            registerB={registerB}
            onChangeA={setRegisterA}
            onChangeB={setRegisterB}
            errors={errors}
          />

          <OperationPanel
            selectedOperation={selectedOperation}
            onSelectOperation={setSelectedOperation}
            onProcess={handleProcess}
          />

          <ALUProcess result={result} />
          <ResultPanel result={result} mode={mode} />
          <StepByStep result={result} mode={mode} />
          <BitTable result={result} />
        </div>

        <div className="grid min-w-0 content-start gap-5">
          <ModePanel mode={mode} onChangeMode={setMode} />

          <section className="cpu-card min-w-0 rounded p-4 md:p-5">
            <h3 className="text-lg font-semibold text-white">Register Monitor</h3>
            <div className="mt-4 grid gap-3">
              <div className="rounded border border-white/10 bg-white/[0.035] p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Active Operation</p>
                <p className="mt-2 font-mono text-2xl font-bold text-cyan-100">{selectedOperation}</p>
              </div>
              <div className="rounded border border-white/10 bg-white/[0.035] p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Bit Width</p>
                <p className="mt-2 font-mono text-2xl font-bold text-cyan-100">{result?.bitWidth || '-'}</p>
              </div>
              <div className="rounded border border-white/10 bg-white/[0.035] p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Mode</p>
                <p className="mt-2 text-sm font-semibold text-cyan-100">
                  {mode === 'beginner' ? 'Beginner Mode' : 'Expert Mode'}
                </p>
              </div>
              <div className="rounded border border-white/10 bg-white/[0.035] p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">CPU Status</p>
                <p className={`mt-2 text-sm font-semibold ${result?.status === 'Error' ? 'text-pink-300' : 'text-emerald-300'}`}>
                  {result?.status || 'Idle'}
                </p>
              </div>
            </div>
          </section>

          <section className="cpu-card min-w-0 rounded p-4 md:p-5">
            <h3 className="text-lg font-semibold text-white">Truth Table Preview</h3>
            <div className="mt-4 overflow-x-auto rounded border border-cyan-300/20">
              <table className="w-full min-w-[300px] text-left font-mono text-xs">
                <thead className="bg-cyan-300/10 text-cyan-100">
                  <tr>
                    <th className="p-2">A</th>
                    <th className="p-2">B</th>
                    <th className="p-2">AND</th>
                    <th className="p-2">OR</th>
                    <th className="p-2">XOR</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  {[
                    ['0', '0', '0', '0', '0'],
                    ['0', '1', '0', '1', '1'],
                    ['1', '0', '0', '1', '1'],
                    ['1', '1', '1', '1', '0'],
                  ].map((row) => (
                    <tr key={row.join('')} className="border-t border-white/8">
                      {row.map((cell, index) => (
                        <td key={`${cell}-${index}`} className="p-2">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
