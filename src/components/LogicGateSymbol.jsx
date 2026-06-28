const gatePaths = {
  AND: (
    <>
      <path d="M130 70 H190 Q250 70 250 130 Q250 190 190 190 H130 Z" />
    </>
  ),
  OR: (
    <>
      <path d="M124 70 Q184 72 236 130 Q184 188 124 190 Q154 130 124 70 Z" />
    </>
  ),
  XOR: (
    <>
      <path d="M108 72 Q138 130 108 188" />
      <path d="M124 70 Q184 72 236 130 Q184 188 124 190 Q154 130 124 70 Z" />
    </>
  ),
  NOT: (
    <>
      <path d="M132 78 L132 182 L238 130 Z" />
      <circle cx="252" cy="130" r="12" />
    </>
  ),
  NAND: (
    <>
      <path d="M130 70 H190 Q250 70 250 130 Q250 190 190 190 H130 Z" />
      <circle cx="265" cy="130" r="12" />
    </>
  ),
  NOR: (
    <>
      <path d="M124 70 Q184 72 236 130 Q184 188 124 190 Q154 130 124 70 Z" />
      <circle cx="251" cy="130" r="12" />
    </>
  ),
  XNOR: (
    <>
      <path d="M108 72 Q138 130 108 188" />
      <path d="M124 70 Q184 72 236 130 Q184 188 124 190 Q154 130 124 70 Z" />
      <circle cx="251" cy="130" r="12" />
    </>
  ),
};

export default function LogicGateSymbol({ gate, inputA, inputB, output, title = '', className = '' }) {
  const isNot = gate === 'NOT';
  const outputStart = ['NAND', 'NOR', 'XNOR'].includes(gate) ? 277 : gate === 'NOT' ? 264 : 250;
  const outputText = String(output ?? '-');
  const inputTextLength = Math.max(String(inputA ?? '-').length, String(inputB ?? '-').length);
  const inputFontSize = inputTextLength > 8 ? 11 : inputTextLength > 4 ? 12 : 13;
  const outputFontSize = outputText.length > 8 ? 14 : outputText.length > 4 ? 17 : 20;

  return (
    <div className={`min-w-0 overflow-hidden rounded-lg border border-linear-border/70 bg-linear-surface p-3 sm:p-4 ${className}`}>
      {title && (
        <div className="mb-3 flex items-center justify-between gap-3">
          <h3 className="text-lg font-medium text-linear-strong">{title}</h3>
          <span className="rounded-full border border-linear-border/70 bg-linear-surface2 px-3 py-1 font-mono text-xs text-linear-muted">
            A/B -&gt; X
          </span>
        </div>
      )}
      <svg className="h-auto w-full" viewBox="0 0 420 260" role="img" aria-label={`${gate} gate symbol`}>
        <rect width="420" height="260" rx="8" fill="rgb(var(--color-surface))" />
        <g stroke="rgb(var(--color-strong) / 0.06)" strokeWidth="1">
          <path d="M18 52 H402" />
          <path d="M18 208 H402" />
          <path d="M70 22 V238" />
          <path d="M326 22 V238" />
        </g>

        <g stroke="rgb(var(--color-accent-hover))" strokeWidth="3.5" strokeLinecap="round" fill="none">
          {isNot ? (
            <path d="M82 130 H132" />
          ) : (
            <>
              <path d="M82 98 H130" />
              <path d="M82 162 H130" />
            </>
          )}
          <path d={`M${outputStart} 130 H326`} />
        </g>

        <g stroke="rgb(var(--color-accent))" strokeWidth="3.5" fill="rgb(var(--color-accent) / 0.14)">
          {gatePaths[gate]}
        </g>

        <g fontFamily="SF Mono, Monaco, Consolas, monospace" fill="rgb(var(--color-text))">
          <text x="36" y={isNot ? 122 : 91} fontSize="12" fontWeight="700">A</text>
          <text x="36" y={isNot ? 152 : 122} fontSize={inputFontSize}>{inputA}</text>
          {!isNot && (
            <>
              <text x="36" y="156" fontSize="12" fontWeight="700">B</text>
              <text x="36" y="187" fontSize={inputFontSize}>{inputB}</text>
            </>
          )}
          <text x="336" y="113" fontSize="12" fontWeight="700">X</text>
          <text x="394" y="137" textAnchor="end" fontSize={outputFontSize} fontWeight="700">{outputText}</text>
          <text x="190" y="222" textAnchor="middle" fontSize="13" fill="rgb(var(--color-accent-hover))">{gate}</text>
        </g>
      </svg>
    </div>
  );
}
