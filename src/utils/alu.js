export const isBinary = (value) => /^[01]+$/.test(value);

export const binaryToDecimal = (value) => parseInt(value || '0', 2);

const BINARY_OPERATIONS = ['ADD', 'SUB', 'AND', 'OR', 'XOR'];
const UNARY_OPERATIONS = ['INC', 'DEC', 'NOT'];

const toBitWidth = (registerA, registerB, operation) => {
  if (UNARY_OPERATIONS.includes(operation)) return Math.max(registerA.length, 1);
  return Math.max(registerA.length, registerB.length, 1);
};

const padLeft = (value, width) => value.padStart(width, '0');

const cutToWidth = (value, width) => value.slice(-width).padStart(width, '0');

const decimalToBinaryWidth = (value, width) => {
  const modulo = 2 ** width;
  return (value & (modulo - 1)).toString(2).padStart(width, '0');
};

const makeError = ({ registerA = '', registerB = '', operation, message }) => ({
  operation,
  bitWidth: 0,
  inputA: registerA,
  inputB: BINARY_OPERATIONS.includes(operation) ? registerB : operation === 'NOT' ? null : '',
  operandLabel: operation === 'NOT' ? 'Unused' : 'Register B',
  rawBinaryResult: '',
  binaryResult: '',
  decimalA: 0,
  decimalB: 0,
  decimalResult: 0,
  carryOut: null,
  borrowOut: null,
  overflow: false,
  underflow: false,
  status: 'Error',
  errorMessage: message,
  explanation: message,
  stepLines: [],
  bitTable: [],
});

const buildAddRows = (a, b) => {
  let carry = 0;
  let result = '';
  const rows = [];

  // ADD/INC diproses dari LSB ke MSB supaya carry bisa dilacak per bit.
  for (let index = a.length - 1; index >= 0; index -= 1) {
    const bitA = Number(a[index]);
    const bitB = Number(b[index]);
    const carryIn = carry;
    const sum = bitA + bitB + carryIn;
    const bitResult = sum % 2;
    carry = sum > 1 ? 1 : 0;
    result = `${bitResult}${result}`;
    rows.unshift({
      bit: a.length - 1 - index,
      a: bitA,
      b: bitB,
      carryIn,
      result: bitResult,
      carryOut: carry,
    });
  }

  return { rows, result, carryOut: carry };
};

const buildSubRows = (a, b) => {
  let borrow = 0;
  let result = '';
  const rows = [];

  // SUB/DEC menggunakan borrow manual, bukan sekadar pengurangan desimal.
  for (let index = a.length - 1; index >= 0; index -= 1) {
    const bitA = Number(a[index]);
    const bitB = Number(b[index]);
    const borrowIn = borrow;
    let diff = bitA - bitB - borrowIn;
    borrow = diff < 0 ? 1 : 0;
    if (diff < 0) diff += 2;
    result = `${diff}${result}`;
    rows.unshift({
      bit: a.length - 1 - index,
      a: bitA,
      b: bitB,
      borrowIn,
      result: diff,
      borrowOut: borrow,
    });
  }

  return { rows, result, borrowOut: borrow };
};

const buildLogicRows = (a, b, operation, result) =>
  [...result].map((bit, index) => ({
    bit: result.length - 1 - index,
    a: Number(a[index]),
    b: b ? Number(b[index]) : null,
    result: Number(bit),
    operation,
  }));

const line = (width) => '-'.repeat(width);

const rawFromDecimal = (value) => (value < 0 ? `-${Math.abs(value).toString(2)}` : value.toString(2));

