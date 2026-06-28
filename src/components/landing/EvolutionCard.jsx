import { useState } from 'react';

export default function EvolutionCard({ material }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <a
      className="group flex h-full min-w-0 flex-col rounded-lg border border-linear-border/70 bg-linear-surface p-4 text-linear-text transition duration-200 hover:-translate-y-1 hover:border-linear-accent hover:bg-linear-surface2 hover:shadow-primary"
      href={`#/materi/${material.slug}`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-sm text-linear-muted">{material.number}</span>
        <span className="text-xs font-medium text-linear-accent opacity-80 transition group-hover:opacity-100">
          Pelajari konsep -&gt;
        </span>
      </div>

      <div className="mt-4 aspect-[16/10] overflow-hidden rounded-md border border-linear-border/70 bg-linear-bg">
        {imageFailed ? (
          <div className="grid h-full place-items-center bg-linear-surface2">
            <span className="grid h-12 w-12 place-items-center rounded-full border border-linear-accent/40 bg-linear-accent/10 font-mono text-sm text-linear-accent">
              {material.number}
            </span>
          </div>
        ) : (
          <img
            className="h-full w-full object-cover"
            src={material.image}
            alt={`Ilustrasi ${material.title}`}
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        )}
      </div>

      <h3 className="mt-4 text-lg font-medium text-linear-strong">{material.title}</h3>
      <p className="mt-3 text-sm leading-6 text-linear-muted">{material.summary}</p>
    </a>
  );
}
