const bubbleGates = ['NAND', 'NOR', 'XNOR'];

export default function GateSymbol({ gate }) {
  const hasBubble = bubbleGates.includes(gate);
  const isOrFamily = ['OR', 'NOR', 'XOR', 'XNOR'].includes(gate);
  const isXorFamily = ['XOR', 'XNOR'].includes(gate);

  const outputLineStart = gate === 'NOT' ? 156 : hasBubble ? 172 : 150;

  return (
    <svg className="h-20 w-full" viewBox="0 0 220 110" role="img" aria-label={`${gate} symbol`}>
      <defs>
        <filter id={`gate-glow-${gate}`}>
          <feGaussianBlur stdDeviation="2.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g stroke="rgb(var(--color-accent-hover))" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {gate === 'NOT' ? (
          <>
            <path d="M24 55 H62" />
            <path d="M62 24 L62 86 L134 55 Z" fill="rgb(var(--color-accent) / 0.12)" />
            <circle cx="146" cy="55" r="10" fill="rgb(var(--color-surface))" />
            <path d="M156 55 H198" />
          </>
        ) : (
          <>
            <path d="M24 35 H66" />
            <path d="M24 75 H66" />
            <path d={`M${outputLineStart} 55 H198`} />

            {['AND', 'NAND'].includes(gate) && (
              <path d="M66 22 H108 Q150 22 150 55 Q150 88 108 88 H66 Z" fill="rgb(var(--color-accent) / 0.12)" />
            )}

            {isOrFamily && (
              <>
                {isXorFamily && <path d="M54 24 Q76 55 54 86" />}
                <path d="M66 22 Q112 22 150 55 Q112 88 66 88 Q88 55 66 22 Z" fill="rgb(var(--color-accent) / 0.12)" />
              </>
            )}

            {hasBubble && <circle cx={gate === 'NAND' ? 162 : 162} cy="55" r="10" fill="rgb(var(--color-surface))" />}
          </>
        )}
      </g>

      <g fontFamily="SF Mono, Monaco, Consolas, monospace" fontSize="10" fill="rgb(var(--color-muted))">
        <text x="10" y={gate === 'NOT' ? 50 : 31}>A</text>
        {gate !== 'NOT' && <text x="10" y="79">B</text>}
        <text x="166" y="47">OUT</text>
      </g>
    </svg>
  );
}
