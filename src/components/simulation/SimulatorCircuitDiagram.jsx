import Card from '../common/Card';

const lineColor = 'rgb(var(--color-accent-hover))';
const accentColor = 'rgb(var(--color-accent))';
const fillColor = 'rgb(var(--color-accent) / 0.14)';
const surfaceColor = 'rgb(var(--color-surface-2))';
const textColor = 'rgb(var(--color-text))';
const mutedColor = 'rgb(var(--color-muted))';
const gridColor = 'rgb(var(--color-strong) / 0.07)';

const diagrams = {
  'half-adder': HalfAdderDiagram,
  'full-adder': FullAdderDiagram,
  'four-bit-adder': FourBitAdderDiagram,
  subtractor: SubtractorDiagram,
  multiplexer: MultiplexerDiagram,
  alu: AluDiagram,
};

const display = (value) => (value === null || value === undefined || value === '' ? '-' : String(value));
const coordinate = (value) => Number(value);

export default function SimulatorCircuitDiagram({ type, title, values = {}, className = '' }) {
  const Diagram = diagrams[type] || GenericDiagram;
  const arrowId = `sim-circuit-arrow-${type}`;

  return (
    <Card className={`overflow-hidden p-0 ${className}`}>
      <div className="flex flex-col gap-2 border-b border-linear-border/60 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-medium leading-6 text-linear-strong">{title}</h3>
        <span className="w-fit rounded-full border border-linear-border/70 bg-linear-surface2 px-3 py-1 font-mono text-xs text-linear-muted">
          Rangkaian visual
        </span>
      </div>
      <div className="p-3 md:p-4">
        <svg className="min-h-[320px] w-full" viewBox="0 0 820 430" role="img" aria-label={title}>
          <defs>
            <marker id={arrowId} markerHeight="10" markerWidth="10" orient="auto" refX="8" refY="5">
              <path d="M0 0 L10 5 L0 10 Z" fill={lineColor} />
            </marker>
          </defs>
          <rect width="820" height="430" rx="18" fill={surfaceColor} />
          <g stroke={gridColor} strokeWidth="1">
            <path d="M58 72 H762" />
            <path d="M58 350 H762" />
            <path d="M142 38 V392" />
            <path d="M680 38 V392" />
          </g>
          <Diagram arrowId={arrowId} values={values} />
        </svg>
      </div>
    </Card>
  );
}

function Wire({ d, arrowId, active = true, width = 4 }) {
  return (
    <path
      d={d}
      fill="none"
      markerEnd={arrowId ? `url(#${arrowId})` : undefined}
      stroke={active ? lineColor : mutedColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={width}
      opacity={active ? 1 : 0.45}
    />
  );
}

function Junction({ x, y, active = true }) {
  return <circle cx={x} cy={y} fill={active ? lineColor : mutedColor} opacity={active ? 1 : 0.45} r="5" />;
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

function ValueStack({ x, y, label, value, anchor = 'middle', active = true }) {
  const xPos = coordinate(x);
  const yPos = coordinate(y);

  return (
    <g opacity={active ? 1 : 0.55}>
      <Label x={xPos} y={yPos} anchor={anchor} size="12" muted weight="700">
        {label}
      </Label>
      <Label x={xPos} y={yPos + 34} anchor={anchor} size="25" weight="800">
        {display(value)}
      </Label>
    </g>
  );
}

function SmallValue({ x, y, label, value, anchor = 'middle', active = true, width = 94 }) {
  const xPos = coordinate(x);
  const yPos = coordinate(y);
  const widthValue = coordinate(width);
  const rectX = anchor === 'end' ? xPos - widthValue : anchor === 'middle' ? xPos - widthValue / 2 : xPos;

  return (
    <g opacity={active ? 1 : 0.5}>
      <rect
        fill="rgb(var(--color-surface))"
        height="40"
        rx="8"
        stroke={active ? accentColor : 'rgb(var(--color-border))'}
        strokeWidth="1.5"
        width={widthValue}
        x={rectX}
        y={yPos - 25}
      />
      <Label x={xPos} y={yPos - 7} anchor={anchor} size="10" muted>
        {label}
      </Label>
      <Label x={xPos} y={yPos + 13} anchor={anchor} size="15">
        {display(value)}
      </Label>
    </g>
  );
}

function GateSymbol({ kind, x, y, width = 100, height = 70, label, active = true }) {
  const xPos = coordinate(x);
  const yPos = coordinate(y);
  const w = coordinate(width);
  const h = coordinate(height);
  const stroke = active ? accentColor : 'rgb(var(--color-border))';
  const opacity = active ? 1 : 0.45;
  const gateLabel = label === undefined ? kind.toUpperCase() : label;

  return (
    <g opacity={opacity}>
      {kind === 'and' && (
        <path
          d={`M${xPos} ${yPos} H${xPos + w * 0.5} C${xPos + w} ${yPos} ${xPos + w} ${yPos + h} ${xPos + w * 0.5} ${yPos + h} H${xPos} Z`}
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
              d={`M${xPos - 13} ${yPos} C${xPos + w * 0.07} ${yPos + h * 0.28} ${xPos + w * 0.07} ${yPos + h * 0.72} ${xPos - 13} ${yPos + h}`}
              fill="none"
              stroke={stroke}
              strokeLinecap="round"
              strokeWidth="3"
            />
          )}
          <path
            d={`M${xPos} ${yPos} C${xPos + w * 0.35} ${yPos} ${xPos + w * 0.78} ${yPos} ${xPos + w} ${yPos + h / 2} C${xPos + w * 0.78} ${yPos + h} ${xPos + w * 0.35} ${yPos + h} ${xPos} ${yPos + h} C${xPos + w * 0.2} ${yPos + h * 0.66} ${xPos + w * 0.2} ${yPos + h * 0.34} ${xPos} ${yPos} Z`}
            fill={fillColor}
            stroke={stroke}
            strokeLinejoin="round"
            strokeWidth="3"
          />
        </>
      )}
      {kind === 'not' && (
        <>
          <path d={`M${xPos} ${yPos} L${xPos} ${yPos + h} L${xPos + w} ${yPos + h / 2} Z`} fill={fillColor} stroke={stroke} strokeLinejoin="round" strokeWidth="3" />
          <circle cx={xPos + w + 8} cy={yPos + h / 2} fill={surfaceColor} r="8" stroke={stroke} strokeWidth="3" />
        </>
      )}
      {gateLabel && (
        <Label x={kind === 'not' ? xPos + w * 0.42 : xPos + w * 0.52} y={yPos + h / 2 + 6} size={w < 60 ? 9 : 16}>
          {gateLabel}
        </Label>
      )}
    </g>
  );
}

