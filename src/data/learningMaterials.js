export const learningMaterials = [
  {
    id: 'logic-gates',
    number: '01',
    title: 'Gerbang Logika',
    slug: 'gerbang-logika',
    summary: 'AND, OR, NOT, XOR, dan turunannya menjadi operasi digital paling dasar.',
    image: '/images/logic-gates.png',
    concept:
      'Gerbang logika adalah rangkaian dasar yang memproses input biner 0 dan 1 untuk menghasilkan output biner sesuai operasi Boolean.',
    formula: ['AND: A * B', 'OR: A + B', "NOT: A'", 'XOR: A XOR B', "NAND: (A * B)'", "NOR: (A + B)'"],
    example: {
      input: 'A = 1, B = 0',
      output: 'XOR = 1, AND = 0, OR = 1',
    },
    nextRelation:
      'Gerbang logika menjadi dasar pembentukan Half Adder, yaitu rangkaian pertama untuk penjumlahan biner.',
    simulationTab: 'logic-gates',
  },
  {
    id: 'half-adder',
    number: '02',
    title: 'Half Adder',
    slug: 'half-adder',
    summary: 'XOR membentuk SUM, sedangkan AND membentuk Carry.',
    image: '/images/half-adder.png',
    concept: 'Half Adder adalah rangkaian kombinasi untuk menjumlahkan dua bit input, yaitu A dan B.',
    formula: ['SUM = A XOR B', 'Carry = A * B'],
    example: {
      input: 'A = 1, B = 1',
      output: 'SUM = 0, Carry = 1, hasil biner = 10',
    },
    nextRelation:
      'Half Adder belum memiliki Carry In, sehingga konsep ini dikembangkan menjadi Full Adder.',
    simulationTab: 'half-adder',
  },
  {
    id: 'full-adder',
    number: '03',
    title: 'Full Adder',
    slug: 'full-adder',
    summary: 'Carry In ditambahkan agar penjumlahan bisa dirangkai antar bit.',
    image: '/images/full-adder.png',
    concept:
      'Full Adder menjumlahkan tiga input, yaitu A, B, dan Cin. Cin digunakan untuk menerima carry dari bit sebelumnya.',
    formula: ['SUM = A XOR B XOR Cin', 'Cout = AB + Cin(A XOR B)'],
    example: {
      input: 'A = 1, B = 1, Cin = 1',
      output: 'SUM = 1, Cout = 1, hasil biner = 11',
    },
    nextRelation: 'Beberapa Full Adder dapat disusun berantai untuk membentuk 4-bit Adder.',
    simulationTab: 'full-adder',
  },
  {
    id: 'four-bit-adder',
    number: '04',
    title: '4-bit Adder',
    slug: '4-bit-adder',
    summary: 'Empat Full Adder disusun berantai dari LSB menuju MSB.',
    image: '/images/adder-4bit.png',
    concept:
      '4-bit Adder dibentuk dari empat Full Adder. Carry dari bit rendah diteruskan ke bit berikutnya sampai bit tertinggi.',
    formula: ['A[3:0] + B[3:0] + Cin = SUM[3:0] + Cout'],
    example: {
      input: 'A = 0101, B = 0011, Cin = 0',
      output: 'SUM = 1000, Cout = 0, desimal = 5 + 3 = 8',
    },
    nextRelation:
      'Struktur adder dapat dimanfaatkan kembali untuk membangun subtractor menggunakan komplemen dua.',
    simulationTab: 'four-bit-adder',
  },
  {
    id: 'subtractor',
    number: '05',
    title: 'Subtractor',
    slug: 'subtractor',
    summary: 'Pengurangan dilakukan dengan konsep komplemen dua: A + NOT(B) + 1.',
    image: '/images/subtractor-4bit.png',
    concept:
      'Subtractor dapat dibuat dengan memanfaatkan adder. Input B dibalik, lalu carry awal diberi nilai 1.',
    formula: ['A - B = A + NOT(B) + 1'],
    example: {
      input: 'A = 0101, B = 0011',
      output: 'Output = 0010, desimal = 5 - 3 = 2',
    },
    nextRelation: 'Hasil operasi aritmetika seperti ADD dan SUB dapat dipilih menggunakan multiplexer.',
    simulationTab: 'subtractor',
  },
  {
    id: 'multiplexer',
    number: '06',
    title: 'Multiplexer',
    slug: 'multiplexer',
    summary: 'MUX memilih output operasi berdasarkan selector.',
    image: '/images/multiplexer.png',
    concept:
      'Multiplexer adalah rangkaian pemilih. Dalam ALU sederhana, MUX memilih salah satu hasil operasi berdasarkan selector.',
    formula: ['S1S0 = 00 -> AND', 'S1S0 = 01 -> OR', 'S1S0 = 10 -> ADD', 'S1S0 = 11 -> SUB'],
    example: {
      input: 'S1S0 = 10',
      output: 'Output yang dipilih adalah hasil ADD',
    },
    nextRelation: 'MUX menjadi penghubung akhir yang membuat beberapa operasi dapat berada dalam satu ALU.',
    simulationTab: 'multiplexer',
  },
  {
    id: 'alu',
    number: '07',
    title: 'ALU Sederhana',
    slug: 'alu-sederhana',
    summary: 'ALU menggabungkan operasi logika dan aritmetika dalam satu blok.',
    image: '/images/alu.png',
    concept:
      'ALU sederhana menerima input A dan B, lalu menjalankan operasi logika atau aritmetika sesuai selector.',
    formula: ['00 = AND', '01 = OR', '10 = ADD', '11 = SUB'],
    example: {
      input: 'A = 0101, B = 0011, S1S0 = 10',
      output: 'Operasi = ADD, Output = 1000',
    },
    nextRelation:
      'ALU membuktikan bahwa gerbang logika dapat disusun menjadi unit komputasi kecil yang menjalankan operasi dasar CPU.',
    simulationTab: 'alu',
  },
];

export function findLearningMaterial(slug) {
  return learningMaterials.find((material) => material.slug === slug);
}
