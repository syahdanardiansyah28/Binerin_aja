export const MAX_CIRCUIT_NODES = 32;
export const MAX_CIRCUIT_EDGES = 64;

export const circuitPalette = [
  { label: 'Input', kind: 'inputNode' },
  { label: 'Output LED', kind: 'outputNode' },
  { label: 'AND', kind: 'gateNode', gateType: 'AND' },
  { label: 'OR', kind: 'gateNode', gateType: 'OR' },
  { label: 'NOT', kind: 'gateNode', gateType: 'NOT' },
  { label: 'NAND', kind: 'gateNode', gateType: 'NAND' },
  { label: 'NOR', kind: 'gateNode', gateType: 'NOR' },
  { label: 'XOR', kind: 'gateNode', gateType: 'XOR' },
  { label: 'XNOR', kind: 'gateNode', gateType: 'XNOR' },
  { label: 'Half Adder', kind: 'halfAdderNode' },
  { label: 'Full Adder', kind: 'fullAdderNode' },
];
