import { useMemo, useState } from 'react';
import BinaryInput from '../../../components/common/BinaryInput';
import DataTable from '../../../components/common/DataTable';
import StatCard from '../../../components/common/StatCard';
import BinaryInput4Bit from '../../../components/simulation/BinaryInput4Bit';
import ExplanationCard from '../../../components/simulation/ExplanationCard';
import InputPanel from '../../../components/simulation/InputPanel';
import OutputPanel from '../../../components/simulation/OutputPanel';
import SimulatorCircuitDiagram from '../../../components/simulation/SimulatorCircuitDiagram';
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

        <SimulatorCircuitDiagram
          title="Rangkaian 4-bit Adder"
          type="four-bit-adder"
          values={{ a: inputA, b: inputB, cin: carryIn, result: result.result, cout: result.carryOut }}
        />

        <OutputPanel title="Output" status={result.isValid ? 'Valid' : 'Tidak Valid'} tone={result.isValid ? 'success' : 'danger'}>
          <div className="grid gap-3">
            <StatCard label="Result Biner" value={result.result || '-'} />
            <StatCard label="Result Desimal" value={result.decimal} />
            <StatCard label="Carry Out" value={result.carryOut} />
            {!result.isValid && (
              <p className="rounded-md border border-linear-danger/30 bg-linear-dangerSurface p-3 text-sm text-linear-dangerText">{result.errorMessage}</p>
            )}
          </div>
        </OutputPanel>

        <DataTable
          headers={['Bit', 'A', 'B', 'Cin', 'SUM', 'Cout']}
          rows={result.rows.map((row) => [row.bit, row.a, row.b, row.cin, row.sum, row.cout])}
          emptyText="Tabel proses muncul setelah input valid."
        />
      </div>

      <div className="grid content-start gap-5">
        <ExplanationCard title="Konsep 4-bit Adder">
          <p>
            4-bit Adder menyusun empat Full Adder secara berantai. Proses dimulai dari bit paling kanan, lalu Carry Out dari satu bit masuk
            sebagai Carry In untuk bit berikutnya sampai hasil 4 bit dan Carry akhir terbentuk.
          </p>
        </ExplanationCard>
      </div>
    </div>
  );
}
