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
const bitAt = (value, bit) => {
  const binary = display(value);
  if (!/^[01]{4}$/.test(binary)) return '-';
  return binary[3 - bit];
};

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
        <svg className="min-h-[360px] w-full" viewBox="0 0 960 470" role="img" aria-label={title}>
          <defs>
            <marker id={arrowId} markerHeight="10" markerWidth="10" orient="auto" refX="8" refY="5">
              <path d="M0 0 L10 5 L0 10 Z" fill={lineColor} />
            </marker>
          </defs>
          <rect width="960" height="470" rx="18" fill={surfaceColor} />
          <g stroke={gridColor} strokeWidth="1">
            <path d="M64 74 H896" />
            <path d="M64 382 H896" />
            <path d="M156 42 V426" />
            <path d="M808 42 V426" />
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

function SmallValue({ x, y, label, value, anchor = 'middle', active = true, width = 96 }) {
  const xPos = coordinate(x);
  const yPos = coordinate(y);
  const widthValue = coordinate(width);
  const rectX = anchor === 'end' ? xPos - widthValue : anchor === 'middle' ? xPos - widthValue / 2 : xPos;

  return (
    <g opacity={active ? 1 : 0.5}>
      <rect
        fill="rgb(var(--color-surface))"
        height="42"
        rx="8"
        stroke={active ? accentColor : 'rgb(var(--color-border))'}
        strokeWidth="1.5"
        width={widthValue}
        x={rectX}
        y={yPos - 26}
      />
      <Label x={xPos} y={yPos - 8} anchor={anchor} size="10" muted>
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
        <Label x={kind === 'not' ? xPos + w * 0.44 : xPos + w * 0.52} y={yPos + h / 2 + 5} size={w < 62 ? 9 : 16}>
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
      <ValueStack x="92" y="124" label="INPUT A" value={values.a} />
      <ValueStack x="92" y="262" label="INPUT B" value={values.b} />
      <Wire d="M142 146 H230" />
      <Wire d="M142 284 H230" />
      <Junction x="230" y="146" />
      <Junction x="230" y="284" />
      <Wire d="M230 146 C270 146 284 124 330 124" />
      <Wire d="M230 284 C270 284 284 176 330 176" />
      <Wire d="M230 146 C270 146 284 256 330 256" />
      <Wire d="M230 284 C270 284 284 308 330 308" />
      <GateSymbol kind="xor" x="330" y="96" width="146" height="106" />
      <GateSymbol kind="and" x="330" y="238" width="146" height="88" />
      <Wire d="M476 149 H686" arrowId={arrowId} />
      <Wire d="M476 282 H686" arrowId={arrowId} />
      <ValueStack x="810" y="126" label="OUTPUT SUM" value={values.sum} />
      <ValueStack x="810" y="260" label="OUTPUT CARRY" value={values.carry} />
    </g>
  );
}

function FullAdderDiagram({ arrowId, values }) {
  return (
    <g>
      <ValueStack x="92" y="78" label="INPUT A" value={values.a} />
      <ValueStack x="92" y="158" label="INPUT B" value={values.b} />
      <ValueStack x="92" y="344" label="CARRY IN" value={values.cin} />
      <Wire d="M142 100 H236" />
      <Wire d="M142 180 H206 V152 H236" />
      <Junction x="190" y="100" />
      <Junction x="206" y="180" />
      <GateSymbol kind="xor" x="236" y="74" width="128" height="96" />
      <Wire d="M190 100 V248 H236" />
      <Wire d="M206 180 V294 H236" />
      <GateSymbol kind="and" x="236" y="226" width="128" height="88" />
      <Wire d="M364 122 H454" />
      <Junction x="404" y="122" />
      <GateSymbol kind="xor" x="454" y="74" width="128" height="96" />
      <Wire d="M142 366 H414 V152 H454" />
      <Junction x="414" y="366" />
      <Wire d="M404 122 V330 H454" />
      <Wire d="M414 366 H454" />
      <GateSymbol kind="and" x="454" y="306" width="128" height="88" />
      <Wire d="M582 122 H714" arrowId={arrowId} />
      <ValueStack x="820" y="100" label="OUTPUT SUM" value={values.sum} />
      <Wire d="M364 270 H650 V292 H690" />
      <Wire d="M582 350 H690" />
      <GateSymbol kind="or" x="690" y="268" width="122" height="100" />
      <Wire d="M812 318 H858" arrowId={arrowId} />
      <ValueStack x="858" y="342" label="CARRY OUT" value={values.cout} />
      <Label x="408" y="204" size="12" muted>
        SUM = A XOR B XOR Cin
      </Label>
    </g>
  );
}

