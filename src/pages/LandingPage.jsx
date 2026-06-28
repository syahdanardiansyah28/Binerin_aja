import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Container from '../components/common/Container';
import SectionTitle from '../components/common/SectionTitle';
import { evolutionSteps } from '../features/simulator/data/evolutionSteps';
import { simulatorTabs } from '../features/simulator/data/simulatorTabs';

export default function LandingPage({ onNavigate }) {
  return (
    <>
      <section className="relative overflow-hidden border-b border-linear-border/70">
        <Container className="grid gap-10 py-12 md:py-16 lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,1fr)] lg:items-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-medium leading-none text-linear-strong md:text-6xl">
              Binerin
            </h1>
            <p className="mt-5 text-base leading-7 text-linear-muted md:text-lg">
              Binerin dibuat untuk mempelajari bagaimana gerbang logika berkembang menjadi Half Adder, Full Adder, 4-bit Adder, Subtractor, Multiplexer, hingga ALU sederhana.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button variant="primary" onClick={() => onNavigate('/simulasi')}>Mulai Simulasi</Button>
            </div>
          </div>

          <CircuitPreview />
        </Container>
      </section>

      <section className="py-12 md:py-16">
        <Container>
          <SectionTitle
            label="Alur Evolusi"
            title="Dari operasi 1 bit ke unit komputasi kecil."
            description="Setiap tahap dibuat sebagai modul terpisah supaya mudah dipelajari, diperbaiki, atau dikembangkan."
          />

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {evolutionSteps.map((step, index) => (
              <Card key={step.title} as="article" className="p-4">
                <span className="font-mono text-sm text-linear-muted">0{index + 1}</span>
                <h3 className="mt-4 text-lg font-medium text-linear-strong">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-linear-muted">{step.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-linear-border/70 py-12 md:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1fr] lg:items-start">
            <SectionTitle
              label="Fitur Simulasi"
              title="Semua fitur dibuat sebagai komponen mandiri."
              description="Tab simulasi memanggil komponen dan logic terpisah, sehingga perubahan satu fitur tidak perlu menyentuh fitur lain."
            />
            <div className="grid gap-3 sm:grid-cols-2">
              {simulatorTabs.slice(0, 7).map((tab) => (
                <button
                  key={tab.id}
                  className="min-h-14 rounded-lg border border-linear-border/70 bg-linear-surface px-4 text-left text-sm text-linear-muted transition hover:bg-linear-surface2 hover:text-linear-text"
                  type="button"
                  onClick={() => onNavigate('/simulasi')}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function CircuitPreview() {
  const nodes = [
    ['A', '0101'],
    ['B', '0011'],
    ['Gate', 'XOR'],
    ['Adder', '1000'],
    ['ALU', 'ADD'],
  ];

  return (
    <div className="relative min-h-[360px] overflow-hidden rounded-lg border border-linear-border/70 bg-linear-surface p-5">
      <div className="absolute inset-x-0 top-1/2 h-px bg-linear-accent/40" />
      <div className="relative grid h-full grid-cols-1 gap-4 sm:grid-cols-5 sm:items-center">
        {nodes.map(([label, value], index) => (
          <div key={label} className="relative rounded-lg border border-linear-border/70 bg-linear-surface2 p-4">
            <p className="font-mono text-xs text-linear-muted">{label}</p>
            <p className="mt-3 break-all font-mono text-2xl text-linear-strong">{value}</p>
            {index < nodes.length - 1 && (
              <span className="absolute -bottom-4 left-1/2 font-mono text-linear-muted sm:-right-5 sm:bottom-auto sm:left-auto sm:top-1/2">
                -&gt;
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
