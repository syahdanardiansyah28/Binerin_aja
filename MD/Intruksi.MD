# Struktur Project Web Binerin

Project ini dibuat sebagai media pembelajaran interaktif untuk membantu audiens memahami alur **Evolusi Gerbang Logika Menuju ALU**. Web ini tidak menggunakan login, backend, atau database. Fokus utama project adalah menampilkan simulasi input-output dari beberapa rangkaian digital, seperti gerbang logika, Half Adder, Full Adder, 4-bit Adder, Subtractor, Multiplexer, dan ALU sederhana.

Agar project mudah dikembangkan dan dirawat, struktur folder dibuat secara modular. Setiap halaman, komponen UI, data, dan logika perhitungan dipisahkan berdasarkan tanggung jawabnya masing-masing.

## Teknologi yang Digunakan

* React
* Vite
* Tailwind CSS
* React Router DOM
* JavaScript

## Struktur Folder

```text
binerin/
├── public/
│   ├── images/
│   │   ├── logic-flow.png
│   │   ├── logic-gates.png
│   │   ├── half-adder.png
│   │   ├── full-adder.png
│   │   ├── adder-4bit.png
│   │   ├── subtractor-4bit.png
│   │   ├── multiplexer.png
│   │   └── alu.png
│   └── favicon.svg
│
├── src/
│   ├── assets/
│   │   └── icons/
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Container.jsx
│   │   │   ├── SectionTitle.jsx
│   │   │   ├── BinaryToggle.jsx
│   │   │   └── BinaryInput.jsx
│   │   │
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── PageLayout.jsx
│   │   │
│   │   └── simulation/
│   │       ├── InputPanel.jsx
│   │       ├── OutputPanel.jsx
│   │       ├── ExplanationCard.jsx
│   │       ├── SimulationTabs.jsx
│   │       └── BinaryInput4Bit.jsx
│   │
│   ├── features/
│   │   └── simulator/
│   │       ├── components/
│   │       │   ├── LogicGateSimulator.jsx
│   │       │   ├── HalfAdderSimulator.jsx
│   │       │   ├── FullAdderSimulator.jsx
│   │       │   ├── FourBitAdderSimulator.jsx
│   │       │   ├── SubtractorSimulator.jsx
│   │       │   ├── MultiplexerSimulator.jsx
│   │       │   └── AluSimulator.jsx
│   │       │
│   │       ├── data/
│   │       │   ├── simulatorTabs.js
│   │       │   ├── gateDescriptions.js
│   │       │   ├── aluOperations.js
│   │       │   └── evolutionSteps.js
│   │       │
│   │       └── logic/
│   │           ├── logicGates.js
│   │           ├── halfAdder.js
│   │           ├── fullAdder.js
│   │           ├── fourBitAdder.js
│   │           ├── subtractor.js
│   │           ├── multiplexer.js
│   │           └── alu.js
│   │
│   ├── pages/
│   │   ├── LandingPage.jsx
│   │   └── SimulationPage.jsx
│   │
│   ├── routes/
│   │   └── AppRoutes.jsx
│   │
│   ├── utils/
│   │   ├── binary.js
│   │   └── format.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .gitignore
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## Penjelasan Folder

### `public/`

Folder ini digunakan untuk menyimpan file statis yang dapat diakses langsung oleh browser.

```text
public/
├── images/
└── favicon.svg
```

Folder `images/` digunakan untuk menyimpan gambar pendukung seperti diagram alur evolusi, gambar gerbang logika, Half Adder, Full Adder, 4-bit Adder, Subtractor, Multiplexer, dan ALU.

Contoh penggunaan:

```jsx
<img src="/images/logic-flow.png" alt="Alur Evolusi Gerbang Logika Menuju ALU" />
```

---

### `src/assets/`

Folder ini digunakan untuk menyimpan asset internal seperti icon atau ilustrasi kecil yang digunakan langsung di dalam komponen React.

```text
src/assets/
└── icons/
```

Jika asset bersifat umum dan langsung digunakan oleh komponen, dapat diletakkan di sini. Jika asset hanya berupa gambar statis untuk ditampilkan di halaman, lebih baik diletakkan di `public/images/`.

---

### `src/components/common/`

Folder ini berisi komponen kecil yang dapat digunakan berulang di banyak halaman.

```text
components/common/
├── Button.jsx
├── Card.jsx
├── Container.jsx
├── SectionTitle.jsx
├── BinaryToggle.jsx
└── BinaryInput.jsx
```

Fungsi setiap komponen:

| Komponen           | Fungsi                                         |
| ------------------ | ---------------------------------------------- |
| `Button.jsx`       | Tombol reusable untuk CTA, reset, dan navigasi |
| `Card.jsx`         | Pembungkus konten agar tampilan konsisten      |
| `Container.jsx`    | Mengatur lebar maksimal konten halaman         |
| `SectionTitle.jsx` | Judul dan deskripsi section                    |
| `BinaryToggle.jsx` | Toggle input biner 0/1                         |
| `BinaryInput.jsx`  | Input nilai biner sederhana                    |

Komponen di folder ini tidak boleh berisi logika spesifik simulator. Tujuannya hanya untuk tampilan dasar yang reusable.

---

### `src/components/layout/`

Folder ini berisi komponen layout utama halaman.

```text
components/layout/
├── Navbar.jsx
├── Footer.jsx
└── PageLayout.jsx
```

Fungsi setiap komponen:

| Komponen         | Fungsi                                   |
| ---------------- | ---------------------------------------- |
| `Navbar.jsx`     | Navigasi utama web                       |
| `Footer.jsx`     | Bagian footer halaman                    |
| `PageLayout.jsx` | Pembungkus layout halaman agar konsisten |

Navbar dapat berisi:

```text
Binerin | Alur Evolusi | Fitur | Tentang | Mulai Simulasi
```

---

### `src/components/simulation/`

Folder ini berisi komponen UI yang sering digunakan pada halaman simulasi.

```text
components/simulation/
├── InputPanel.jsx
├── OutputPanel.jsx
├── ExplanationCard.jsx
├── SimulationTabs.jsx
└── BinaryInput4Bit.jsx
```

Fungsi setiap komponen:

| Komponen              | Fungsi                                |
| --------------------- | ------------------------------------- |
| `InputPanel.jsx`      | Area untuk mengatur input simulasi    |
| `OutputPanel.jsx`     | Area untuk menampilkan hasil simulasi |
| `ExplanationCard.jsx` | Area penjelasan konsep dan rumus      |
| `SimulationTabs.jsx`  | Navigasi antar fitur simulasi         |
| `BinaryInput4Bit.jsx` | Input khusus bilangan biner 4-bit     |

Folder ini hanya berisi komponen tampilan untuk simulasi. Perhitungan tetap disimpan di folder `features/simulator/logic/`.

---

## Struktur Fitur Simulator

Semua fitur simulasi disimpan di dalam folder:

```text
src/features/simulator/
```

Folder ini dibagi menjadi tiga bagian:

```text
features/simulator/
├── components/
├── data/
└── logic/
```

### `features/simulator/components/`

Folder ini berisi komponen utama untuk setiap fitur simulasi.

```text
features/simulator/components/
├── LogicGateSimulator.jsx
├── HalfAdderSimulator.jsx
├── FullAdderSimulator.jsx
├── FourBitAdderSimulator.jsx
├── SubtractorSimulator.jsx
├── MultiplexerSimulator.jsx
└── AluSimulator.jsx
```

Fungsi setiap komponen:

| Komponen                    | Fungsi                                                        |
| --------------------------- | ------------------------------------------------------------- |
| `LogicGateSimulator.jsx`    | Menguji output gerbang AND, OR, NOT, NAND, NOR, XOR, dan XNOR |
| `HalfAdderSimulator.jsx`    | Menguji SUM dan Carry dari input A dan B                      |
| `FullAdderSimulator.jsx`    | Menguji SUM dan Cout dari input A, B, dan Cin                 |
| `FourBitAdderSimulator.jsx` | Menguji penjumlahan dua bilangan biner 4-bit                  |
| `SubtractorSimulator.jsx`   | Menguji pengurangan biner 4-bit                               |
| `MultiplexerSimulator.jsx`  | Menguji pemilihan output berdasarkan selector                 |
| `AluSimulator.jsx`          | Menguji operasi AND, OR, ADD, dan SUB dalam ALU sederhana     |

Setiap simulator dibuat terpisah agar mudah diperbaiki, dikembangkan, atau diganti tanpa mengganggu fitur lain.

---

### `features/simulator/data/`

Folder ini berisi data statis yang digunakan oleh halaman dan fitur simulasi.

```text
features/simulator/data/
├── simulatorTabs.js
├── gateDescriptions.js
├── aluOperations.js
└── evolutionSteps.js
```

Fungsi setiap file:

| File                  | Fungsi                                                     |
| --------------------- | ---------------------------------------------------------- |
| `simulatorTabs.js`    | Menyimpan daftar tab/menu simulasi                         |
| `gateDescriptions.js` | Menyimpan penjelasan singkat setiap gerbang logika         |
| `aluOperations.js`    | Menyimpan daftar operasi ALU dan selector                  |
| `evolutionSteps.js`   | Menyimpan data alur evolusi dari gerbang logika menuju ALU |

Contoh isi `simulatorTabs.js`:

```js
export const simulatorTabs = [
  {
    id: "logic-gates",
    label: "Gerbang Logika",
  },
  {
    id: "half-adder",
    label: "Half Adder",
  },
  {
    id: "full-adder",
    label: "Full Adder",
  },
  {
    id: "four-bit-adder",
    label: "4-bit Adder",
  },
  {
    id: "subtractor",
    label: "Subtractor",
  },
  {
    id: "multiplexer",
    label: "Multiplexer",
  },
  {
    id: "alu",
    label: "ALU Sederhana",
  },
];
```

Contoh isi `aluOperations.js`:

```js
export const aluOperations = [
  {
    selector: "00",
    name: "AND",
    description: "Melakukan operasi logika AND pada setiap pasangan bit A dan B.",
  },
  {
    selector: "01",
    name: "OR",
    description: "Melakukan operasi logika OR pada setiap pasangan bit A dan B.",
  },
  {
    selector: "10",
    name: "ADD",
    description: "Menjumlahkan dua bilangan biner 4-bit.",
  },
  {
    selector: "11",
    name: "SUB",
    description: "Mengurangkan A dengan B menggunakan konsep komplemen dua.",
  },
];
```

---

### `features/simulator/logic/`

Folder ini berisi fungsi perhitungan dari setiap rangkaian. Semua logika digital dipisahkan dari komponen UI agar mudah diuji dan dirawat.

```text
features/simulator/logic/
├── logicGates.js
├── halfAdder.js
├── fullAdder.js
├── fourBitAdder.js
├── subtractor.js
├── multiplexer.js
└── alu.js
```

Fungsi setiap file:

| File              | Fungsi                                      |
| ----------------- | ------------------------------------------- |
| `logicGates.js`   | Menghitung output gerbang logika dasar      |
| `halfAdder.js`    | Menghitung SUM dan Carry                    |
| `fullAdder.js`    | Menghitung SUM dan Cout                     |
| `fourBitAdder.js` | Menghitung penjumlahan 4-bit                |
| `subtractor.js`   | Menghitung pengurangan 4-bit                |
| `multiplexer.js`  | Menghitung output berdasarkan selector      |
| `alu.js`          | Menggabungkan operasi AND, OR, ADD, dan SUB |

Contoh isi `logicGates.js`:

```js
export function calculateLogicGates(a, b) {
  return {
    and: a & b,
    or: a | b,
    notA: Number(!a),
    notB: Number(!b),
    nand: Number(!(a & b)),
    nor: Number(!(a | b)),
    xor: a ^ b,
    xnor: Number(!(a ^ b)),
  };
}
```

Contoh isi `halfAdder.js`:

```js
export function calculateHalfAdder(a, b) {
  const sum = a ^ b;
  const carry = a & b;

  return {
    sum,
    carry,
    binaryResult: `${carry}${sum}`,
  };
}
```

Contoh isi `fullAdder.js`:

```js
export function calculateFullAdder(a, b, cin) {
  const sum = a ^ b ^ cin;
  const cout = (a & b) | (cin & (a ^ b));

  return {
    sum,
    cout,
    binaryResult: `${cout}${sum}`,
  };
}
```

Contoh isi `multiplexer.js`:

```js
export function calculateMultiplexer(inputs, selector) {
  const index = parseInt(selector, 2);

  return {
    selectedInput: `I${index}`,
    output: inputs[index],
  };
}
```

---

## Halaman

### `pages/LandingPage.jsx`

Halaman landing page berfungsi sebagai halaman pembuka.

Isi utama landing page:

```text
Navbar
Hero Section
Alur Evolusi
Tujuan Web
Fitur Simulasi
CTA Akhir
Footer
```

Landing page tidak berisi logika perhitungan. Halaman ini hanya menjelaskan tujuan web dan mengarahkan pengguna ke halaman simulasi.

---

### `pages/SimulationPage.jsx`

Halaman simulasi adalah halaman utama untuk mencoba seluruh fitur pengujian.

Isi utama halaman simulasi:

```text
Navbar
Simulation Tabs
Simulator Area
Explanation Section
Footer
```

Alur komponen:

```text
SimulationPage
└── SimulationTabs
    ├── LogicGateSimulator
    ├── HalfAdderSimulator
    ├── FullAdderSimulator
    ├── FourBitAdderSimulator
    ├── SubtractorSimulator
    ├── MultiplexerSimulator
    └── AluSimulator
