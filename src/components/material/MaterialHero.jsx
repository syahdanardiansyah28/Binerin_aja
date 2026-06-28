import MaterialCircuitDiagram from './MaterialCircuitDiagram';

export default function MaterialHero({ material }) {
  return (
    <div className="grid gap-6 rounded-lg border border-linear-border/70 bg-linear-surface p-4 md:p-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,1fr)] lg:items-center">
      <div>
        <p className="font-mono text-sm text-linear-muted">{material.number}</p>
        <h1 className="mt-3 text-4xl font-medium leading-tight text-linear-strong md:text-6xl">
          {material.title}
        </h1>
        <p className="mt-5 text-base leading-7 text-linear-muted md:text-lg">{material.summary}</p>
      </div>

      <div className="aspect-[16/10] overflow-hidden rounded-lg border border-linear-border/70 bg-linear-bg">
        <MaterialCircuitDiagram material={material} />
      </div>
    </div>
  );
}
