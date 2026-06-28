export const gateOptions = ['AND', 'OR', 'XOR', 'NAND', 'NOR', 'XNOR', 'NOT'];

export const gateDescriptions = {
  AND: 'Output 1 hanya saat A dan B sama-sama 1.',
  OR: 'Output 1 saat minimal salah satu input bernilai 1.',
  XOR: 'Output 1 saat A dan B berbeda.',
  NAND: 'Kebalikan AND, output 0 hanya saat A dan B sama-sama 1.',
  NOR: 'Kebalikan OR, output 1 hanya saat A dan B sama-sama 0.',
  XNOR: 'Kebalikan XOR, output 1 saat A dan B sama.',
  NOT: 'Membalik setiap bit dari input A.',
};