```

---

## Routing

Routing disimpan di:

```text
src/routes/AppRoutes.jsx
```

Route yang digunakan:

```text
/           → LandingPage
/simulasi   → SimulationPage
```

Contoh:

```jsx
import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import SimulationPage from "../pages/SimulationPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/simulasi" element={<SimulationPage />} />
    </Routes>
  );
}
```

---

## Utilities

Folder `utils/` berisi fungsi bantu umum yang dapat digunakan di berbagai fitur.

```text
utils/
├── binary.js
└── format.js
```

Contoh isi `binary.js`:

```js
export function binaryToDecimal(binary) {
  return parseInt(binary, 2);
}

export function decimalTo4Bit(value) {
  return (value & 15).toString(2).padStart(4, "0");
}

export function isValid4Bit(binary) {
  return /^[01]{4}$/.test(binary);
}

export function normalizeBit(value) {
  return Number(value) === 1 ? 1 : 0;
}
```

Contoh isi `format.js`:

```js
export function formatBinaryWithDecimal(binary) {
  return `${binary} (${parseInt(binary, 2)})`;
}
```

---

## Prinsip Pengembangan

Agar project tetap mudah dirawat, gunakan prinsip berikut:

1. Pisahkan tampilan dan logika perhitungan.
2. Setiap fitur simulasi dibuat dalam file komponen sendiri.
3. Setiap rumus atau operasi digital disimpan dalam folder `logic/`.
4. Data statis seperti tab, deskripsi, dan selector disimpan dalam folder `data/`.
5. Komponen kecil yang sering dipakai disimpan di `components/common/`.
6. Jangan membuat folder atau file yang belum digunakan.
7. Gunakan nama file yang jelas dan konsisten.
8. Hindari menulis logika perhitungan langsung di dalam JSX.
9. Hindari menulis teks penjelasan panjang langsung di komponen jika bisa dipindahkan ke file data.
10. Pastikan setiap fitur dapat dikembangkan tanpa merusak fitur lain.

---

## Alur Penggunaan Web

```text
Pengguna membuka landing page
↓
Pengguna membaca tujuan dan alur evolusi
↓
Pengguna menekan tombol Mulai Simulasi
↓
Pengguna masuk ke halaman simulasi
↓
Pengguna memilih fitur pengujian
↓
Pengguna mengubah input biner
↓
Web menampilkan output dan penjelasan
```

---

## Fitur Utama

| Fitur                   | Fungsi                                            |
| ----------------------- | ------------------------------------------------- |
| Landing Page            | Mengenalkan tujuan web dan alur evolusi           |
| Simulasi Gerbang Logika | Menguji output AND, OR, NOT, NAND, NOR, XOR, XNOR |
| Simulasi Half Adder     | Menguji SUM dan Carry                             |
| Simulasi Full Adder     | Menguji SUM dan Cout                              |
| Simulasi 4-bit Adder    | Menguji penjumlahan dua bilangan 4-bit            |
| Simulasi Subtractor     | Menguji pengurangan biner                         |
| Simulasi Multiplexer    | Menguji pemilihan output berdasarkan selector     |
| Simulasi ALU Sederhana  | Menguji operasi AND, OR, ADD, dan SUB             |
| Penjelasan Hasil        | Membantu pengguna memahami proses output          |

---

## Catatan

Project ini dibuat sebagai media pendukung pembelajaran. Web ini tidak menggantikan simulasi rangkaian digital menggunakan CircuitVerse, tetapi membantu pengguna memahami konsep input-output secara lebih sederhana, bertahap, dan interaktif.