function MuxSymbol({ x, y, width = 110, height = 180, active = true, label = 'MUX' }) {
  const xPos = coordinate(x);
  const yPos = coordinate(y);
  const w = coordinate(width);
  const h = coordinate(height);
  const stroke = active ? accentColor : 'rgb(var(--color-border))';

  return (
    <g opacity={active ? 1 : 0.48}>
      <path d={`M${xPos} ${yPos} H${xPos + w * 0.64} L${xPos + w} ${yPos + h / 2} L${xPos + w * 0.64} ${yPos + h} H${xPos} Z`} fill={fillColor} stroke={stroke} strokeWidth="3" />
      <Label x={xPos + w * 0.48} y={yPos + h / 2 + 7} size={w < 90 ? 14 : 24}>
        {label}
      </Label>
    </g>
  );
}

function HalfAdderDiagram({ arrowId, values }) {
  return (
    <g>
      <ValueStack x="86" y="118" label="INPUT A" value={values.a} />
      <ValueStack x="86" y="250" label="INPUT B" value={values.b} />
      <Wire d="M136 140 H210" />
      <Wire d="M136 272 H210" />
      <Junction x="210" y="140" />
      <Junction x="210" y="272" />
      <Wire d="M210 140 C242 140 250 120 292 120" />
      <Wire d="M210 272 C242 272 250 166 292 166" />
      <Wire d="M210 140 C242 140 250 244 292 244" />
      <Wire d="M210 272 C242 272 250 298 292 298" />
      <GateSymbol kind="xor" x="292" y="92" width="132" height="94" />
      <GateSymbol kind="and" x="292" y="224" width="132" height="94" />
      <Wire d="M424 139 H600" arrowId={arrowId} />
      <Wire d="M424 271 H600" arrowId={arrowId} />
      <ValueStack x="704" y="116" label="OUTPUT SUM" value={values.sum} />
      <ValueStack x="704" y="248" label="OUTPUT CARRY" value={values.carry} />
    </g>
  );
}

