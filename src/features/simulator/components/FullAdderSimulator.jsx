import { useMemo, useState } from 'react';
import BinaryInput from '../../../components/common/BinaryInput';
import DataTable from '../../../components/common/DataTable';
import StatCard from '../../../components/common/StatCard';
import ExplanationCard from '../../../components/simulation/ExplanationCard';
import InputPanel from '../../../components/simulation/InputPanel';
import OutputPanel from '../../../components/simulation/OutputPanel';
import SimulatorCircuitDiagram from '../../../components/simulation/SimulatorCircuitDiagram';
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

        <SimulatorCircuitDiagram
          title="Rangkaian Full Adder"
          type="full-adder"
          values={{ a: inputA, b: inputB, cin: carryIn, sum: result.sum, cout: result.cout }}
        />

        <OutputPanel title="Output" status={result.isValid ? 'Valid' : 'Tidak Valid'} tone={result.isValid ? 'success' : 'danger'}>
          <div className="grid gap-3">
            <StatCard label="SUM" value={result.sum} />
            <StatCard label="Carry Out" value={result.cout} />
            <StatCard label="Binary Result" value={result.binaryResult || '-'} />
            {!result.isValid && (
              <p className="rounded-md border border-linear-danger/30 bg-linear-dangerSurface p-3 text-sm text-linear-dangerText">{result.errorMessage}</p>
            )}
          </div>
        </OutputPanel>

        <DataTable
          headers={['A', 'B', 'Cin', 'SUM', 'Cout']}
          rows={fullAdderRows().map((row) => [row.a, row.b, row.cin, row.sum, row.cout])}
        />
      </div>

      <div className="grid content-start gap-5">
        <ExplanationCard title="Konsep Full Adder">
          <p>
            Full Adder menyambungkan dua Half Adder. A dan B diproses lebih dulu, lalu hasil SUM sementara dijumlahkan dengan Carry In. Dua
            keluaran Carry digabung memakai OR untuk menghasilkan Carry Out.
          </p>
        </ExplanationCard>
      </div>
    </div>
  );
}
