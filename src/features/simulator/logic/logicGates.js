import { binaryToDecimal, isBinary, padBinary } from '../../../utils/binary';

export function calculateGateBit(gate, a, b = '0') {
  const bitA = Number(a);
  const bitB = Number(b);

  if (gate === 'AND') return bitA & bitB;
  if (gate === 'OR') return bitA | bitB;
  if (gate === 'XOR') return bitA ^ bitB;
  if (gate === 'NAND') return Number(!(bitA & bitB));
  if (gate === 'NOR') return Number(!(bitA | bitB));
  if (gate === 'XNOR') return Number(!(bitA ^ bitB));
  if (gate === 'NOT') return Number(!bitA);
  return 0;
}

export function calculateLogicGates(a, b) {
  return {
    and: Number(a) & Number(b),
    or: Number(a) | Number(b),
    notA: Number(!Number(a)),
    notB: Number(!Number(b)),
    nand: Number(!(Number(a) & Number(b))),
    nor: Number(!(Number(a) | Number(b))),
    xor: Number(a) ^ Number(b),
    xnor: Number(!(Number(a) ^ Number(b))),
  };
}

export function evaluateLogicGate(inputA, inputB, gate) {
  const a = inputA.trim();
  const b = inputB.trim();
  const usesB = gate !== 'NOT';

  if (!a || (usesB && !b)) {
    return {
      isValid: false,
      errorMessage: usesB ? 'Input A dan B tidak boleh kosong.' : 'Input A tidak boleh kosong.',
      paddedA: a,
      paddedB: usesB ? b : 'Unused',
      output: '',
      decimal: '-',
      rows: [],
    };
  }

  if (!isBinary(a) || (usesB && !isBinary(b))) {
    return {
      isValid: false,
      errorMessage: 'Input hanya menerima angka 0 dan 1 dengan panjang maksimal 16 bit.',
      paddedA: a,
      paddedB: usesB ? b : 'Unused',
      output: '',
      decimal: '-',
      rows: [],
    };
  }

  const width = usesB ? Math.max(a.length, b.length) : a.length;
  const paddedA = padBinary(a, width);
  const paddedB = usesB ? padBinary(b, width) : 'Unused';
  const bits = [...paddedA].map((bitA, index) =>
    String(calculateGateBit(gate, bitA, usesB ? paddedB[index] : '0')),
  );
  const output = bits.join('');

  return {
    isValid: true,
    errorMessage: '',
    paddedA,
    paddedB,
    output,
    decimal: binaryToDecimal(output),
    rows: bits.map((bit, index) => ({
      bit: width - 1 - index,
      a: paddedA[index],
      b: usesB ? paddedB[index] : null,
      output: bit,
    })),
  };
}

export function truthRowsForGate(gate) {
  if (gate === 'NOT') {
    return ['0', '1'].map((a) => [a, calculateGateBit(gate, a)]);
  }

  return [
    ['0', '0'],
    ['0', '1'],
    ['1', '0'],
    ['1', '1'],
  ].map(([a, b]) => [a, b, calculateGateBit(gate, a, b)]);
}