function FullAdderDiagram({ arrowId, values }) {
  return (
    <g>
      <ValueStack x="78" y="74" label="INPUT A" value={values.a} />
      <ValueStack x="78" y="146" label="INPUT B" value={values.b} />
      <ValueStack x="78" y="310" label="CARRY IN" value={values.cin} />
      <Wire d="M130 96 H198" />
      <Wire d="M130 168 H198" />
      <Junction x="170" y="96" />
      <Junction x="170" y="168" />
      <GateSymbol kind="xor" x="198" y="72" width="104" height="82" />
      <GateSymbol kind="and" x="198" y="210" width="104" height="72" />
      <Wire d="M170 96 C184 96 184 232 198 232" />
      <Wire d="M170 168 C184 168 184 260 198 260" />
      <Wire d="M302 113 H360" />
      <Junction x="332" y="113" />
      <GateSymbol kind="xor" x="360" y="72" width="104" height="82" />
      <GateSymbol kind="and" x="360" y="210" width="104" height="72" />
      <Wire d="M332 113 C348 113 348 232 360 232" />
      <Wire d="M130 332 H318 C342 332 342 138 360 138" />
      <Wire d="M130 332 H318 C342 332 342 260 360 260" />
      <Wire d="M464 113 H604" arrowId={arrowId} />
      <ValueStack x="706" y="90" label="OUTPUT SUM" value={values.sum} />
      <GateSymbol kind="or" x="535" y="216" width="112" height="88" />
      <Wire d="M302 246 C350 246 474 238 535 238" />
      <Wire d="M464 246 H535" />
      <Wire d="M647 260 H690" arrowId={arrowId} />
      <ValueStack x="706" y="286" label="CARRY OUT" value={values.cout} />
      <Label x="402" y="184" size="12" muted>
        SUM = A XOR B XOR Cin
      </Label>
    </g>
  );
}

function FourBitAdderDiagram({ arrowId, values }) {
  const slices = [
    { x: 170, bit: 0 },
    { x: 312, bit: 1 },
    { x: 454, bit: 2 },
    { x: 596, bit: 3 },
  ];

  return (
    <g>
      <ValueStack x="78" y="82" label="A[3:0]" value={values.a} />
      <ValueStack x="78" y="176" label="B[3:0]" value={values.b} />
      <ValueStack x="78" y="306" label="CARRY IN" value={values.cin} />
      <Wire d="M130 104 H170" />
      <Wire d="M130 198 H170" />
      <Wire d="M130 328 H170" />
      {slices.map((slice, index) => (
        <FullAdderSlice key={slice.bit} x={slice.x} y="102" bit={slice.bit} />
      ))}
      {slices.slice(0, -1).map((slice, index) => (
        <Wire key={slice.bit} d={`M${slice.x + 122} 235 H${slices[index + 1].x}`} arrowId={arrowId} width="3" />
      ))}
      <Wire d="M718 235 H762" arrowId={arrowId} />
      <ValueStack x="760" y="260" label="CARRY OUT" value={values.cout} />
      <SmallValue x="430" y="382" label="SUM[3:0]" value={values.result} width="120" />
    </g>
  );
}

function FullAdderSlice({ x, y, bit }) {
  const xPos = coordinate(x);
  const yPos = coordinate(y);

  return (
    <g>
      <Label x={xPos + 58} y={yPos - 14} size="12" muted>
        bit {bit}
      </Label>
      <GateSymbol kind="xor" x={xPos} y={yPos} width="40" height="30" />
      <GateSymbol kind="xor" x={xPos + 56} y={yPos} width="40" height="30" />
      <GateSymbol kind="and" x={xPos} y={yPos + 58} width="40" height="30" />
      <GateSymbol kind="and" x={xPos + 56} y={yPos + 58} width="40" height="30" />
      <GateSymbol kind="or" x={xPos + 88} y={yPos + 112} width="34" height="42" />
      <Wire d={`M${xPos - 32} ${yPos + 12} H${xPos}`} width="2.5" />
      <Wire d={`M${xPos - 32} ${yPos + 76} H${xPos}`} width="2.5" />
      <Wire d={`M${xPos + 40} ${yPos + 15} H${xPos + 56}`} width="2.5" />
      <Wire d={`M${xPos + 96} ${yPos + 15} V${yPos - 22}`} arrowId="" width="2.5" />
      <Wire d={`M${xPos + 40} ${yPos + 73} H${xPos + 88}`} width="2.5" />
      <Wire d={`M${xPos + 96} ${yPos + 73} C${xPos + 122} ${yPos + 73} ${xPos + 72} ${yPos + 126} ${xPos + 88} ${yPos + 126}`} width="2.5" />
      <Label x={xPos + 96} y={yPos - 30} size="10" muted>
        S{bit}
      </Label>
    </g>
  );
}

