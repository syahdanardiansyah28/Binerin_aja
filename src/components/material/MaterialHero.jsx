import { useState } from 'react';

export default function MaterialHero({ material }) {
  const [imageFailed, setImageFailed] = useState(false);

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
        {imageFailed ? (
          <div className="grid h-full place-items-center bg-linear-surface2">
            <div className="text-center">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-linear-accent/40 bg-linear-accent/10 font-mono text-linear-accent">
                {material.number}
              </span>
              <p className="mt-4 text-sm text-linear-muted">Ilustrasi {material.title}</p>
            </div>
          </div>
        ) : (
          <img
            className="h-full w-full object-cover"
            src={material.image}
            alt={`Ilustrasi materi ${material.title}`}
            onError={() => setImageFailed(true)}
          />
        )}
      </div>
    </div>
  );
}
