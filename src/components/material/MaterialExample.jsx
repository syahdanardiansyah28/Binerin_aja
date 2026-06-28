import Card from '../common/Card';

export default function MaterialExample({ example }) {
  return (
    <Card>
      <h2 className="text-xl font-medium text-linear-strong">Contoh Input-Output</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-md border border-linear-border/70 bg-linear-surface2 p-3">
          <p className="text-xs text-linear-subtle">Input</p>
          <p className="mt-2 font-mono text-sm leading-6 text-linear-text">{example.input}</p>
        </div>
        <div className="rounded-md border border-linear-border/70 bg-linear-surface2 p-3">
          <p className="text-xs text-linear-subtle">Output</p>
          <p className="mt-2 font-mono text-sm leading-6 text-linear-text">{example.output}</p>
        </div>
      </div>
    </Card>
  );
}
