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

function Wire({ d, arrowId, muted = false }) {
  return (
    <path
      d={d}
      fill="none"
      markerEnd={arrowId ? `url(#${arrowId})` : undefined}
      stroke={muted ? mutedColor : lineColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="4"
    />
  );
}

function Junction({ x, y }) {
  return <circle cx={x} cy={y} fill={lineColor} r="5" />;
}

function Label({ x, y, children, anchor = 'middle', size = 18, muted = false, weight = 600 }) {
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

function Block({ x, y, width = 112, height = 68, title, subtitle = '' }) {
  return (
    <g>
      <rect fill={fillColor} height={height} rx="10" stroke={accentColor} strokeWidth="3" width={width} x={x} y={y} />
      <Label x={x + width / 2} y={y + height / 2 + (subtitle ? -1 : 7)} size={18}>{title}</Label>
      {subtitle && <Label x={x + width / 2} y={y + height / 2 + 24} size={12} muted>{subtitle}</Label>}
    </g>
  );
}

function Output({ x, y, label }) {
  return (
    <g>
      <Wire d={`M${x} ${y} H${x + 54}`} arrowId="" />
      <Label x={x + 66} y={y + 6} anchor="start" size={16}>{label}</Label>
    </g>
  );
}

function LogicGatesDiagram({ arrowId }) {
  return (
    <g>
      <Label x="54" y="112" anchor="start" size="16">A</Label>
      <Label x="54" y="190" anchor="start" size="16">B</Label>
      <Wire d="M82 108 H132" />
      <Wire d="M82 186 H132" />
      <Junction x="132" y="108" />
      <Junction x="132" y="186" />
      <Wire d="M132 108 C150 108 150 92 168 92" />
      <Wire d="M132 186 C150 186 150 136 168 136" />
      <Wire d="M132 108 C150 108 150 172 168 172" />
      <Wire d="M132 186 C150 186 150 216 168 216" />
      <Block x="168" y="64" title="AND" />
      <Block x="168" y="164" title="OR" />
      <Wire d="M280 98 H342" arrowId={arrowId} />
      <Wire d="M280 198 H342" arrowId={arrowId} />
      <Block x="342" y="64" title="XOR" />
      <Block x="342" y="164" title="NAND" />
      <Wire d="M132 108 C146 108 146 278 168 278" />
      <Block x="168" y="244" title="NOT" subtitle="1 input" />
      <Output x="454" y="98" label="XOR OUT" />
      <Output x="454" y="198" label="NAND OUT" />
    </g>
  );
}

function HalfAdderDiagram({ arrowId }) {
  return (
    <g>
      <Label x="54" y="104" anchor="start" size="16">A</Label>
      <Label x="54" y="204" anchor="start" size="16">B</Label>
      <Wire d="M84 100 H148" />
      <Wire d="M84 200 H148" />
      <Junction x="148" y="100" />
      <Junction x="148" y="200" />
      <Wire d="M148 100 C176 100 176 92 206 92" />
      <Wire d="M148 200 C176 200 176 136 206 136" />
      <Wire d="M148 100 C176 100 176 224 206 224" />
      <Wire d="M148 200 C176 200 176 268 206 268" />
      <Block x="206" y="62" title="XOR" subtitle="SUM" />
      <Block x="206" y="218" title="AND" subtitle="CARRY" />
      <Wire d="M318 96 H488" arrowId={arrowId} />
      <Wire d="M318 252 H488" arrowId={arrowId} />
      <Label x="514" y="102" anchor="start">SUM</Label>
      <Label x="514" y="258" anchor="start">CARRY</Label>
    </g>
  );
}

function FullAdderDiagram({ arrowId }) {
  return (
    <g>
      <Label x="50" y="96" anchor="start" size="16">A</Label>
      <Label x="50" y="152" anchor="start" size="16">B</Label>
      <Label x="50" y="234" anchor="start" size="16">Cin</Label>
      <Wire d="M88 92 H138" />
      <Wire d="M88 148 H138" />
      <Block x="138" y="76" title="HA 1" subtitle="A + B" />
      <Wire d="M250 110 H314" arrowId={arrowId} />
      <Block x="314" y="76" title="HA 2" subtitle="+ Cin" />
      <Wire d="M88 230 H314" />
      <Wire d="M426 110 H536" arrowId={arrowId} />
      <Label x="560" y="116" anchor="start">SUM</Label>
      <Wire d="M250 144 C276 144 276 246 342 246" />
      <Wire d="M426 144 C456 144 456 246 500 246" />
      <Block x="500" y="214" title="OR" subtitle="Carry" />
      <Wire d="M612 248 H660" arrowId={arrowId} />
      <Label x="668" y="254" anchor="start">Cout</Label>
    </g>
  );
}

function FourBitAdderDiagram({ arrowId }) {
  const blocks = [108, 246, 384, 522];

  return (
    <g>
      <Label x="58" y="104" anchor="start" size="16">A[3:0]</Label>
      <Label x="58" y="168" anchor="start" size="16">B[3:0]</Label>
      <Label x="58" y="260" anchor="start" size="16">Cin</Label>
      {blocks.map((x, index) => (
        <g key={x}>
          <Block x={x} y="92" width="96" title={`FA${index}`} subtitle={`bit ${index}`} />
          <Wire d={`M${x - 36} 108 H${x}`} />
          <Wire d={`M${x - 36} 156 H${x}`} />
          <Wire d={`M${x + 48} 160 V226`} />
          <Label x={x + 48} y="76" size="13">S{index}</Label>
          <Wire d={`M${x + 48} 92 V78`} arrowId={arrowId} />
        </g>
      ))}
      <Wire d="M74 256 H108" />
      <Wire d="M204 126 H246" arrowId={arrowId} />
      <Wire d="M342 126 H384" arrowId={arrowId} />
      <Wire d="M480 126 H522" arrowId={arrowId} />
      <Wire d="M618 126 H668" arrowId={arrowId} />
      <Label x="674" y="132" anchor="start" size="16">Cout</Label>
      <Label x="360" y="296" size="16" muted>Carry merambat dari LSB ke MSB</Label>
    </g>
  );
}

function SubtractorDiagram({ arrowId }) {
  return (
    <g>
      <Label x="54" y="104" anchor="start" size="16">A</Label>
      <Label x="54" y="206" anchor="start" size="16">B</Label>
      <Wire d="M86 100 H278" arrowId={arrowId} />
      <Wire d="M86 202 H154" />
      <Block x="154" y="168" title="NOT B" subtitle="invert" />
      <Wire d="M266 202 H278" arrowId={arrowId} />
      <Block x="278" y="118" width="144" height="118" title="4-bit" subtitle="Adder" />
      <Wire d="M164 282 H278" />
      <Label x="118" y="288" anchor="start" size="16">Cin = 1</Label>
      <Wire d="M422 176 H566" arrowId={arrowId} />
      <Label x="590" y="182" anchor="start">A - B</Label>
      <Label x="350" y="270" size="16" muted>A + NOT(B) + 1</Label>
    </g>
  );
}

function MultiplexerDiagram({ arrowId }) {
  return (
    <g>
      {['I0', 'I1', 'I2', 'I3'].map((input, index) => {
        const y = 80 + index * 52;
        return (
          <g key={input}>
            <Label x="74" y={y + 6} anchor="start" size="16">{input}</Label>
            <Wire d={`M116 ${y} H268`} />
          </g>
        );
      })}
      <path d="M268 54 H470 L520 180 L470 306 H268 Z" fill={fillColor} stroke={accentColor} strokeWidth="3" />
      <Label x="382" y="164" size="30">MUX</Label>
      <Label x="382" y="198" size="13" muted>selector memilih jalur</Label>
      <Wire d="M394 328 V306" />
      <Label x="394" y="344" size="16">S1S0</Label>
      <Wire d="M520 180 H626" arrowId={arrowId} />
      <Label x="644" y="186" anchor="start">OUT</Label>
    </g>
  );
}

function AluDiagram({ arrowId }) {
  return (
    <g>
      <Label x="54" y="108" anchor="start" size="16">A</Label>
      <Label x="54" y="216" anchor="start" size="16">B</Label>
      <Wire d="M82 104 H144" />
      <Wire d="M82 212 H144" />
      <Junction x="144" y="104" />
      <Junction x="144" y="212" />
      <Wire d="M144 104 C168 104 168 74 196 74" />
      <Wire d="M144 212 C168 212 168 110 196 110" />
      <Wire d="M144 104 C168 104 168 154 196 154" />
      <Wire d="M144 212 C168 212 168 190 196 190" />
      <Wire d="M144 104 C168 104 168 236 196 236" />
      <Wire d="M144 212 C168 212 168 272 196 272" />
      <Block x="196" y="48" title="LOGIC" subtitle="AND OR XOR" />
      <Block x="196" y="128" title="ADDER" subtitle="ADD" />
      <Block x="196" y="224" title="SUB" subtitle="A-B" />
      <Wire d="M308 82 H420" />
      <Wire d="M308 162 H420" />
      <Wire d="M308 258 H420" />
      <path d="M420 54 H540 L582 180 L540 306 H420 Z" fill={fillColor} stroke={accentColor} strokeWidth="3" />
      <Label x="494" y="174" size="25">MUX</Label>
      <Label x="494" y="204" size="13" muted>opcode</Label>
      <Wire d="M582 180 H652" arrowId={arrowId} />
      <Label x="662" y="186" anchor="start">OUT</Label>
    </g>
  );
}

function GenericDiagram({ arrowId }) {
  return (
    <g>
      <Block x="170" y="138" title="INPUT" />
      <Wire d="M282 172 H390" arrowId={arrowId} />
      <Block x="390" y="138" title="OUTPUT" />
    </g>
  );
}
