import { binaryToDecimal, isValid4Bit } from '../../../utils/binary';
import { calculateFullAdder } from './fullAdder';

export function calculateFourBitAdder(inputA, inputB, carryIn = '0') {
  const a = inputA.trim();
  const b = inputB.trim();
  const cin = carryIn.trim() || '0';

  if (!isValid4Bit(a) || !isValid4Bit(b) || !/^[01]$/.test(cin)) {
    return {
      isValid: false,
      errorMessage: '4-bit Adder membutuhkan A dan B sepanjang 4 bit, Carry In 0 atau 1.',
      result: '',
      decimal: '-',
      carryOut: '-',
      rows: [],
    };
  }

  let carry = Number(cin);
  let result = '';
  const rows = [];

  for (let index = 3; index >= 0; index -= 1) {
    const current = calculateFullAdder(a[index], b[index], carry);
    rows.unshift({
      bit: 3 - index,
      a: a[index],
      b: b[index],
      cin: carry,
      sum: current.sum,
      cout: current.cout,
    });
    result = `${current.sum}${result}`;
    carry = current.cout;
  }

  return {
    isValid: true,
    errorMessage: '',
    result,
    decimal: binaryToDecimal(result),
    carryOut: carry,
    rows,
  };
}
