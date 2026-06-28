import Button from '../components/common/Button';
import Container from '../components/common/Container';
import SectionTitle from '../components/common/SectionTitle';
import EvolutionSection from '../components/landing/EvolutionSection';
import LogicGateShowcase from '../components/landing/LogicGateShowcase';
import { simulatorTabs } from '../features/simulator/data/simulatorTabs';

export default function LandingPage({ onNavigate }) {
  return (
    <>
      <section className="relative overflow-hidden border-b border-linear-border/70">
        <Container className="grid gap-10 py-12 md:py-16 lg:grid-cols-[minmax(0,0.82fr)_minmax(520px,1.08fr)] lg:items-center">
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

          <LogicGateShowcase />
        </Container>
      </section>

      <EvolutionSection />

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
