export default function StepByStep({ result, mode }) {
  if (!result?.stepLines?.length || mode !== 'beginner') return null;

  return (
    <section className="cpu-card w-full max-w-full min-w-0 rounded p-4 md:p-5">
      <h3 className="mb-4 text-lg font-semibold text-white">Step by Step</h3>
      <pre className="max-w-full overflow-x-auto rounded border border-cyan-300/20 bg-slate-950/70 p-4 font-mono text-sm leading-7 text-cyan-100 md:p-5 md:text-xl md:leading-8">
        {result.stepLines.join('\n')}
      </pre>
    </section>
  );
}
