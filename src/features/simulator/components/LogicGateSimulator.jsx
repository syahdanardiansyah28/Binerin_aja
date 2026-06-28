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

const formulaDetails = {
  AND: {
    formula: 'X = A * B',
    description:
      'Gerbang AND membandingkan bit A dan B pada posisi yang sama. Output X bernilai 1 hanya ketika kedua bit tersebut sama-sama 1; selain itu hasilnya 0.',
  },
  OR: {
    formula: 'X = A + B',
    description:
      'Gerbang OR menghasilkan 1 ketika minimal salah satu input bernilai 1. Cara ini berguna ketika sebuah rangkaian hanya perlu mendeteksi apakah ada sinyal aktif.',
  },
  XOR: {
    formula: 'X = A XOR B',
    description:
      'Gerbang XOR menghasilkan 1 saat dua input berbeda. Prinsip ini menjadi dasar pembentukan SUM pada Half Adder karena dapat mendeteksi bit yang tidak sama.',
  },
  NAND: {
    formula: 'X = NOT(A * B)',
    description:
      'Gerbang NAND adalah kebalikan AND. Output X bernilai 0 hanya ketika A dan B sama-sama 1, sedangkan kombinasi lain menghasilkan 1.',
  },
  NOR: {
    formula: 'X = NOT(A + B)',
    description:
      'Gerbang NOR adalah kebalikan OR. Output X bernilai 1 hanya ketika semua input bernilai 0, sehingga ia menandai kondisi tanpa sinyal aktif.',
  },
  XNOR: {
    formula: 'X = NOT(A XOR B)',
    description:
      'Gerbang XNOR menghasilkan 1 ketika A dan B memiliki nilai yang sama. Gate ini sering dipakai untuk membaca kesamaan dua bit.',
  },
  NOT: {
    formula: 'X = NOT(A)',
    description:
      'Gerbang NOT hanya memakai satu input. Setiap bit pada A dibalik: 0 menjadi 1 dan 1 menjadi 0, sehingga input B tidak digunakan.',
  },
};

export default function LogicGateSimulator() {
  const [inputA, setInputA] = useState('0101');
  const [inputB, setInputB] = useState('0011');
  const [gate, setGate] = useState('AND');
  const usesB = gate !== 'NOT';
  const result = useMemo(() => evaluateLogicGate(inputA, inputB, gate), [inputA, inputB, gate]);
  const truthRows = useMemo(() => truthRowsForGate(gate), [gate]);
  const formulaDetail = formulaDetails[gate];

  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(320px,420px)]">
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

        <LogicGateSymbol
          gate={gate}
          inputA={result.paddedA || '-'}
          inputB={result.paddedB || '-'}
          output={result.output || '-'}
          title={`Rangkaian ${gate}`}
        />

        <OutputPanel title="Output" status={result.isValid ? 'Valid' : 'Tidak Valid'} tone={result.isValid ? 'success' : 'danger'}>
          <div className="grid gap-3">
            <StatCard label="Output Biner" value={result.output || '-'} />
            <StatCard label="Output Desimal" value={result.decimal} />
            {!result.isValid && <p className="rounded-md border border-linear-danger/30 bg-linear-dangerSurface p-3 text-sm text-linear-dangerText">{result.errorMessage}</p>}
          </div>
        </OutputPanel>

        <DataTable
          headers={usesB ? ['Bit', 'A', 'B', 'Output'] : ['Bit', 'A', 'Output']}
          rows={result.rows.map((row) => (usesB ? [row.bit, row.a, row.b, row.output] : [row.bit, row.a, row.output]))}
          emptyText="Tabel proses muncul setelah input valid."
        />
      </div>

      <aside className="grid content-start gap-5">
        <ExplanationCard title={`Rumus ${gate}`}>
          <div className="rounded-md border border-linear-border/70 bg-linear-surface2 p-3">
            <p className="text-xs text-linear-subtle">Formula Output</p>
            <p className="mt-2 font-mono text-base text-linear-text">{formulaDetail.formula}</p>
          </div>
          <p className="mt-4">{formulaDetail.description}</p>
          <p className="mt-3">{gateDescriptions[gate]}</p>
          {result.isValid && (
            <div className="mt-4 rounded-md border border-linear-border/70 bg-linear-surface2 p-3">
              <p className="text-xs text-linear-subtle">Input saat ini</p>
              <p className="mt-2 font-mono text-sm leading-6 text-linear-text">
                A = {result.paddedA}
                {usesB ? `, B = ${result.paddedB}` : ', B tidak digunakan'}
              </p>
              <p className="mt-2 text-sm leading-6">
                Setiap posisi bit dibaca sejajar dari kiri ke kanan, lalu hasilnya disusun menjadi output X ={' '}
                <span className="font-mono text-linear-text">{result.output}</span>.
              </p>
            </div>
          )}
        </ExplanationCard>

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
