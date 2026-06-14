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
  const gridClass = nodes.length === 3
    ? 'grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center'
    : 'grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] md:items-center';

  return (
    <section className="cpu-card rounded p-5">
      <h3 className="mb-5 text-lg font-semibold text-white">ALU Process Visualization</h3>
      <div className={gridClass}>
        {nodes.map((node, index) => (
          <div key={`${node.label}-${index}`} className="contents">
            <div className="mono-chip rounded p-4 text-center">
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/60">{node.label}</p>
              <p className="mt-2 break-all font-mono text-xl font-bold text-cyan-100">{node.value}</p>
            </div>
            {index < nodes.length - 1 && (
              <div className="hidden font-mono text-2xl text-cyan-200/70 md:block">-&gt;</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
