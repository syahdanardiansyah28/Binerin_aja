const lineColor = 'rgb(var(--color-accent-hover))';
const accentColor = 'rgb(var(--color-accent))';
const fillColor = 'rgb(var(--color-accent) / 0.12)';
const surfaceColor = 'rgb(var(--color-surface-2))';
const textColor = 'rgb(var(--color-text))';
const mutedColor = 'rgb(var(--color-muted))';
const gridColor = 'rgb(var(--color-strong) / 0.06)';

const diagramById = {
  'logic-gates': LogicGatesDiagram,
  'half-adder': HalfAdderDiagram,
  'full-adder': FullAdderDiagram,
  'four-bit-adder': FourBitAdderDiagram,
  subtractor: SubtractorDiagram,
  multiplexer: MultiplexerDiagram,
  alu: AluDiagram,
};

export default function MaterialCircuitDiagram({ material, compact = false }) {
  const Diagram = diagramById[material.id] || GenericDiagram;
  const arrowId = `diagram-arrow-${material.id}-${compact ? 'compact' : 'full'}`;

  return (
    <svg className="h-full w-full" viewBox="0 0 720 360" role="img" aria-label={`Rangkaian ${material.title}`}>
      <defs>
        <marker id={arrowId} markerHeight="10" markerWidth="10" orient="auto" refX="8" refY="5">
          <path d="M0 0 L10 5 L0 10 Z" fill={lineColor} />
        </marker>
      </defs>
      <rect width="720" height="360" rx="16" fill={surfaceColor} />
      <g stroke={gridColor} strokeWidth="1">
        <path d="M44 62 H676" />
        <path d="M44 298 H676" />
        <path d="M96 32 V328" />
        <path d="M624 32 V328" />
      </g>
      <Diagram arrowId={arrowId} compact={compact} />
    </svg>
  );
}

