import { useMemo, useState } from 'react';
import BinaryInput from '../../../components/common/BinaryInput';
import DataTable from '../../../components/common/DataTable';
import StatCard from '../../../components/common/StatCard';
import ExplanationCard from '../../../components/simulation/ExplanationCard';
import InputPanel from '../../../components/simulation/InputPanel';
import OutputPanel from '../../../components/simulation/OutputPanel';
import { evaluateHalfAdder, halfAdderRows } from '../logic/halfAdder';

export default function HalfAdderSimulator() {
  const [inputA, setInputA] = useState('1');
  const [inputB, setInputB] = useState('0');
  const result = useMemo(() => evaluateHalfAdder(inputA, inputB), [inputA, inputB]);

  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(280px,340px)]">
      <div className="grid gap-5">
        <InputPanel title="Half Adder">
          <div className="grid gap-4 md:grid-cols-2">
            <BinaryInput label="A" value={inputA} onChange={setInputA} maxLength={1} placeholder="1" />
            <BinaryInput label="B" value={inputB} onChange={setInputB} maxLength={1} placeholder="0" />
          </div>
        </InputPanel>

        <ExplanationCard title="Konsep">
          <p>Half Adder menjumlahkan dua bit. SUM memakai XOR, Carry memakai AND.</p>
        </ExplanationCard>

        <DataTable
          headers={['A', 'B', 'SUM', 'Carry']}
          rows={halfAdderRows().map((row) => [row.a, row.b, row.sum, row.carry])}
        />
      </div>

      <OutputPanel title="Output" status={result.isValid ? 'Valid' : 'Tidak Valid'} tone={result.isValid ? 'success' : 'danger'}>
        <div className="grid gap-3">
          <StatCard label="SUM" value={result.sum} />
          <StatCard label="Carry" value={result.carry} />
          <StatCard label="Binary Result" value={result.binaryResult || '-'} />
          {!result.isValid && <p className="rounded-md border border-linear-danger/30 bg-linear-dangerSurface p-3 text-sm text-linear-dangerText">{result.errorMessage}</p>}
        </div>
      </OutputPanel>
    </div>
  );
}
