import Card from '../components/common/Card';
import Container from '../components/common/Container';
import SectionTitle from '../components/common/SectionTitle';

const cards = [
  {
    title: 'Tujuan Aplikasi',
    content:
      'Membantu pengguna memahami ALU, operasi biner, dan gerbang logika secara visual, interaktif, dan mudah dicoba langsung.',
  },
  {
    title: 'Fitur Utama',
    content:
      'ALU Simulator, Logic Gate Simulator, Truth Table, Step By Step, BitTable, Visualisasi ALU, dan Visualisasi simbol logic gate.',
  },
  {
    title: 'Teknologi',
    content: 'React, Vite, Tailwind CSS, dan JavaScript.',
  },
  {
    title: 'Manfaat',
    content:
      'Cocok untuk belajar konsep register, carry, borrow, overflow, underflow, operasi bitwise, dan tabel kebenaran dengan tampilan modern.',
  },
];

export default function AboutPage() {
  return (
    <section className="py-8 md:py-12">
      <Container className="grid gap-8">
        <SectionTitle
          label="About Project"
          title="Binerin"
          description="Web simulator berbasis React, Vite, Tailwind CSS, dan JavaScript untuk memahami ALU, operasi biner, dan gerbang logika secara visual."
        />

        <div className="grid gap-4 md:grid-cols-2">
          {cards.map((card, index) => (
            <Card key={card.title} as="article">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="text-lg font-medium text-linear-strong">{card.title}</h3>
                <span className="font-mono text-sm text-linear-muted">0{index + 1}</span>
              </div>
              <p className="text-sm leading-7 text-linear-muted">{card.content}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
