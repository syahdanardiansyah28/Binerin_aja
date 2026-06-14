const guides = [
  {
    title: 'Cara menggunakan ALU Simulator',
    items: [
      'Masukkan Register A dan Register B dalam bentuk biner.',
      'Pilih operasi seperti ADD, SUB, INC, DEC, AND, OR, XOR, atau NOT.',
      'Klik Proses, lalu lihat Output Result, Step By Step, dan BitTable.',
    ],
  },
  {
    title: 'Cara menggunakan Logic Gate Simulator',
    items: [
      'Masukkan Input A dan Input B dengan nilai 0 atau 1.',
      'Pilih gate: AND, OR, XOR, NAND, NOR, XNOR, atau NOT.',
      'Untuk NOT, aplikasi hanya memakai Input A.',
      'Lihat output, simbol gate, penjelasan, dan truth table mini.',
    ],
  },
  {
    title: 'Cara membaca Truth Table',
    items: [
      'Setiap baris menunjukkan kombinasi input yang mungkin.',
      'Kolom Output menunjukkan hasil gate untuk kombinasi tersebut.',
      'Gate dua input memakai A dan B, sedangkan NOT hanya memakai A.',
    ],
  },
  {
    title: 'Tips input biner',
    items: [
      'Gunakan hanya angka 0 dan 1.',
      'Panjang Register A dan B boleh berbeda untuk operasi dua register.',
      'INC, DEC, dan NOT hanya memakai panjang Register A.',
    ],
  },
];

const terms = [
  ['Carry', 'Keluaran tambahan saat hasil penjumlahan melewati bitWidth.'],
  ['Borrow', 'Pinjaman saat pengurangan membutuhkan nilai dari bit di sebelah kiri.'],
  ['Overflow', 'Kondisi hasil ADD atau INC melewati kapasitas bitWidth.'],
  ['Underflow', 'Kondisi hasil SUB atau DEC bernilai negatif dalam konteks unsigned.'],
  ['BitTable', 'Tabel proses per bit yang menampilkan carry, borrow, dan hasil tiap posisi bit.'],
  ['Logic Gate', 'Gerbang digital yang mengolah input 0/1 menjadi output 0/1.'],
];

export default function HelpPage() {
  return (
    <div className="mx-auto grid max-w-7xl gap-5">
      <section className="cpu-card rounded p-5 sm:p-6">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-200/70">User Guide</p>
        <h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">Help</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
          Panduan cepat untuk memakai simulator ALU, logic gate, dan truth table di Binerin Aja.
        </p>
      </section>

      <div className="grid gap-5 lg:grid-cols-[1fr_420px]">
        <div className="grid gap-5 md:grid-cols-2">
          {guides.map((guide) => (
            <section key={guide.title} className="cpu-card rounded p-5">
              <h3 className="text-lg font-semibold text-white">{guide.title}</h3>
              <ul className="mt-4 grid gap-3 text-sm leading-6 text-slate-300">
                {guide.items.map((item) => (
                  <li key={item} className="rounded border border-white/10 bg-white/[0.03] p-3">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <section className="cpu-card rounded p-5">
          <h3 className="text-lg font-semibold text-white">Istilah Penting</h3>
          <div className="mt-4 grid gap-3">
            {terms.map(([term, description]) => (
              <div key={term} className="rounded border border-cyan-300/15 bg-cyan-300/[0.04] p-3">
                <p className="font-mono text-sm font-bold text-cyan-100">{term}</p>
                <p className="mt-1 text-sm leading-6 text-slate-300">{description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
