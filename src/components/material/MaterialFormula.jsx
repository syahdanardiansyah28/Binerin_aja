import Card from '../common/Card';

export default function MaterialFormula({ formula }) {
  return (
    <Card>
      <h2 className="text-xl font-medium text-linear-strong">Rumus / Prinsip</h2>
      <div className="mt-4 grid gap-3">
        {formula.map((item) => (
          <div key={item} className="rounded-md border border-linear-border/70 bg-linear-surface2 p-3 font-mono text-sm text-linear-text">
            {item}
          </div>
        ))}
      </div>
    </Card>
  );
}
