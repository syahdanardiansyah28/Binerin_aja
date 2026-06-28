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
        <svg className="min-h-[280px] w-full" viewBox="0 0 760 380" role="img" aria-label={title}>
          <defs>
            <marker id={arrowId} markerHeight="10" markerWidth="10" orient="auto" refX="8" refY="5">
              <path d="M0 0 L10 5 L0 10 Z" fill={lineColor} />
            </marker>
          </defs>
          <rect width="760" height="380" rx="16" fill={surfaceColor} />
          <g stroke={gridColor} strokeWidth="1">
            <path d="M48 68 H712" />
            <path d="M48 312 H712" />
            <path d="M120 38 V342" />
            <path d="M638 38 V342" />
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
      opacity={active ? 1 : 0.5}
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

function SmallValue({ x, y, label, value, anchor = 'middle', active = true }) {
  const xPos = coordinate(x);
  const yPos = coordinate(y);
  const rectX = anchor === 'end' ? xPos - 94 : anchor === 'middle' ? xPos - 47 : xPos;

  return (
    <g opacity={active ? 1 : 0.5}>
      <rect
        fill="rgb(var(--color-surface))"
        height="40"
        rx="8"
        stroke={active ? accentColor : 'rgb(var(--color-border))'}
        strokeWidth="1.5"
        width="94"
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

function Block({ x, y, width = 112, height = 72, title, subtitle = '', active = true }) {
  const xPos = coordinate(x);
  const yPos = coordinate(y);
  const widthValue = coordinate(width);
  const heightValue = coordinate(height);

  return (
    <g opacity={active ? 1 : 0.5}>
      <rect
        fill={active ? fillColor : 'rgb(var(--color-surface))'}
        height={heightValue}
        rx="11"
        stroke={active ? accentColor : 'rgb(var(--color-border))'}
        strokeWidth={active ? '3' : '1.5'}
        width={widthValue}
        x={xPos}
        y={yPos}
      />
      <Label x={xPos + widthValue / 2} y={yPos + heightValue / 2 + (subtitle ? -1 : 7)} size="18">
        {title}
      </Label>
      {subtitle && (
        <Label x={xPos + widthValue / 2} y={yPos + heightValue / 2 + 24} size="12" muted>
          {subtitle}
        </Label>
      )}
    </g>
  );
}

function HalfAdderDiagram({ arrowId, values }) {
  return (
    <g>
      <ValueStack x="78" y="108" label="INPUT A" value={values.a} />
      <ValueStack x="78" y="226" label="INPUT B" value={values.b} />
      <Wire d="M128 130 H190" />
      <Wire d="M128 248 H190" />
      <Junction x="190" y="130" />
      <Junction x="190" y="248" />
      <Wire d="M190 130 C224 130 224 106 262 106" />
      <Wire d="M190 248 C224 248 224 150 262 150" />
      <Wire d="M190 130 C224 130 224 232 262 232" />
      <Wire d="M190 248 C224 248 224 276 262 276" />
      <Block x="262" y="78" title="XOR" subtitle="SUM" />
      <Block x="262" y="218" title="AND" subtitle="CARRY" />
      <Wire d="M374 114 H572" arrowId={arrowId} />
      <Wire d="M374 254 H572" arrowId={arrowId} />
      <ValueStack x="660" y="92" label="OUTPUT SUM" value={values.sum} />
      <ValueStack x="660" y="232" label="OUTPUT CARRY" value={values.carry} />
    </g>
  );
}

function FullAdderDiagram({ arrowId, values }) {
  return (
    <g>
      <ValueStack x="76" y="74" label="INPUT A" value={values.a} />
      <ValueStack x="76" y="146" label="INPUT B" value={values.b} />
      <ValueStack x="76" y="260" label="CARRY IN" value={values.cin} />
      <Wire d="M126 96 H188" />
      <Wire d="M126 168 H188" />
      <Block x="188" y="98" title="HA 1" subtitle="A + B" />
      <Wire d="M300 134 H372" arrowId={arrowId} />
      <Block x="372" y="98" title="HA 2" subtitle="+ Cin" />
      <Wire d="M126 282 H342 C356 282 356 170 372 170" />
      <Wire d="M484 134 H574" arrowId={arrowId} />
      <ValueStack x="664" y="112" label="OUTPUT SUM" value={values.sum} />
      <Wire d="M300 168 C328 168 328 262 384 262" />
      <Wire d="M484 168 C512 168 512 262 536 262" />
      <Block x="536" y="226" title="OR" subtitle="Cout" />
      <Wire d="M648 262 H686" arrowId={arrowId} />
      <ValueStack x="686" y="286" label="CARRY OUT" value={values.cout} />
    </g>
  );
}

function FourBitAdderDiagram({ arrowId, values }) {
  const blocks = [
    { x: 176, bit: 0 },
    { x: 302, bit: 1 },
    { x: 428, bit: 2 },
    { x: 554, bit: 3 },
  ];

  return (
    <g>
      <ValueStack x="78" y="86" label="A[3:0]" value={values.a} />
      <ValueStack x="78" y="176" label="B[3:0]" value={values.b} />
      <ValueStack x="78" y="276" label="CARRY IN" value={values.cin} />
      <Wire d="M130 108 H176" />
      <Wire d="M130 198 H176" />
      <Wire d="M130 298 H176" />
      {blocks.map((block, index) => (
        <g key={block.bit}>
          <Block x={block.x} y="116" width="88" height="98" title={`FA${block.bit}`} subtitle={`bit ${block.bit}`} />
          <Wire d={`M${block.x + 44} 116 V86`} arrowId={arrowId} />
          <Label x={block.x + 44} y="76" size="12" muted>
            S{block.bit}
          </Label>
          {index < blocks.length - 1 && <Wire d={`M${block.x + 88} 166 H${blocks[index + 1].x}`} arrowId={arrowId} />}
          {index > 0 && <Wire d={`M${block.x - 34} 108 H${block.x}`} />}
          {index > 0 && <Wire d={`M${block.x - 34} 198 H${block.x}`} />}
        </g>
      ))}
      <Wire d="M642 166 H688" arrowId={arrowId} />
      <ValueStack x="692" y="190" label="CARRY OUT" value={values.cout} />
      <SmallValue x="394" y="320" label="SUM[3:0]" value={values.result} />
    </g>
  );
}

function SubtractorDiagram({ arrowId, values }) {
  const blocks = [
    { x: 176, bit: 0 },
    { x: 302, bit: 1 },
    { x: 428, bit: 2 },
    { x: 554, bit: 3 },
  ];

  return (
    <g>
      <ValueStack x="78" y="86" label="A[3:0]" value={values.a} />
      <ValueStack x="78" y="176" label="B[3:0]" value={values.b} />
      <Wire d="M130 108 H176" />
      <Wire d="M130 198 H176" />
      {blocks.map((block, index) => (
        <g key={block.bit}>
          <Block x={block.x} y="116" width="88" height="98" title={`FS${block.bit}`} subtitle={`bit ${block.bit}`} />
          <Wire d={`M${block.x + 44} 116 V86`} arrowId={arrowId} />
          <Label x={block.x + 44} y="76" size="12" muted>
            D{block.bit}
          </Label>
          {index < blocks.length - 1 && <Wire d={`M${block.x + 88} 166 H${blocks[index + 1].x}`} arrowId={arrowId} />}
          {index > 0 && <Wire d={`M${block.x - 34} 108 H${block.x}`} />}
          {index > 0 && <Wire d={`M${block.x - 34} 198 H${block.x}`} />}
        </g>
      ))}
      <SmallValue x="194" y="288" label="BORROW IN" value="0" />
      <Wire d="M194 263 V214" />
      <Wire d="M642 166 H688" arrowId={arrowId} />
      <ValueStack x="692" y="190" label="BORROW OUT" value={values.borrowOut} />
      <SmallValue x="394" y="320" label="DIFF[3:0]" value={values.result} />
    </g>
  );
}

function MultiplexerDiagram({ arrowId, values }) {
  const selectedIndex = Number(values.selectedIndex);

  return (
    <g>
      {[0, 1, 2, 3].map((index) => {
        const y = 82 + index * 62;
        const active = selectedIndex === index;
        return (
          <g key={index}>
            <SmallValue x="86" y={y + 4} label={`INPUT I${index}`} value={values.inputs?.[index]} active={active} />
            <Wire d={`M136 ${y} H292`} active={active} width={active ? 5 : 3} />
          </g>
        );
      })}
      <path d="M292 54 H486 L536 190 L486 326 H292 Z" fill={fillColor} stroke={accentColor} strokeWidth="3" />
      <Label x="410" y="176" size="35">
        MUX
      </Label>
      <Label x="410" y="210" size="13" muted>
        4 input ke 1 output
      </Label>
      <Wire d="M410 348 V326" />
      <ValueStack x="410" y="342" label="SELECTOR" value={values.selector} />
      <Wire d="M536 190 H626" arrowId={arrowId} />
      <ValueStack x="680" y="168" label={`OUTPUT ${display(values.selectedInput)}`} value={values.output} />
    </g>
  );
}

function AluDiagram({ arrowId, values }) {
  const operation = display(values.operation);
  const isLogicActive = operation === 'AND' || operation === 'OR';
  const isAddActive = operation === 'ADD';
  const isSubActive = operation === 'SUB';

  return (
    <g>
      <ValueStack x="78" y="92" label="REGISTER A" value={values.a} />
      <ValueStack x="78" y="218" label="REGISTER B" value={values.b} />
      <Wire d="M132 114 H178" />
      <Wire d="M132 240 H178" />
      <Junction x="178" y="114" />
      <Junction x="178" y="240" />
      <Wire d="M178 114 C204 114 204 74 232 74" active={isLogicActive} />
      <Wire d="M178 240 C204 240 204 110 232 110" active={isLogicActive} />
      <Wire d="M178 114 C204 114 204 162 232 162" active={isAddActive} />
      <Wire d="M178 240 C204 240 204 198 232 198" active={isAddActive} />
      <Wire d="M178 114 C204 114 204 254 232 254" active={isSubActive} />
      <Wire d="M178 240 C204 240 204 290 232 290" active={isSubActive} />
      <Block x="232" y="48" title="LOGIC" subtitle="AND / OR" active={isLogicActive} />
      <Block x="232" y="136" title="ADDER" subtitle="ADD" active={isAddActive} />
      <Block x="232" y="232" title="SUB" subtitle="A - B" active={isSubActive} />
      <Wire d="M344 84 H452" active={isLogicActive} />
      <Wire d="M344 172 H452" active={isAddActive} />
      <Wire d="M344 268 H452" active={isSubActive} />
      <path d="M452 54 H566 L608 190 L566 326 H452 Z" fill={fillColor} stroke={accentColor} strokeWidth="3" />
      <Label x="528" y="178" size="31">
        MUX
      </Label>
      <Label x="528" y="211" size="13" muted>
        opcode {operation}
      </Label>
      <Wire d="M608 190 H650" arrowId={arrowId} />
      <ValueStack x="690" y="168" label="OUTPUT X" value={values.result} />
      <SmallValue x="528" y="348" label="SELECTOR" value={values.selector} />
    </g>
  );
}

function GenericDiagram({ arrowId, values }) {
  return (
    <g>
      <ValueStack x="94" y="166" label="INPUT" value={values.input} />
      <Block x="294" y="142" title="PROSES" />
      <Wire d="M154 188 H294" />
      <Wire d="M406 178 H578" arrowId={arrowId} />
      <ValueStack x="654" y="166" label="OUTPUT" value={values.output} />
    </g>
  );
}
