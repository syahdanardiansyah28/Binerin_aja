import MaterialCircuitDiagram from '../material/MaterialCircuitDiagram';

export default function EvolutionCard({ material }) {
  return (
    <a
      className="group flex h-full min-w-0 flex-col rounded-lg border border-linear-border/70 bg-linear-surface p-4 text-linear-text transition duration-200 hover:-translate-y-1 hover:border-linear-accent hover:bg-linear-surface2 hover:shadow-primary"
      href={`#/materi/${material.slug}`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-sm text-linear-muted">{material.number}</span>
      </div>

      <div className="mt-4 aspect-[16/10] overflow-hidden rounded-md border border-linear-border/70 bg-linear-bg">
        <MaterialCircuitDiagram compact material={material} />
      </div>

      <h3 className="mt-4 text-lg font-medium text-linear-strong">{material.title}</h3>
      <span className="mt-auto pt-5 text-xs font-medium text-linear-accent opacity-80 transition group-hover:opacity-100">
        Pelajari konsep -&gt;
      </span>
    </a>
  );
}
