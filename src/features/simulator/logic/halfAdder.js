import { isBit } from '../../../utils/binary';

export function calculateHalfAdder(a, b) {
  const sum = Number(a) ^ Number(b);
  const carry = Number(a) & Number(b);

  return {
    sum,
    carry,
    binaryResult: `${carry}${sum}`,
  };
}

export function evaluateHalfAdder(inputA, inputB) {
  const a = inputA.trim();
  const b = inputB.trim();

  if (!a || !b) {
    return { isValid: false, errorMessage: 'Input A dan B tidak boleh kosong.', sum: '-', carry: '-', rows: [] };
  }

  if (!isBit(a) || !isBit(b)) {
    return { isValid: false, errorMessage: 'Half Adder hanya menerima input 1 bit.', sum: '-', carry: '-', rows: [] };
  }

  return { isValid: true, errorMessage: '', ...calculateHalfAdder(a, b), rows: halfAdderRows() };
}

export function halfAdderRows() {
  return ['00', '01', '10', '11'].map((bits) => {
    const result = calculateHalfAdder(bits[0], bits[1]);
    return { a: bits[0], b: bits[1], ...result };
  });
}
