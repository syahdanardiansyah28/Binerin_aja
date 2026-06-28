import { useMemo, useState } from 'react';
import DataTable from '../../../components/common/DataTable';
import StatCard from '../../../components/common/StatCard';
import BinaryInput4Bit from '../../../components/simulation/BinaryInput4Bit';
import ExplanationCard from '../../../components/simulation/ExplanationCard';
import InputPanel from '../../../components/simulation/InputPanel';
import OutputPanel from '../../../components/simulation/OutputPanel';
import SimulatorCircuitDiagram from '../../../components/simulation/SimulatorCircuitDiagram';
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

        <SimulatorCircuitDiagram
          title="Rangkaian Subtractor"
          type="subtractor"
          values={{ a: inputA, b: inputB, result: result.result, borrowOut: result.borrowOut }}
        />

        <OutputPanel title="Output" status={result.isValid ? 'Valid' : 'Tidak Valid'} tone={result.isValid ? 'success' : 'danger'}>
          <div className="grid gap-3">
            <StatCard label="Result Biner" value={result.result || '-'} />
            <StatCard label="Result Desimal" value={result.decimal} />
            <StatCard label="Borrow Out" value={result.borrowOut} tone={result.underflow ? 'danger' : 'default'} />
            {!result.isValid && (
              <p className="rounded-md border border-linear-danger/30 bg-linear-dangerSurface p-3 text-sm text-linear-dangerText">{result.errorMessage}</p>
            )}
          </div>
        </OutputPanel>

        <DataTable
          headers={['Bit', 'A', 'B', 'Borrow In', 'Result', 'Borrow Out']}
          rows={result.rows.map((row) => [row.bit, row.a, row.b, row.borrowIn, row.result, row.borrowOut])}
          emptyText="Tabel proses muncul setelah input valid."
        />
      </div>

      <div className="grid content-start gap-5">
        <ExplanationCard title="Konsep Subtractor">
          <p>
            Subtractor mengurangi A dengan B dari bit paling kanan. Saat nilai bit A tidak cukup untuk dikurangi B dan Borrow In, rangkaian
            meminjam ke bit berikutnya lalu meneruskan Borrow Out.
          </p>
        </ExplanationCard>
      </div>
    </div>
  );
}