function SubtractorDiagram({ arrowId, values }) {
  const slices = [
    { x: 170, bit: 0 },
    { x: 312, bit: 1 },
    { x: 454, bit: 2 },
    { x: 596, bit: 3 },
  ];

  return (
    <g>
      <ValueStack x="78" y="82" label="A[3:0]" value={values.a} />
      <ValueStack x="78" y="176" label="B[3:0]" value={values.b} />
      <SmallValue x="78" y="326" label="BORROW IN" value="0" />
      <Wire d="M130 104 H170" />
      <Wire d="M130 198 H170" />
      <Wire d="M125 326 H170" />
      {slices.map((slice) => (
        <FullSubtractorSlice key={slice.bit} x={slice.x} y="96" bit={slice.bit} />
      ))}
      {slices.slice(0, -1).map((slice, index) => (
        <Wire key={slice.bit} d={`M${slice.x + 124} 205 H${slices[index + 1].x}`} arrowId={arrowId} width="3" />
      ))}
      <Wire d="M720 205 H762" arrowId={arrowId} />
      <ValueStack x="760" y="230" label="BORROW OUT" value={values.borrowOut} />
      <SmallValue x="430" y="382" label="DIFF[3:0]" value={values.result} width="120" />
    </g>
  );
}

function FullSubtractorSlice({ x, y, bit }) {
  const xPos = coordinate(x);
  const yPos = coordinate(y);

  return (
    <g>
      <Label x={xPos + 58} y={yPos - 8} size="12" muted>
        bit {bit}
      </Label>
      <GateSymbol kind="xor" x={xPos} y={yPos + 6} width="38" height="28" />
      <GateSymbol kind="xor" x={xPos + 54} y={yPos + 6} width="38" height="28" />
      <GateSymbol kind="not" x={xPos} y={yPos + 58} width="28" height="28" />
      <GateSymbol kind="and" x={xPos + 42} y={yPos + 54} width="38" height="28" />
      <GateSymbol kind="and" x={xPos + 42} y={yPos + 94} width="38" height="28" />
      <GateSymbol kind="or" x={xPos + 90} y={yPos + 84} width="34" height="50" />
      <Wire d={`M${xPos - 32} ${yPos + 18} H${xPos}`} width="2.5" />
      <Wire d={`M${xPos - 32} ${yPos + 72} H${xPos}`} width="2.5" />
      <Wire d={`M${xPos + 38} ${yPos + 20} H${xPos + 54}`} width="2.5" />
      <Wire d={`M${xPos + 92} ${yPos + 20} V${yPos - 22}`} arrowId="" width="2.5" />
      <Wire d={`M${xPos + 36} ${yPos + 72} H${xPos + 42}`} width="2.5" />
      <Wire d={`M${xPos + 80} ${yPos + 68} H${xPos + 90}`} width="2.5" />
      <Wire d={`M${xPos + 80} ${yPos + 108} H${xPos + 90}`} width="2.5" />
      <Label x={xPos + 92} y={yPos - 30} size="10" muted>
        D{bit}
      </Label>
    </g>
  );
}

function MultiplexerDiagram({ arrowId, values }) {
  const selectedIndex = Number(values.selectedIndex);
  const inputRows = [0, 1, 2, 3];

  return (
    <g>
      {inputRows.map((index) => {
        const y = 76 + index * 72;
        const active = selectedIndex === index;
        return (
          <g key={index}>
            <SmallValue x="88" y={y + 6} label={`INPUT I${index}`} value={values.inputs?.[index]} active={active} />
            <Wire d={`M136 ${y} H288`} active={active} width={active ? 5 : 3} />
          </g>
        );
      })}
      <SmallValue x="92" y="376" label="SELECTOR" value={values.selector} width="108" />
      <GateSymbol kind="not" x="188" y="342" width="34" height="28" />
      <GateSymbol kind="not" x="262" y="342" width="34" height="28" />
      <Label x="208" y="388" size="10" muted>
        S1'
      </Label>
      <Label x="282" y="388" size="10" muted>
        S0'
      </Label>
      {inputRows.map((index) => {
        const y = 52 + index * 72;
        const active = selectedIndex === index;
        const term = ["I0 S1' S0'", "I1 S1' S0", "I2 S1 S0'", 'I3 S1 S0'][index];
        return (
          <g key={`and-${index}`}>
            <GateSymbol kind="and" x="292" y={y} width="104" height="52" active={active} />
            <Label x="344" y={y + 68} size="10" muted>
              {term}
            </Label>
            <Wire d={`M396 ${y + 26} H500`} active={active} width={active ? 4 : 3} />
          </g>
        );
      })}
      <GateSymbol kind="or" x="500" y="100" width="116" height="188" />
      <Wire d="M616 194 H674" arrowId={arrowId} />
      <ValueStack x="728" y="172" label={`OUTPUT ${display(values.selectedInput)}`} value={values.output} />
    </g>
  );
}