function FourBitAdderDiagram({ arrowId, values }) {
  const slices = [
    { x: 190, bit: 0 },
    { x: 360, bit: 1 },
    { x: 530, bit: 2 },
    { x: 700, bit: 3 },
  ];

  return (
    <g>
      <ValueStack x="92" y="80" label="A[3:0]" value={values.a} />
      <ValueStack x="92" y="174" label="B[3:0]" value={values.b} />
      <ValueStack x="92" y="326" label="CARRY IN" value={values.cin} />
      <Wire d="M142 102 H850" width="3" />
      <Wire d="M142 196 H850" width="3" />
      <Wire d="M142 348 H850" width="3" />
      {slices.map((slice) => (
        <AdderBitSlice key={slice.bit} x={slice.x} y="96" bit={slice.bit} sum={bitAt(values.result, slice.bit)} />
      ))}
      {slices.slice(0, -1).map((slice, index) => (
        <Wire key={slice.bit} d={`M${slice.x + 128} 292 H${slices[index + 1].x - 18}`} arrowId={arrowId} width="3" />
      ))}
      <Wire d="M828 292 H872" arrowId={arrowId} />
      <ValueStack x="870" y="318" label="CARRY OUT" value={values.cout} />
      <SmallValue x="510" y="424" label="SUM[3:0]" value={values.result} width="132" />
    </g>
  );
}

function AdderBitSlice({ x, y, bit, sum }) {
  const xPos = coordinate(x);
  const yPos = coordinate(y);

  return (
    <g>
      <path d={`M${xPos - 24} ${yPos - 18} V${yPos + 220}`} stroke={gridColor} strokeWidth="1" />
      <Label x={xPos + 54} y={yPos - 8} size="12" muted>
        bit {bit}
      </Label>
      <SmallValue x={xPos + 110} y={yPos - 24} label={`S${bit}`} value={sum} width="58" />
      <GateSymbol kind="xor" x={xPos} y={yPos + 22} width="46" height="34" />
      <GateSymbol kind="xor" x={xPos + 64} y={yPos + 22} width="46" height="34" />
      <GateSymbol kind="and" x={xPos} y={yPos + 106} width="46" height="34" />
      <GateSymbol kind="and" x={xPos + 64} y={yPos + 106} width="46" height="34" />
      <GateSymbol kind="or" x={xPos + 92} y={yPos + 170} width="50" height="56" />
      <Wire d={`M${xPos - 22} 102 H${xPos}`} width="2.5" />
      <Wire d={`M${xPos - 22} 196 H${xPos}`} width="2.5" />
      <Wire d={`M${xPos + 46} ${yPos + 39} H${xPos + 64}`} width="2.5" />
      <Wire d={`M${xPos + 110} ${yPos + 39} V${yPos - 4}`} arrowId="" width="2.5" />
      <Wire d={`M${xPos + 20} 348 V${yPos + 39} H${xPos + 64}`} width="2.5" />
      <Wire d={`M${xPos + 20} 348 V${yPos + 124} H${xPos + 64}`} width="2.5" />
      <Wire d={`M${xPos + 46} ${yPos + 123} H${xPos + 92}`} width="2.5" />
      <Wire d={`M${xPos + 110} ${yPos + 123} V${yPos + 190} H${xPos + 92}`} width="2.5" />
      <Wire d={`M${xPos + 142} ${yPos + 198} H${xPos + 128} V292`} width="2.5" />
    </g>
  );
}

function SubtractorDiagram({ arrowId, values }) {
  const slices = [
    { x: 190, bit: 0 },
    { x: 360, bit: 1 },
    { x: 530, bit: 2 },
    { x: 700, bit: 3 },
  ];

  return (
    <g>
      <ValueStack x="92" y="80" label="A[3:0]" value={values.a} />
      <ValueStack x="92" y="174" label="B[3:0]" value={values.b} />
      <SmallValue x="92" y="348" label="BORROW IN" value="0" width="112" />
      <Wire d="M142 102 H850" width="3" />
      <Wire d="M142 196 H850" width="3" />
      <Wire d="M148 348 H850" width="3" />
      {slices.map((slice) => (
        <SubtractorBitSlice key={slice.bit} x={slice.x} y="96" bit={slice.bit} diff={bitAt(values.result, slice.bit)} />
      ))}
      {slices.slice(0, -1).map((slice, index) => (
        <Wire key={slice.bit} d={`M${slice.x + 130} 292 H${slices[index + 1].x - 18}`} arrowId={arrowId} width="3" />
      ))}
      <Wire d="M830 292 H872" arrowId={arrowId} />
      <ValueStack x="872" y="318" label="BORROW OUT" value={values.borrowOut} />
      <SmallValue x="510" y="424" label="DIFF[3:0]" value={values.result} width="132" />
    </g>
  );
}