export function calculateALU({ registerA, registerB = '', operation }) {
  const trimmedA = registerA.trim();
  const trimmedB = registerB.trim();
  const usesRegisterB = BINARY_OPERATIONS.includes(operation);

  if (!trimmedA) {
    return makeError({ registerA: trimmedA, registerB: trimmedB, operation, message: 'Register A tidak boleh kosong.' });
  }

  if (!isBinary(trimmedA)) {
    return makeError({ registerA: trimmedA, registerB: trimmedB, operation, message: 'Register A hanya boleh berisi angka 0 dan 1.' });
  }

  if (usesRegisterB && !trimmedB) {
    return makeError({ registerA: trimmedA, registerB: trimmedB, operation, message: 'Register B tidak boleh kosong untuk operasi ini.' });
  }

  if (usesRegisterB && !isBinary(trimmedB)) {
    return makeError({ registerA: trimmedA, registerB: trimmedB, operation, message: 'Register B hanya boleh berisi angka 0 dan 1.' });
  }

  const bitWidth = toBitWidth(trimmedA, trimmedB, operation);
  const inputA = padLeft(trimmedA, bitWidth);
  const inputB = usesRegisterB
    ? padLeft(trimmedB, bitWidth)
    : operation === 'INC' || operation === 'DEC'
      ? padLeft('1', bitWidth)
      : null;
  const decimalA = binaryToDecimal(inputA);
  const decimalB = inputB ? binaryToDecimal(inputB) : 0;
  let rawBinaryResult = '';
  let binaryResult = '';
  let decimalResult = 0;
  let carryOut = null;
  let borrowOut = null;
  let overflow = false;
  let underflow = false;
  let explanation = '';
  let stepLines = [];
  let bitTable = [];
  let operandLabel = 'Register B';

  if (operation === 'ADD') {
    const rawDecimal = decimalA + decimalB;
    const add = buildAddRows(inputA, inputB);
    carryOut = add.carryOut;
    overflow = carryOut === 1;
    rawBinaryResult = `${carryOut ? '1' : ''}${add.result}` || '0';
    binaryResult = cutToWidth(add.result, bitWidth);
    decimalResult = binaryToDecimal(binaryResult);
    bitTable = add.rows;
    explanation = `${inputA} + ${inputB} = ${binaryResult}. Desimal: ${decimalA} + ${decimalB} = ${rawDecimal}.`;
    stepLines = [`  ${inputA}`, `+ ${inputB}`, `  ${line(bitWidth)}`, `  ${binaryResult}`];
  }

  if (operation === 'SUB') {
    const rawDecimal = decimalA - decimalB;
    const sub = buildSubRows(inputA, inputB);
    borrowOut = sub.borrowOut;
    underflow = borrowOut === 1;
    rawBinaryResult = rawFromDecimal(rawDecimal);
    binaryResult = cutToWidth(sub.result, bitWidth);
    decimalResult = binaryToDecimal(binaryResult);
    bitTable = sub.rows;
    explanation = `${inputA} - ${inputB} = ${binaryResult}. Borrow out ${borrowOut}.`;
    stepLines = [`  ${inputA}`, `- ${inputB}`, `  ${line(bitWidth)}`, `  ${binaryResult}`];
  }

  if (operation === 'INC') {
    operandLabel = 'Constant +1';
    const rawDecimal = decimalA + 1;
    const add = buildAddRows(inputA, inputB);
    carryOut = add.carryOut;
    overflow = carryOut === 1;
    rawBinaryResult = `${carryOut ? '1' : ''}${add.result}` || '0';
    binaryResult = cutToWidth(add.result, bitWidth);
    decimalResult = binaryToDecimal(binaryResult);
    bitTable = add.rows;
    explanation = `Register A dinaikkan 1. Raw result ${rawBinaryResult}, hasil ${bitWidth}-bit ${binaryResult}.`;
    stepLines = [
      `  ${inputA}`,
      `+ ${inputB}`,
      `  ${line(bitWidth)}`,
      `  ${binaryResult}`,
      `Catatan raw result ${rawBinaryResult}, hasil ${bitWidth}-bit ${binaryResult}, carry out ${carryOut}.`,
    ];
  }

  if (operation === 'DEC') {
    operandLabel = 'Constant -1';
    const rawDecimal = decimalA - 1;
    const sub = buildSubRows(inputA, inputB);
    borrowOut = sub.borrowOut;
    underflow = borrowOut === 1;
    rawBinaryResult = rawFromDecimal(rawDecimal);
    binaryResult = cutToWidth(sub.result, bitWidth);
    decimalResult = binaryToDecimal(binaryResult);
    bitTable = sub.rows;
    explanation = `Register A dikurangi 1. Borrow out ${borrowOut}, hasil ${bitWidth}-bit ${binaryResult}.`;
    stepLines = [
      `  ${inputA}`,
      `- ${inputB}`,
      `  ${line(bitWidth)}`,
      `  ${binaryResult}`,
      underflow ? 'Catatan terjadi underflow/borrow.' : 'Catatan tidak terjadi underflow/borrow.',
    ];
  }

  if (operation === 'AND') {
    binaryResult = [...inputA].map((bit, index) => (bit === '1' && inputB[index] === '1' ? '1' : '0')).join('');
    rawBinaryResult = binaryResult;
    decimalResult = binaryToDecimal(binaryResult);
    bitTable = buildLogicRows(inputA, inputB, operation, binaryResult);
    explanation = `AND menghasilkan 1 hanya jika bit A dan B sama-sama 1.`;
    stepLines = [`  ${inputA}`, `& ${inputB}`, `  ${line(bitWidth)}`, `  ${binaryResult}`];
  }

  if (operation === 'OR') {
    binaryResult = [...inputA].map((bit, index) => (bit === '1' || inputB[index] === '1' ? '1' : '0')).join('');
    rawBinaryResult = binaryResult;
    decimalResult = binaryToDecimal(binaryResult);
    bitTable = buildLogicRows(inputA, inputB, operation, binaryResult);
    explanation = `OR menghasilkan 1 jika salah satu bit bernilai 1.`;
    stepLines = [`  ${inputA}`, `| ${inputB}`, `  ${line(bitWidth)}`, `  ${binaryResult}`];
  }

  if (operation === 'XOR') {
    binaryResult = [...inputA].map((bit, index) => (bit !== inputB[index] ? '1' : '0')).join('');
    rawBinaryResult = binaryResult;
    decimalResult = binaryToDecimal(binaryResult);
    bitTable = buildLogicRows(inputA, inputB, operation, binaryResult);
    explanation = `XOR menghasilkan 1 jika bit A dan B berbeda.`;
    stepLines = [`  ${inputA}`, `^ ${inputB}`, `  ${line(bitWidth)}`, `  ${binaryResult}`];
  }

  if (operation === 'NOT') {
    operandLabel = 'Unused';
    binaryResult = [...inputA].map((bit) => (bit === '1' ? '0' : '1')).join('');
    rawBinaryResult = binaryResult;
    decimalResult = binaryToDecimal(binaryResult);
    bitTable = buildLogicRows(inputA, null, operation, binaryResult);
    explanation = `NOT membalik setiap bit pada Register A.`;
    stepLines = [`NOT ${inputA}`, `${line(bitWidth + 4)}`, `    ${binaryResult}`];
  }

  return {
    operation,
    bitWidth,
    inputA,
    inputB,
    operandLabel,
    rawBinaryResult,
    binaryResult,
    decimalA,
    decimalB,
    decimalResult,
    carryOut,
    borrowOut,
    overflow,
    underflow,
    status: 'Success',
    errorMessage: '',
    explanation,
    stepLines,
    bitTable,
  };
}
