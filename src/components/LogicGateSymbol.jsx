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

export default function LogicGateSymbol({ gate, inputA, inputB, output }) {
  const isNot = gate === 'NOT';
  const outputStart = ['NAND', 'NOR', 'XNOR'].includes(gate) ? 277 : gate === 'NOT' ? 264 : 250;

  return (
    <div className="mono-chip overflow-hidden rounded p-3 sm:p-4">
      <svg className="h-auto w-full" viewBox="0 0 420 260" role="img" aria-label={`${gate} gate symbol`}>
        <defs>
          <filter id="gateGlow">
            <feGaussianBlur stdDeviation="2.4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <rect width="420" height="260" rx="10" fill="rgba(2, 6, 23, 0.52)" />
        <g stroke="rgba(103,232,249,0.20)" strokeWidth="1">
          <path d="M0 52 H420" />
          <path d="M0 208 H420" />
          <path d="M52 0 V260" />
          <path d="M368 0 V260" />
        </g>

        <g stroke="#67e8f9" strokeWidth="4" strokeLinecap="round" fill="none" filter="url(#gateGlow)">
          {isNot ? (
            <path d="M58 130 H132" />
          ) : (
            <>
              <path d="M58 98 H130" />
              <path d="M58 162 H130" />
            </>
          )}
          <path d={`M${outputStart} 130 H362`} />
        </g>

        <g stroke="#22d3ee" strokeWidth="4" fill="rgba(34,211,238,0.08)" filter="url(#gateGlow)">
          {gatePaths[gate]}
        </g>

        <g fontFamily="Consolas, monospace" fontSize="15" fill="#cffafe">
          <text x="24" y={isNot ? 124 : 92}>A</text>
          <text x="24" y={isNot ? 145 : 156}>{inputA}</text>
          {!isNot && (
            <>
              <text x="24" y="183">B</text>
              <text x="24" y="204">{inputB}</text>
            </>
          )}
          <text x="340" y="112">OUT</text>
          <text x="372" y="135" fontSize="22" fontWeight="700">{output}</text>
          <text x="182" y="224" textAnchor="middle" fill="#67e8f9">{gate}</text>
        </g>
      </svg>
    </div>
  );
}