function SubtractorBitSlice({ x, y, bit, diff }) {
  const xPos = coordinate(x);
  const yPos = coordinate(y);

  return (
    <g>
      <path d={`M${xPos - 24} ${yPos - 18} V${yPos + 220}`} stroke={gridColor} strokeWidth="1" />
      <Label x={xPos + 54} y={yPos - 8} size="12" muted>
        bit {bit}
      </Label>
      <SmallValue x={xPos + 110} y={yPos - 24} label={`D${bit}`} value={diff} width="58" />
      <GateSymbol kind="xor" x={xPos} y={yPos + 22} width="46" height="34" />
      <GateSymbol kind="xor" x={xPos + 64} y={yPos + 22} width="46" height="34" />
      <GateSymbol kind="not" x={xPos} y={yPos + 116} width="30" height="30" />
      <GateSymbol kind="and" x={xPos + 52} y={yPos + 108} width="44" height="34" />
      <GateSymbol kind="and" x={xPos + 52} y={yPos + 158} width="44" height="34" />
      <GateSymbol kind="or" x={xPos + 92} y={yPos + 174} width="50" height="56" />
      <Wire d={`M${xPos - 22} 102 H${xPos}`} width="2.5" />
      <Wire d={`M${xPos - 22} 196 H${xPos}`} width="2.5" />
      <Wire d={`M${xPos + 46} ${yPos + 39} H${xPos + 64}`} width="2.5" />
      <Wire d={`M${xPos + 110} ${yPos + 39} V${yPos - 4}`} arrowId="" width="2.5" />
      <Wire d={`M${xPos + 38} ${yPos + 131} H${xPos + 52}`} width="2.5" />
      <Wire d={`M${xPos + 20} 348 V${yPos + 39} H${xPos + 64}`} width="2.5" />
      <Wire d={`M${xPos + 20} 348 V${yPos + 176} H${xPos + 52}`} width="2.5" />
      <Wire d={`M${xPos + 96} ${yPos + 126} H${xPos + 110} V${yPos + 192} H${xPos + 92}`} width="2.5" />
      <Wire d={`M${xPos + 96} ${yPos + 176} H${xPos + 92}`} width="2.5" />
      <Wire d={`M${xPos + 142} ${yPos + 202} H${xPos + 130} V292`} width="2.5" />
    </g>
  );
}

