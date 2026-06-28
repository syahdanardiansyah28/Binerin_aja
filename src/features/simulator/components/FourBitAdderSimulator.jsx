import { useMemo, useState } from 'react';
import BinaryInput from '../../../components/common/BinaryInput';
import DataTable from '../../../components/common/DataTable';
import StatCard from '../../../components/common/StatCard';
import BinaryInput4Bit from '../../../components/simulation/BinaryInput4Bit';
import ExplanationCard from '../../../components/simulation/ExplanationCard';
import InputPanel from '../../../components/simulation/InputPanel';
import OutputPanel from '../../../components/simulation/OutputPanel';
import { calculateFourBitAdder } from '../logic/fourBitAdder';

export default function FourBitAdderSimulator() {
  const [inputA, setInputA] = useState('0101');
  const [inputB, setInputB] = useState('0011');
  const [carryIn, setCarryIn] = useState('0');
  const result = useMemo(() => calculateFourBitAdder(inputA, inputB, carryIn), [inputA, inputB, carryIn]);

  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(280px,340px)]">
      <div className="grid gap-5">
        <InputPanel title="4-bit Adder">
          <div className="grid gap-4 md:grid-cols-3">
            <BinaryInput4Bit label="A" value={inputA} onChange={setInputA} />
            <BinaryInput4Bit label="B" value={inputB} onChange={setInputB} />
            <BinaryInput label="Carry In" value={carryIn} onChange={setCarryIn} maxLength={1} placeholder="0" />
          </div>
        </InputPanel>

        <ExplanationCard title="Rangkaian">
          <p>Empat Full Adder dirangkai dari bit paling kanan. Cout dari satu bit menjadi Cin untuk bit di sebelah kirinya.</p>
        </ExplanationCard>

        <DataTable
          headers={['Bit', 'A', 'B', 'Cin', 'SUM', 'Cout']}
          rows={result.rows.map((row) => [row.bit, row.a, row.b, row.cin, row.sum, row.cout])}
          emptyText="Tabel proses muncul setelah input valid."
        />
      </div>

      <OutputPanel title="Output" status={result.isValid ? 'Valid' : 'Tidak Valid'} tone={result.isValid ? 'success' : 'danger'}>
        <div className="grid gap-3">
          <StatCard label="Result Biner" value={result.result || '-'} />
          <StatCard label="Result Desimal" value={result.decimal} />
          <StatCard label="Carry Out" value={result.carryOut} />
          {!result.isValid && <p className="rounded-md border border-linear-danger/30 bg-linear-dangerSurface p-3 text-sm text-linear-dangerText">{result.errorMessage}</p>}
        </div>
      </OutputPanel>
    </div>
  );
}
