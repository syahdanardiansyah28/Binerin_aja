import { binaryToDecimal } from './binary';

export function formatBinaryWithDecimal(binary) {
  return `${binary} (${binaryToDecimal(binary)})`;
}

export function formatStatusLabel(status) {
  return status === 'success' || status === 'Success' ? 'Success' : status || 'Idle';
}
