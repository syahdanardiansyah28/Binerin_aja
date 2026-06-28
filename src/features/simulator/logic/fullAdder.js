import { isBit } from '../../../utils/binary';
import { calculateHalfAdder } from './halfAdder';

export function calculateFullAdder(a, b, cin) {
  const first = calculateHalfAdder(a, b);
  const second = calculateHalfAdder(first.sum, cin);
  const cout = first.carry | second.carry;

  return {
    sum: second.sum,
    cout,
    carryOut: cout,
    binaryResult: `${cout}${second.sum}`,
  };
}

export function evaluateFullAdder(inputA, inputB, inputCin) {
  const a = inputA.trim();
  const b = inputB.trim();
  const cin = inputCin.trim();

  if (!a || !b || !cin) {
    return {
      isValid: false,
      errorMessage: 'Input A, B, dan Carry In tidak boleh kosong.',
      sum: '-',
      cout: '-',
      rows: [],
    };
  }

  if (!isBit(a) || !isBit(b) || !isBit(cin)) {
    return {
      isValid: false,
      errorMessage: 'Full Adder hanya menerima input 1 bit.',
      sum: '-',
      cout: '-',
      rows: [],
    };
  }

  return { isValid: true, errorMessage: '', ...calculateFullAdder(a, b, cin), rows: fullAdderRows() };
}

export function fullAdderRows() {
  return ['000', '001', '010', '011', '100', '101', '110', '111'].map((bits) => {
    const result = calculateFullAdder(bits[0], bits[1], bits[2]);
    return { a: bits[0], b: bits[1], cin: bits[2], ...result };
  });
}
