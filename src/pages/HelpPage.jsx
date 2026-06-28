import Card from '../components/common/Card';
import Container from '../components/common/Container';
import SectionTitle from '../components/common/SectionTitle';

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
    <section className="py-8 md:py-12">
      <Container className="grid gap-8">
        <SectionTitle
          label="User Guide"
          title="Bantuan"
          description="Ringkasan cara membaca simulator ALU, logic gate, dan tabel proses di Binerin."
        />

        <div className="grid gap-5 lg:grid-cols-[1fr_420px]">
          <div className="grid gap-4 md:grid-cols-2">
            {guides.map((guide) => (
              <Card key={guide.title} as="article">
                <h3 className="text-lg font-medium text-white">{guide.title}</h3>
                <ul className="mt-4 grid gap-3 text-sm leading-6 text-linear-muted">
                  {guide.items.map((item) => (
                    <li key={item} className="rounded-md border border-white/10 bg-white/[0.02] p-3">
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          <Card>
            <h3 className="text-lg font-medium text-white">Istilah Penting</h3>
            <div className="mt-4 grid gap-3">
              {terms.map(([term, description]) => (
                <div key={term} className="rounded-md border border-white/10 bg-white/[0.02] p-3">
                  <p className="font-mono text-sm text-linear-text">{term}</p>
                  <p className="mt-1 text-sm leading-6 text-linear-muted">{description}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
}
