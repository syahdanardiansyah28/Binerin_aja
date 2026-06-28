export const MAX_BINARY_LENGTH = 16;

export function sanitizeBinary(value, maxLength = MAX_BINARY_LENGTH) {
  return String(value ?? '')
    .replace(/[^01]/g, '')
    .slice(0, maxLength);
}

export function isBinary(value, { exactLength, maxLength = MAX_BINARY_LENGTH } = {}) {
  const input = String(value ?? '');
  if (!input || !/^[01]+$/.test(input)) return false;
  if (exactLength && input.length !== exactLength) return false;
  return input.length <= maxLength;
}

export function isBit(value) {
  return /^[01]$/.test(String(value ?? ''));
}

export function normalizeBit(value) {
  return Number(value) === 1 || value === '1' ? 1 : 0;
}

export function padBinary(value, width) {
  return String(value ?? '').padStart(width, '0').slice(-width);
}

export function binaryToDecimal(binary) {
  return parseInt(binary || '0', 2);
}

export function decimalToBinary(value, width = 4) {
  const mask = 2 ** width - 1;
  return (Number(value) & mask).toString(2).padStart(width, '0');
}

export function decimalTo4Bit(value) {
  return decimalToBinary(value, 4);
}

export function isValid4Bit(binary) {
  return isBinary(binary, { exactLength: 4, maxLength: 4 });
}

export function alignBinaryInputs(inputA, inputB, width) {
  return {
    a: padBinary(inputA, width),
    b: padBinary(inputB, width),
  };
}
