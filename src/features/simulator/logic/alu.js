import { binaryToDecimal, isValid4Bit } from '../../../utils/binary';
import { calculateFourBitAdder } from './fourBitAdder';
import { calculateSubtractor } from './subtractor';

const bitwise = (a, b, callback) => [...a].map((bit, index) => callback(bit, b[index])).join('');

export function calculateAlu(inputA, inputB, operation) {
  const a = inputA.trim();
  const b = inputB.trim();

  if (!isValid4Bit(a) || !isValid4Bit(b)) {
    return {
      isValid: false,
      status: 'Error',
      errorMessage: 'ALU membutuhkan A dan B sepanjang 4 bit.',
      binaryResult: '',
      decimalResult: '-',
      rows: [],
    };
  }

  if (operation === 'ADD') {
    const add = calculateFourBitAdder(a, b);
    return {
      isValid: add.isValid,
      status: 'Success',
      operation,
      binaryResult: add.result,
      decimalResult: add.decimal,
      carryOut: add.carryOut,
      flag: add.carryOut ? 'Carry' : 'Clear',
      rows: add.rows,
      explanation: `${a} + ${b} menghasilkan ${add.result}.`,
    };
  }

  if (operation === 'SUB') {
    const sub = calculateSubtractor(a, b);
    return {
      isValid: sub.isValid,
      status: 'Success',
      operation,
      binaryResult: sub.result,
      decimalResult: sub.decimal,
      borrowOut: sub.borrowOut,
      flag: sub.underflow ? 'Borrow' : 'Clear',
      rows: sub.rows,
      explanation: `${a} - ${b} menghasilkan ${sub.result}.`,
    };
  }

  const binaryResult =
    operation === 'AND'
      ? bitwise(a, b, (bitA, bitB) => (bitA === '1' && bitB === '1' ? '1' : '0'))
      : bitwise(a, b, (bitA, bitB) => (bitA === '1' || bitB === '1' ? '1' : '0'));

  return {
    isValid: true,
    status: 'Success',
    operation,
    binaryResult,
    decimalResult: binaryToDecimal(binaryResult),
    flag: 'Clear',
    rows: [...binaryResult].map((bit, index) => ({
      bit: 3 - index,
      a: a[index],
      b: b[index],
      result: bit,
    })),
    explanation: `${operation} menghitung setiap pasangan bit A dan B.`,
  };
}
