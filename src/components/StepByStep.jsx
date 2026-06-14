export default function StepByStep({ result, mode }) {
  if (!result?.stepLines?.length || mode !== 'beginner') return null;

  return (
    <section className="cpu-card rounded p-5">
      <h3 className="mb-4 text-lg font-semibold text-white">Step by Step</h3>
      <pre className="overflow-x-auto rounded border border-cyan-300/20 bg-slate-950/70 p-5 font-mono text-xl leading-8 text-cyan-100">
        {result.stepLines.join('\n')}
      </pre>
    </section>
  );
}
