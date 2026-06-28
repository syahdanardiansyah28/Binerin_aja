import { useMemo, useState } from 'react';
import DataTable from '../../../components/common/DataTable';
import StatCard from '../../../components/common/StatCard';
import BinaryInput4Bit from '../../../components/simulation/BinaryInput4Bit';
import ExplanationCard from '../../../components/simulation/ExplanationCard';
import InputPanel from '../../../components/simulation/InputPanel';
import OutputPanel from '../../../components/simulation/OutputPanel';
import { formatBinaryWithDecimal } from '../../../utils/format';
import { aluOperations } from '../data/aluOperations';
import { calculateAlu } from '../logic/alu';

export default function AluSimulator() {
  const [inputA, setInputA] = useState('0101');
  const [inputB, setInputB] = useState('0011');
  const [operation, setOperation] = useState('ADD');
  const result = useMemo(() => calculateAlu(inputA, inputB, operation), [inputA, inputB, operation]);
  const selectedOperation = aluOperations.find((item) => item.id === operation) || aluOperations[0];
  const tableHeaders = ['ADD', 'SUB'].includes(operation)
    ? ['Bit', 'A', 'B', operation === 'ADD' ? 'Cin' : 'Borrow In', 'Result', operation === 'ADD' ? 'Cout' : 'Borrow Out']
    : ['Bit', 'A', 'B', 'Result'];
  const tableRows = result.rows.map((row) =>
    ['ADD', 'SUB'].includes(operation)
      ? [
          row.bit,
          row.a,
          row.b,
          operation === 'ADD' ? row.cin : row.borrowIn,
          operation === 'ADD' ? row.sum : row.result,
          operation === 'ADD' ? row.cout : row.borrowOut,
        ]
      : [row.bit, row.a, row.b, row.result],
  );

  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(280px,340px)]">
      <div className="grid gap-5">
        <InputPanel title="ALU Sederhana">
          <div className="grid gap-4 md:grid-cols-2">
            <BinaryInput4Bit label="Register A" value={inputA} onChange={setInputA} />
            <BinaryInput4Bit label="Register B" value={inputB} onChange={setInputB} />
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {aluOperations.map((item) => (
              <button
                key={item.id}
                className={`min-h-16 rounded-md border p-3 text-left transition ${
                  operation === item.id
                    ? 'border-linear-cta bg-linear-cta text-linear-bg shadow-primary'
                    : 'border-linear-border/70 bg-linear-surface2 text-linear-muted hover:text-linear-text'
                }`}
                type="button"
                onClick={() => setOperation(item.id)}
              >
                <span className="block font-mono text-sm">{item.selector}</span>
                <span className="mt-1 block text-base font-medium">{item.name}</span>
              </button>
            ))}
          </div>
        </InputPanel>

        <ExplanationCard title="Selector ALU">
          <p>{selectedOperation.description}</p>
          {result.explanation && <p className="mt-3">{result.explanation}</p>}
        </ExplanationCard>

        <DataTable headers={tableHeaders} rows={tableRows} emptyText="Tabel proses muncul setelah input valid." />
      </div>

      <OutputPanel title="Output" status={result.isValid ? 'Valid' : 'Tidak Valid'} tone={result.isValid ? 'success' : 'danger'}>
        <div className="grid gap-3">
          <StatCard label="Operation" value={operation} />
          <StatCard label="Result Biner" value={result.binaryResult ? formatBinaryWithDecimal(result.binaryResult) : '-'} />
          <StatCard label="Result Desimal" value={result.decimalResult} />
          <StatCard label="Flag" value={result.flag || '-'} tone={result.flag === 'Borrow' || result.flag === 'Carry' ? 'danger' : 'default'} />
          {!result.isValid && <p className="rounded-md border border-linear-danger/30 bg-linear-dangerSurface p-3 text-sm text-linear-dangerText">{result.errorMessage}</p>}
        </div>
      </OutputPanel>
    </div>
  );
}
