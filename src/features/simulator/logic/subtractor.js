import { binaryToDecimal, isValid4Bit } from '../../../utils/binary';

export function calculateSubtractor(inputA, inputB) {
  const a = inputA.trim();
  const b = inputB.trim();

  if (!isValid4Bit(a) || !isValid4Bit(b)) {
    return {
      isValid: false,
      errorMessage: 'Subtractor membutuhkan A dan B sepanjang 4 bit.',
      result: '',
      decimal: '-',
      borrowOut: '-',
      underflow: false,
      rows: [],
    };
  }

  let borrow = 0;
  let result = '';
  const rows = [];

  for (let index = 3; index >= 0; index -= 1) {
    const bitA = Number(a[index]);
    const bitB = Number(b[index]);
    const borrowIn = borrow;
    let diff = bitA - bitB - borrowIn;
    borrow = diff < 0 ? 1 : 0;
    if (diff < 0) diff += 2;
    result = `${diff}${result}`;
    rows.unshift({
      bit: 3 - index,
      a: bitA,
      b: bitB,
      borrowIn,
      result: diff,
      borrowOut: borrow,
    });
  }

  return {
    isValid: true,
    errorMessage: '',
    result,
    decimal: binaryToDecimal(result),
    borrowOut: borrow,
    underflow: borrow === 1,
    rows,
  };
}
