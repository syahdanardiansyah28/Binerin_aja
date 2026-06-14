export default function ALUProcess({ result }) {
  const operation = result?.operation || 'ADD';
  const binaryNodes = [
    { label: 'Register A', value: result?.inputA || '----' },
    { label: 'Register B', value: result?.inputB || '----' },
    { label: 'ALU Core', value: operation },
    { label: 'Output', value: result?.binaryResult || '----' },
  ];
  const incDecNodes = [
    { label: 'Register A', value: result?.inputA || '----' },
    { label: result?.operandLabel || (operation === 'DEC' ? 'Constant -1' : 'Constant +1'), value: result?.inputB || '----' },
    { label: `ALU Core ${operation}`, value: operation },
    { label: 'Output', value: result?.binaryResult || '----' },
  ];
  const notNodes = [
    { label: 'Register A', value: result?.inputA || '----' },
    { label: 'ALU Core NOT', value: 'NOT' },
    { label: 'Output', value: result?.binaryResult || '----' },
  ];
  const nodes = operation === 'NOT' ? notNodes : operation === 'INC' || operation === 'DEC' ? incDecNodes : binaryNodes;
  return (
    <section className="cpu-card w-full max-w-full min-w-0 rounded p-4 md:p-5">
      <h3 className="mb-5 text-lg font-semibold text-white">ALU Process Visualization</h3>
      <div className="flex min-w-0 flex-col gap-3 md:flex-row md:items-center">
        {nodes.map((node, index) => (
          <div key={`${node.label}-${index}`} className="flex min-w-0 flex-col items-center gap-3 md:contents">
            <div className="mono-chip w-full min-w-0 rounded p-3 text-center md:p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/60">{node.label}</p>
              <p className="mt-2 break-all font-mono text-sm font-bold text-cyan-100 md:text-xl">{node.value}</p>
            </div>
            {index < nodes.length - 1 && (
              <>
                <div className="font-mono text-xl text-cyan-200/70 md:hidden">↓</div>
                <div className="hidden shrink-0 font-mono text-2xl text-cyan-200/70 md:block">-&gt;</div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
