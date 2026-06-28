import { useMemo, useState } from 'react';
import BinaryInput from '../../../components/common/BinaryInput';
import BinaryToggle from '../../../components/common/BinaryToggle';
import DataTable from '../../../components/common/DataTable';
import StatCard from '../../../components/common/StatCard';
import ExplanationCard from '../../../components/simulation/ExplanationCard';
import InputPanel from '../../../components/simulation/InputPanel';
import OutputPanel from '../../../components/simulation/OutputPanel';
import SimulatorCircuitDiagram from '../../../components/simulation/SimulatorCircuitDiagram';
import { evaluateMultiplexer } from '../logic/multiplexer';

export default function MultiplexerSimulator() {
  const [inputs, setInputs] = useState(['1', '0', '1', '0']);
  const [selector, setSelector] = useState('10');
  const result = useMemo(() => evaluateMultiplexer(inputs, selector), [inputs, selector]);

  const setInputAt = (index, value) => {
    setInputs((current) => current.map((item, itemIndex) => (itemIndex === index ? String(value) : item)));
  };

  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(280px,340px)]">
      <div className="grid gap-5">
        <InputPanel title="Multiplexer 4:1">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {inputs.map((input, index) => (
              <BinaryToggle key={`I${index}`} label={`I${index}`} value={input} onChange={(value) => setInputAt(index, value)} />
            ))}
          </div>
          <div className="mt-4 max-w-xs">
            <BinaryInput label="Selector" value={selector} onChange={setSelector} maxLength={2} placeholder="10" />
          </div>
        </InputPanel>

        <SimulatorCircuitDiagram
          title="Rangkaian Multiplexer 4:1"
          type="multiplexer"
          values={{
            inputs,
            output: result.output,
            selectedIndex: result.selectedIndex,
            selectedInput: result.selectedInput,
            selector,
          }}
        />

        <OutputPanel title="Output" status={result.isValid ? 'Valid' : 'Tidak Valid'} tone={result.isValid ? 'success' : 'danger'}>
          <div className="grid gap-3">
            <StatCard label="Selected Input" value={result.selectedInput} />
            <StatCard label="Output" value={result.output} />
            {!result.isValid && (
              <p className="rounded-md border border-linear-danger/30 bg-linear-dangerSurface p-3 text-sm text-linear-dangerText">{result.errorMessage}</p>
            )}
          </div>
        </OutputPanel>

        <DataTable
          headers={['Input', 'Value', 'Selected']}
          rows={result.rows.map((row) => [row.input, row.value, row.active ? 'Ya' : 'Tidak'])}
          emptyText="Tabel muncul setelah input valid."
        />
      </div>

      <div className="grid content-start gap-5">
        <ExplanationCard title="Konsep Multiplexer">
          <p>
            Multiplexer 4:1 bekerja seperti pemilih jalur. Dua bit selector menentukan input mana yang diteruskan ke output: 00 untuk I0, 01
            untuk I1, 10 untuk I2, dan 11 untuk I3.
          </p>
        </ExplanationCard>
      </div>
    </div>
  );
}