function MultiplexerDiagram({ arrowId, values }) {
  const selectedIndex = Number(values.selectedIndex);
  const inputRows = [0, 1, 2, 3];

  return (
    <g>
      {inputRows.map((index) => {
        const y = 82 + index * 74;
        const active = selectedIndex === index;
        return (
          <g key={index}>
            <SmallValue x="98" y={y + 6} label={`INPUT I${index}`} value={values.inputs?.[index]} active={active} />
            <Wire d={`M146 ${y} H336`} active={active} width={active ? 5 : 3} />
          </g>
        );
      })}
      <SmallValue x="112" y="400" label="SELECTOR" value={values.selector} width="112" />
      <GateSymbol kind="not" x="226" y="366" width="36" height="30" />
      <GateSymbol kind="not" x="312" y="366" width="36" height="30" />
      <Label x="248" y="416" size="10" muted>
        S1'
      </Label>
      <Label x="334" y="416" size="10" muted>
        S0'
      </Label>
      {inputRows.map((index) => {
        const y = 56 + index * 74;
        const active = selectedIndex === index;
        const term = ["I0 S1' S0'", "I1 S1' S0", "I2 S1 S0'", 'I3 S1 S0'][index];
        return (
          <g key={`and-${index}`}>
            <GateSymbol kind="and" x="336" y={y} width="118" height="54" active={active} />
            <Label x="395" y={y + 70} size="10" muted>
              {term}
            </Label>
            <Wire d={`M454 ${y + 27} H610`} active={active} width={active ? 4 : 3} />
          </g>
        );
      })}
      <GateSymbol kind="or" x="610" y="108" width="132" height="196" />
      <Wire d="M742 206 H818" arrowId={arrowId} />
      <ValueStack x="870" y="184" label={`OUTPUT ${display(values.selectedInput)}`} value={values.output} />
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
      <ValueStack x="92" y="88" label="REGISTER A" value={values.a} />
      <ValueStack x="92" y="230" label="REGISTER B" value={values.b} />
      <Wire d="M142 110 H240" />
      <Wire d="M142 252 H240" />
      <Junction x="200" y="110" />
      <Junction x="200" y="252" />
      <Wire d="M200 110 C224 110 224 80 260 80" active={isAndActive} />
      <Wire d="M200 252 C224 252 224 114 260 114" active={isAndActive} />
      <Wire d="M200 110 C224 110 224 156 260 156" active={isOrActive} />
      <Wire d="M200 252 C224 252 224 190 260 190" active={isOrActive} />
      <Wire d="M200 110 C224 110 224 246 260 246" active={isAddActive} />
      <Wire d="M200 252 H260" active={isAddActive} />
      <Wire d="M200 110 C224 110 224 340 260 340" active={isSubActive} />
      <Wire d="M200 252 C224 252 224 364 260 364" active={isSubActive} />
      <GateSymbol kind="and" x="260" y="58" width="104" height="74" active={isAndActive} />
      <GateSymbol kind="or" x="260" y="140" width="104" height="74" active={isOrActive} />
      <MiniAdderNetwork x="260" y="230" active={isAddActive} />
      <MiniSubtractorNetwork x="260" y="324" active={isSubActive} />
      <Wire d="M364 95 H574" active={isAndActive} />
      <Wire d="M364 177 H574" active={isOrActive} />
      <Wire d="M424 264 H574" active={isAddActive} />
      <Wire d="M424 358 H574" active={isSubActive} />
      <MuxSymbol x="574" y="94" width="142" height="274" />
      <Label x="642" y="398" size="12" muted>
        selector {display(values.selector)} / {operation}
      </Label>
      <Wire d="M716 231 H804" arrowId={arrowId} />
      <ValueStack x="872" y="208" label="OUTPUT X" value={values.result} />
    </g>
  );
}

function MiniAdderNetwork({ x, y, active = true }) {
  const xPos = coordinate(x);
  const yPos = coordinate(y);

  return (
    <g opacity={active ? 1 : 0.45}>
      <Label x={xPos + 84} y={yPos - 10} size="10" muted>
        ADD
      </Label>
      <GateSymbol kind="xor" x={xPos} y={yPos} width="42" height="30" active={active} />
      <GateSymbol kind="xor" x={xPos + 58} y={yPos} width="42" height="30" active={active} />
      <GateSymbol kind="and" x={xPos} y={yPos + 44} width="42" height="30" active={active} />
      <GateSymbol kind="or" x={xPos + 104} y={yPos + 42} width="50" height="40" active={active} />
      <Wire d={`M${xPos + 42} ${yPos + 15} H${xPos + 58}`} active={active} width="2.5" />
      <Wire d={`M${xPos + 100} ${yPos + 15} H${xPos + 164}`} active={active} width="2.5" />
    </g>
  );
}

function MiniSubtractorNetwork({ x, y, active = true }) {
  const xPos = coordinate(x);
  const yPos = coordinate(y);

  return (
    <g opacity={active ? 1 : 0.45}>
      <Label x={xPos + 84} y={yPos - 10} size="10" muted>
        SUB
      </Label>
      <GateSymbol kind="xor" x={xPos} y={yPos} width="42" height="30" active={active} />
      <GateSymbol kind="not" x={xPos} y={yPos + 46} width="32" height="26" active={active} />
      <GateSymbol kind="and" x={xPos + 58} y={yPos + 42} width="42" height="30" active={active} />
      <GateSymbol kind="or" x={xPos + 104} y={yPos + 38} width="50" height="44" active={active} />
      <Wire d={`M${xPos + 42} ${yPos + 15} H${xPos + 164}`} active={active} width="2.5" />
      <Wire d={`M${xPos + 100} ${yPos + 57} H${xPos + 104}`} active={active} width="2.5" />
    </g>
  );
}

function GenericDiagram({ arrowId, values }) {
  return (
    <g>
      <ValueStack x="94" y="166" label="INPUT" value={values.input} />
      <GateSymbol kind="and" x="330" y="140" width="130" height="90" />
      <Wire d="M154 188 H330" />
      <Wire d="M460 185 H650" arrowId={arrowId} />
      <ValueStack x="754" y="166" label="OUTPUT" value={values.output} />
    </g>
  );
}
