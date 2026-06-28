import { useMemo, useState } from 'react';
import DataTable from '../../../components/common/DataTable';
import StatCard from '../../../components/common/StatCard';
import BinaryInput4Bit from '../../../components/simulation/BinaryInput4Bit';
import ExplanationCard from '../../../components/simulation/ExplanationCard';
import InputPanel from '../../../components/simulation/InputPanel';
import OutputPanel from '../../../components/simulation/OutputPanel';
import { calculateSubtractor } from '../logic/subtractor';

export default function SubtractorSimulator() {
  const [inputA, setInputA] = useState('0101');
  const [inputB, setInputB] = useState('0011');
  const result = useMemo(() => calculateSubtractor(inputA, inputB), [inputA, inputB]);

  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(280px,340px)]">
      <div className="grid gap-5">
        <InputPanel title="4-bit Subtractor">
          <div className="grid gap-4 md:grid-cols-2">
            <BinaryInput4Bit label="A" value={inputA} onChange={setInputA} />
            <BinaryInput4Bit label="B" value={inputB} onChange={setInputB} />
          </div>
        </InputPanel>

        <ExplanationCard title="Rangkaian">
          <p>Subtractor memproses pengurangan dari bit paling kanan sambil membawa Borrow ke bit berikutnya saat A tidak cukup besar.</p>
        </ExplanationCard>

        <DataTable
          headers={['Bit', 'A', 'B', 'Borrow In', 'Result', 'Borrow Out']}
          rows={result.rows.map((row) => [row.bit, row.a, row.b, row.borrowIn, row.result, row.borrowOut])}
          emptyText="Tabel proses muncul setelah input valid."
        />
      </div>

      <OutputPanel title="Output" status={result.isValid ? 'Valid' : 'Tidak Valid'} tone={result.isValid ? 'success' : 'danger'}>
        <div className="grid gap-3">
          <StatCard label="Result Biner" value={result.result || '-'} />
          <StatCard label="Result Desimal" value={result.decimal} />
          <StatCard label="Borrow Out" value={result.borrowOut} tone={result.underflow ? 'danger' : 'default'} />
          {!result.isValid && <p className="rounded-md border border-red-300/20 bg-red-300/10 p-3 text-sm text-red-100">{result.errorMessage}</p>}
        </div>
      </OutputPanel>
    </div>
  );
}
