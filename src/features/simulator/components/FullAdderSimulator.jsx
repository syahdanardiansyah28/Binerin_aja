import { useMemo, useState } from 'react';
import BinaryInput from '../../../components/common/BinaryInput';
import DataTable from '../../../components/common/DataTable';
import StatCard from '../../../components/common/StatCard';
import ExplanationCard from '../../../components/simulation/ExplanationCard';
import InputPanel from '../../../components/simulation/InputPanel';
import OutputPanel from '../../../components/simulation/OutputPanel';
import { evaluateFullAdder, fullAdderRows } from '../logic/fullAdder';

export default function FullAdderSimulator() {
  const [inputA, setInputA] = useState('1');
  const [inputB, setInputB] = useState('0');
  const [carryIn, setCarryIn] = useState('1');
  const result = useMemo(() => evaluateFullAdder(inputA, inputB, carryIn), [inputA, inputB, carryIn]);

  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(280px,340px)]">
      <div className="grid gap-5">
        <InputPanel title="Full Adder">
          <div className="grid gap-4 md:grid-cols-3">
            <BinaryInput label="A" value={inputA} onChange={setInputA} maxLength={1} placeholder="1" />
            <BinaryInput label="B" value={inputB} onChange={setInputB} maxLength={1} placeholder="0" />
            <BinaryInput label="Carry In" value={carryIn} onChange={setCarryIn} maxLength={1} placeholder="1" />
          </div>
        </InputPanel>

        <ExplanationCard title="Konsep">
          <p>Full Adder menambahkan Carry In. SUM berasal dari A XOR B XOR Cin, sementara Cout aktif ketika minimal dua input bernilai 1.</p>
        </ExplanationCard>

        <DataTable
          headers={['A', 'B', 'Cin', 'SUM', 'Cout']}
          rows={fullAdderRows().map((row) => [row.a, row.b, row.cin, row.sum, row.cout])}
        />
      </div>

      <OutputPanel title="Output" status={result.isValid ? 'Valid' : 'Tidak Valid'} tone={result.isValid ? 'success' : 'danger'}>
        <div className="grid gap-3">
          <StatCard label="SUM" value={result.sum} />
          <StatCard label="Carry Out" value={result.cout} />
          <StatCard label="Binary Result" value={result.binaryResult || '-'} />
          {!result.isValid && <p className="rounded-md border border-red-300/20 bg-red-300/10 p-3 text-sm text-red-100">{result.errorMessage}</p>}
        </div>
      </OutputPanel>
    </div>
  );
}
