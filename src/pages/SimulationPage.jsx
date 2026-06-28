import { useEffect, useMemo, useState } from 'react';
import Container from '../components/common/Container';
import SectionTitle from '../components/common/SectionTitle';
import SimulationTabs from '../components/simulation/SimulationTabs';
import AluSimulator from '../features/simulator/components/AluSimulator';
import CircuitBuilderSimulator from '../features/simulator/components/CircuitBuilderSimulator';
import FourBitAdderSimulator from '../features/simulator/components/FourBitAdderSimulator';
import FullAdderSimulator from '../features/simulator/components/FullAdderSimulator';
import HalfAdderSimulator from '../features/simulator/components/HalfAdderSimulator';
import LogicGateSimulator from '../features/simulator/components/LogicGateSimulator';
import MultiplexerSimulator from '../features/simulator/components/MultiplexerSimulator';
import SubtractorSimulator from '../features/simulator/components/SubtractorSimulator';
import { simulatorTabs } from '../features/simulator/data/simulatorTabs';

const simulatorByTab = {
  'logic-gates': LogicGateSimulator,
  'half-adder': HalfAdderSimulator,
  'full-adder': FullAdderSimulator,
  'four-bit-adder': FourBitAdderSimulator,
  subtractor: SubtractorSimulator,
  multiplexer: MultiplexerSimulator,
  alu: AluSimulator,
  'circuit-builder': CircuitBuilderSimulator,
};

function readInitialTab(search = '') {
  const params = new URLSearchParams(search);
  const tab = params.get('tab');
  return simulatorByTab[tab] ? tab : 'logic-gates';
}

export default function SimulationPage({ search = '' }) {
  const [activeTab, setActiveTab] = useState(() => readInitialTab(search));
  const ActiveSimulator = useMemo(() => simulatorByTab[activeTab] || LogicGateSimulator, [activeTab]);

  useEffect(() => {
    setActiveTab(readInitialTab(search));
  }, [search]);

  return (
    <section className="py-8 md:py-12">
      <Container className="grid gap-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <SectionTitle
            label="Simulation Workspace"
            title="Simulasi digital modular."
            description="Pilih fitur, ubah input biner, lalu baca output dan tabel prosesnya."
          />
        </div>

        <SimulationTabs tabs={simulatorTabs} activeTab={activeTab} onChange={setActiveTab} />
        <ActiveSimulator />
      </Container>
    </section>
  );
}