function AluDiagram({ arrowId, values }) {
  const operation = display(values.operation);
  const isAndActive = operation === 'AND';
  const isOrActive = operation === 'OR';
  const isAddActive = operation === 'ADD';
  const isSubActive = operation === 'SUB';

  return (
    <g>
      <ValueStack x="80" y="86" label="REGISTER A" value={values.a} />
      <ValueStack x="80" y="218" label="REGISTER B" value={values.b} />
      <Wire d="M132 108 H212" />
      <Wire d="M132 240 H212" />
      <Junction x="178" y="108" />
      <Junction x="178" y="240" />
      <Wire d="M178 108 C204 108 204 78 232 78" active={isAndActive} />
      <Wire d="M178 240 C204 240 204 112 232 112" active={isAndActive} />
      <Wire d="M178 108 C204 108 204 148 232 148" active={isOrActive} />
      <Wire d="M178 240 C204 240 204 184 232 184" active={isOrActive} />
      <Wire d="M178 108 C204 108 204 232 232 232" active={isAddActive} />
      <Wire d="M178 240 H232" active={isAddActive} />
      <Wire d="M178 108 C204 108 204 320 232 320" active={isSubActive} />
      <Wire d="M178 240 C204 240 204 344 232 344" active={isSubActive} />
      <GateSymbol kind="and" x="232" y="56" width="96" height="70" active={isAndActive} />
      <GateSymbol kind="or" x="232" y="132" width="96" height="70" active={isOrActive} />
      <MiniAdderNetwork x="232" y="216" active={isAddActive} />
      <MiniSubtractorNetwork x="232" y="302" active={isSubActive} />
      <Wire d="M328 91 H500" active={isAndActive} />
      <Wire d="M328 167 H500" active={isOrActive} />
      <Wire d="M380 248 H500" active={isAddActive} />
      <Wire d="M380 334 H500" active={isSubActive} />
      <MuxSymbol x="500" y="92" width="130" height="250" />
      <Label x="560" y="368" size="12" muted>
        selector {display(values.selector)} / {operation}
      </Label>
      <Wire d="M630 217 H680" arrowId={arrowId} />
      <ValueStack x="740" y="194" label="OUTPUT X" value={values.result} />
    </g>
  );
}

function MiniAdderNetwork({ x, y, active = true }) {
  const xPos = coordinate(x);
  const yPos = coordinate(y);

  return (
    <g opacity={active ? 1 : 0.45}>
      <Label x={xPos + 74} y={yPos - 10} size="10" muted>
        ADD
      </Label>
      <GateSymbol kind="xor" x={xPos} y={yPos} width="36" height="26" active={active} />
      <GateSymbol kind="xor" x={xPos + 48} y={yPos} width="36" height="26" active={active} />
      <GateSymbol kind="and" x={xPos} y={yPos + 36} width="36" height="26" active={active} />
      <GateSymbol kind="or" x={xPos + 92} y={yPos + 34} width="44" height="34" active={active} />
      <Wire d={`M${xPos + 36} ${yPos + 13} H${xPos + 48}`} active={active} width="2.5" />
      <Wire d={`M${xPos + 84} ${yPos + 13} H${xPos + 148}`} active={active} width="2.5" />
    </g>
  );
}

function MiniSubtractorNetwork({ x, y, active = true }) {
  const xPos = coordinate(x);
  const yPos = coordinate(y);

  return (
    <g opacity={active ? 1 : 0.45}>
      <Label x={xPos + 74} y={yPos - 10} size="10" muted>
        SUB
      </Label>
      <GateSymbol kind="xor" x={xPos} y={yPos} width="36" height="26" active={active} />
      <GateSymbol kind="not" x={xPos} y={yPos + 38} width="28" height="24" active={active} />
      <GateSymbol kind="and" x={xPos + 48} y={yPos + 34} width="36" height="26" active={active} />
      <GateSymbol kind="or" x={xPos + 92} y={yPos + 30} width="44" height="38" active={active} />
      <Wire d={`M${xPos + 36} ${yPos + 13} H${xPos + 148}`} active={active} width="2.5" />
      <Wire d={`M${xPos + 84} ${yPos + 47} H${xPos + 92}`} active={active} width="2.5" />
    </g>
  );
}

function GenericDiagram({ arrowId, values }) {
  return (
    <g>
      <ValueStack x="94" y="166" label="INPUT" value={values.input} />
      <GateSymbol kind="and" x="310" y="140" width="110" height="80" />
      <Wire d="M154 188 H310" />
      <Wire d="M420 180 H578" arrowId={arrowId} />
      <ValueStack x="654" y="166" label="OUTPUT" value={values.output} />
    </g>
  );
}