function Wire({ d, arrowId, muted = false, width = 4 }) {
  return (
    <path
      d={d}
      fill="none"
      markerEnd={arrowId ? `url(#${arrowId})` : undefined}
      stroke={muted ? mutedColor : lineColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={width}
    />
  );
}

function Label({ x, y, children, anchor = 'middle', size = 16, muted = false, weight = 600 }) {
  return (
    <text
      fill={muted ? mutedColor : textColor}
      fontFamily="SF Mono, Monaco, Cascadia Code, Consolas, monospace"
      fontSize={size}
      fontWeight={weight}
      textAnchor={anchor}
      x={x}
      y={y}
    >
      {children}
    </text>
  );
}

function Gate({ kind, x, y, width = 92, height = 64, label, muted = false }) {
  const stroke = muted ? mutedColor : accentColor;
  const gateLabel = label === undefined ? kind.toUpperCase() : label;

  return (
    <g opacity={muted ? 0.55 : 1}>
      {kind === 'and' && (
        <path
          d={`M${x} ${y} H${x + width * 0.5} C${x + width} ${y} ${x + width} ${y + height} ${x + width * 0.5} ${y + height} H${x} Z`}
          fill={fillColor}
          stroke={stroke}
          strokeLinejoin="round"
          strokeWidth="3"
        />
      )}
      {(kind === 'or' || kind === 'xor') && (
        <>
          {kind === 'xor' && (
            <path
              d={`M${x - 10} ${y} C${x + width * 0.08} ${y + height * 0.28} ${x + width * 0.08} ${y + height * 0.72} ${x - 10} ${y + height}`}
              fill="none"
              stroke={stroke}
              strokeLinecap="round"
              strokeWidth="3"
            />
          )}
          <path
            d={`M${x} ${y} C${x + width * 0.36} ${y} ${x + width * 0.78} ${y} ${x + width} ${y + height / 2} C${x + width * 0.78} ${y + height} ${x + width * 0.36} ${y + height} ${x} ${y + height} C${x + width * 0.2} ${y + height * 0.66} ${x + width * 0.2} ${y + height * 0.34} ${x} ${y} Z`}
            fill={fillColor}
            stroke={stroke}
            strokeLinejoin="round"
            strokeWidth="3"
          />
        </>
      )}
      {kind === 'not' && (
        <>
          <path d={`M${x} ${y} L${x} ${y + height} L${x + width} ${y + height / 2} Z`} fill={fillColor} stroke={stroke} strokeLinejoin="round" strokeWidth="3" />
          <circle cx={x + width + 7} cy={y + height / 2} fill={surfaceColor} r="7" stroke={stroke} strokeWidth="3" />
        </>
      )}
      {gateLabel && (
        <Label x={kind === 'not' ? x + width * 0.42 : x + width * 0.52} y={y + height / 2 + 5} size={width < 54 ? 8 : 13}>
          {gateLabel}
        </Label>
      )}
    </g>
  );
}

function Mux({ x, y, width = 112, height = 174, label = 'MUX' }) {
  return (
    <g>
      <path d={`M${x} ${y} H${x + width * 0.64} L${x + width} ${y + height / 2} L${x + width * 0.64} ${y + height} H${x} Z`} fill={fillColor} stroke={accentColor} strokeWidth="3" />
      <Label x={x + width * 0.48} y={y + height / 2 + 7} size={18}>
        {label}
      </Label>
    </g>
  );
}

function LogicGatesDiagram({ arrowId }) {
  return (
    <g>
      <Label x="60" y="122" anchor="start" size="14">A</Label>
      <Label x="60" y="226" anchor="start" size="14">B</Label>
      <Wire d="M88 118 H152" />
      <Wire d="M88 222 H152" />
      <Gate kind="and" x="170" y="76" width="94" height="66" />
      <Gate kind="or" x="170" y="184" width="94" height="66" />
      <Gate kind="xor" x="350" y="76" width="94" height="66" />
      <Gate kind="not" x="350" y="190" width="70" height="54" />
      <Wire d="M152 118 H170" />
      <Wire d="M152 222 H170" />
      <Wire d="M264 109 H350" arrowId={arrowId} />
      <Wire d="M264 217 H350" arrowId={arrowId} />
      <Wire d="M444 109 H584" arrowId={arrowId} />
      <Wire d="M428 217 H584" arrowId={arrowId} />
      <Label x="610" y="115" anchor="start" size="14">XOR</Label>
      <Label x="610" y="223" anchor="start" size="14">NOT</Label>
    </g>
  );
}

function HalfAdderDiagram({ arrowId }) {
  return (
    <g>
      <Label x="58" y="112" anchor="start" size="14">A</Label>
      <Label x="58" y="218" anchor="start" size="14">B</Label>
      <Wire d="M84 108 H156" />
      <Wire d="M84 214 H156" />
      <Wire d="M156 108 C192 108 202 96 238 96" />
      <Wire d="M156 214 C192 214 202 140 238 140" />
      <Wire d="M156 108 C192 108 202 232 238 232" />
      <Wire d="M156 214 C192 214 202 272 238 272" />
      <Gate kind="xor" x="238" y="70" width="110" height="90" />
      <Gate kind="and" x="238" y="214" width="110" height="76" />
      <Wire d="M348 115 H526" arrowId={arrowId} />
      <Wire d="M348 252 H526" arrowId={arrowId} />
      <Label x="552" y="121" anchor="start" size="14">SUM</Label>
      <Label x="552" y="258" anchor="start" size="14">Carry</Label>
    </g>
  );
}

function FullAdderDiagram({ arrowId }) {
  return (
    <g>
      <Label x="50" y="94" anchor="start" size="13">A</Label>
      <Label x="50" y="158" anchor="start" size="13">B</Label>
      <Label x="50" y="286" anchor="start" size="13">Cin</Label>
      <Wire d="M84 90 H158" />
      <Wire d="M84 154 H158" />
      <Gate kind="xor" x="158" y="62" width="82" height="70" />
      <Gate kind="and" x="158" y="192" width="82" height="58" />
      <Wire d="M240 97 H306" />
      <Gate kind="xor" x="306" y="62" width="82" height="70" />
      <Wire d="M84 282 H272 V118 H306" />
      <Gate kind="and" x="306" y="192" width="82" height="58" />
      <Wire d="M240 221 H468 V216 H500" />
      <Wire d="M388 221 H500" />
      <Gate kind="or" x="500" y="180" width="96" height="78" />
      <Wire d="M388 97 H530" arrowId={arrowId} />
      <Wire d="M596 219 H652" arrowId={arrowId} />
      <Label x="554" y="103" anchor="start" size="13">SUM</Label>
      <Label x="660" y="225" anchor="start" size="13">Cout</Label>
    </g>
  );
}

function FourBitAdderDiagram({ arrowId }) {
  const bits = [118, 252, 386, 520];

  return (
    <g>
      <Label x="58" y="104" anchor="start" size="13">A[3:0]</Label>
      <Label x="58" y="178" anchor="start" size="13">B[3:0]</Label>
      <Label x="58" y="278" anchor="start" size="13">Cin</Label>
      <Wire d="M100 100 H650" width="3" />
      <Wire d="M100 174 H650" width="3" />
      <Wire d="M100 274 H650" width="3" />
      {bits.map((x, index) => (
        <AdderSlice key={x} x={x} bit={index} />
      ))}
      {bits.slice(0, -1).map((x, index) => (
        <Wire key={x} d={`M${x + 96} 248 H${bits[index + 1] - 12}`} arrowId={arrowId} width="2.5" />
      ))}
      <Wire d="M616 248 H664" arrowId={arrowId} />
      <Label x="672" y="254" anchor="start" size="13">Cout</Label>
      <Label x="356" y="320" size="13" muted>Empat Full Adder tersusun berantai</Label>
    </g>
  );
}

function AdderSlice({ x, bit }) {
  return (
    <g>
      <Label x={x + 52} y="78" size="11" muted>bit {bit}</Label>
      <Gate kind="xor" x={x} y="112" width="38" height="28" />
      <Gate kind="xor" x={x + 50} y="112" width="38" height="28" />
      <Gate kind="and" x={x} y="186" width="38" height="28" />
      <Gate kind="and" x={x + 50} y="186" width="38" height="28" />
      <Gate kind="or" x={x + 72} y="232" width="42" height="48" />
      <Wire d={`M${x - 18} 100 H${x}`} width="2.2" />
      <Wire d={`M${x - 18} 174 H${x}`} width="2.2" />
      <Wire d={`M${x + 38} 126 H${x + 50}`} width="2.2" />
      <Wire d={`M${x + 88} 126 V92`} width="2.2" />
      <Label x={x + 88} y="88" size="10" muted>S{bit}</Label>
      <Wire d={`M${x + 18} 274 V126 H${x + 50}`} width="2.2" />
      <Wire d={`M${x + 38} 200 H${x + 72}`} width="2.2" />
      <Wire d={`M${x + 88} 200 V250 H${x + 72}`} width="2.2" />
    </g>
  );
}

function SubtractorDiagram({ arrowId }) {
  const bits = [118, 252, 386, 520];

  return (
    <g>
      <Label x="58" y="104" anchor="start" size="13">A[3:0]</Label>
      <Label x="58" y="178" anchor="start" size="13">B[3:0]</Label>
      <Label x="58" y="278" anchor="start" size="13">Bin</Label>
      <Wire d="M100 100 H650" width="3" />
      <Wire d="M100 174 H650" width="3" />
      <Wire d="M100 274 H650" width="3" />
      {bits.map((x, index) => (
        <SubtractorSlice key={x} x={x} bit={index} />
      ))}
      {bits.slice(0, -1).map((x, index) => (
        <Wire key={x} d={`M${x + 98} 250 H${bits[index + 1] - 12}`} arrowId={arrowId} width="2.5" />
      ))}
      <Wire d="M618 250 H664" arrowId={arrowId} />
      <Label x="672" y="256" anchor="start" size="13">Bout</Label>
      <Label x="360" y="320" size="13" muted>Borrow merambat dari LSB ke MSB</Label>
    </g>
  );
}

function SubtractorSlice({ x, bit }) {
  return (
    <g>
      <Label x={x + 52} y="78" size="11" muted>bit {bit}</Label>
      <Gate kind="xor" x={x} y="112" width="38" height="28" />
      <Gate kind="xor" x={x + 50} y="112" width="38" height="28" />
      <Gate kind="not" x={x} y="188" width="28" height="26" />
      <Gate kind="and" x={x + 44} y="184" width="38" height="28" />
      <Gate kind="and" x={x + 44} y="224" width="38" height="28" />
      <Gate kind="or" x={x + 74} y="232" width="42" height="48" />
      <Wire d={`M${x - 18} 100 H${x}`} width="2.2" />
      <Wire d={`M${x - 18} 174 H${x}`} width="2.2" />
      <Wire d={`M${x + 38} 126 H${x + 50}`} width="2.2" />
      <Wire d={`M${x + 88} 126 V92`} width="2.2" />
      <Label x={x + 88} y="88" size="10" muted>D{bit}</Label>
      <Wire d={`M${x + 36} 201 H${x + 44}`} width="2.2" />
      <Wire d={`M${x + 18} 274 V238 H${x + 44}`} width="2.2" />
      <Wire d={`M${x + 82} 198 H${x + 92} V246 H${x + 74}`} width="2.2" />
      <Wire d={`M${x + 82} 238 H${x + 74}`} width="2.2" />
    </g>
  );
}

function MultiplexerDiagram({ arrowId }) {
  const rows = [78, 136, 194, 252];

  return (
    <g>
      {rows.map((y, index) => (
        <g key={y}>
          <Label x="66" y={y + 5} anchor="start" size="12">I{index}</Label>
          <Wire d={`M102 ${y} H238`} width="3" />
          <Gate kind="and" x="238" y={y - 24} width="88" height="48" />
          <Wire d={`M326 ${y} H462`} width="3" />
        </g>
      ))}
      <Gate kind="not" x="138" y="304" width="46" height="36" />
      <Label x="212" y="328" size="12" muted>S1/S0</Label>
      <Gate kind="or" x="462" y="114" width="126" height="142" />
      <Wire d="M588 185 H652" arrowId={arrowId} />
      <Label x="664" y="191" anchor="start" size="14">OUT</Label>
    </g>
  );
}

function AluDiagram({ arrowId }) {
  return (
    <g>
      <Label x="58" y="106" anchor="start" size="13">A</Label>
      <Label x="58" y="220" anchor="start" size="13">B</Label>
      <Wire d="M86 102 H156" />
      <Wire d="M86 216 H156" />
      <Gate kind="and" x="180" y="64" width="82" height="56" />
      <Gate kind="or" x="180" y="132" width="82" height="56" />
      <Gate kind="xor" x="180" y="202" width="82" height="56" />
      <Gate kind="and" x="300" y="170" width="82" height="56" />
      <Gate kind="or" x="300" y="240" width="82" height="56" />
      <Wire d="M262 92 H424" />
      <Wire d="M262 160 H424" />
      <Wire d="M262 230 H424" />
      <Wire d="M382 198 H424" />
      <Wire d="M382 268 H424" />
      <Mux x="424" y="74" width="126" height="214" />
      <Wire d="M550 181 H650" arrowId={arrowId} />
      <Label x="662" y="187" anchor="start" size="14">OUT</Label>
      <Label x="488" y="316" size="12" muted>Opcode memilih operasi</Label>
    </g>
  );
}

function GenericDiagram({ arrowId }) {
  return (
    <g>
      <Gate kind="and" x="180" y="138" width="110" height="78" />
      <Wire d="M290 177 H430" arrowId={arrowId} />
      <Mux x="430" y="112" width="110" height="130" label="OUT" />
    </g>
  );
}
