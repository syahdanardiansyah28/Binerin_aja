import { useMemo, useState } from 'react';
import BinaryInput from '../../../components/common/BinaryInput';
import Button from '../../../components/common/Button';
import DataTable from '../../../components/common/DataTable';
import StatCard from '../../../components/common/StatCard';
import ExplanationCard from '../../../components/simulation/ExplanationCard';
import InputPanel from '../../../components/simulation/InputPanel';
import OutputPanel from '../../../components/simulation/OutputPanel';
import LogicGateSymbol from '../../../components/LogicGateSymbol';
import { gateDescriptions, gateOptions } from '../data/gateDescriptions';
import { evaluateLogicGate, truthRowsForGate } from '../logic/logicGates';

export default function LogicGateSimulator() {
  const [inputA, setInputA] = useState('0101');
  const [inputB, setInputB] = useState('0011');
  const [gate, setGate] = useState('AND');
  const usesB = gate !== 'NOT';
  const result = useMemo(() => evaluateLogicGate(inputA, inputB, gate), [inputA, inputB, gate]);
  const truthRows = useMemo(() => truthRowsForGate(gate), [gate]);

  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(280px,340px)]">
      <div className="grid min-w-0 gap-5">
        <InputPanel title="Gerbang Logika">
          <div className="grid gap-4 md:grid-cols-2">
            <BinaryInput label="Input A" value={inputA} onChange={setInputA} />
            <BinaryInput label="Input B" value={inputB} onChange={setInputB} disabled={!usesB} />
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
            {gateOptions.map((item) => (
              <Button
                key={item}
                className="rounded-md"
                variant={gate === item ? 'primary' : 'outline'}
                onClick={() => setGate(item)}
              >
                {item}
              </Button>
            ))}
          </div>
        </InputPanel>

        <ExplanationCard title={`Rumus ${gate}`}>
          <p>{gateDescriptions[gate]}</p>
          {result.isValid && (
            <p className="mt-3">
              A dibaca sebagai <span className="font-mono text-linear-text">{result.paddedA}</span>
              {usesB && (
                <>
                  {' '}dan B dibaca sebagai <span className="font-mono text-linear-text">{result.paddedB}</span>
                </>
              )}
              . Output disusun dari hasil setiap posisi bit.
            </p>
          )}
        </ExplanationCard>

        <DataTable
          headers={usesB ? ['Bit', 'A', 'B', 'Output'] : ['Bit', 'A', 'Output']}
          rows={result.rows.map((row) => (usesB ? [row.bit, row.a, row.b, row.output] : [row.bit, row.a, row.output]))}
          emptyText="Tabel proses muncul setelah input valid."
        />
      </div>

      <aside className="grid content-start gap-5">
        <OutputPanel title="Output" status={result.isValid ? 'Valid' : 'Tidak Valid'} tone={result.isValid ? 'success' : 'danger'}>
          <div className="grid gap-3">
            <StatCard label="Output Biner" value={result.output || '-'} />
            <StatCard label="Output Desimal" value={result.decimal} />
            {!result.isValid && <p className="rounded-md border border-linear-danger/30 bg-linear-dangerSurface p-3 text-sm text-linear-dangerText">{result.errorMessage}</p>}
          </div>
        </OutputPanel>

        <LogicGateSymbol gate={gate} inputA={result.paddedA || '-'} inputB={result.paddedB || '-'} output={result.output || '-'} />

        <OutputPanel title="Truth Table" status={gate} tone="neutral">
          <DataTable
            headers={usesB ? ['A', 'B', 'Output'] : ['A', 'Output']}
            rows={truthRows}
          />
        </OutputPanel>
      </aside>
    </div>
  );
}
