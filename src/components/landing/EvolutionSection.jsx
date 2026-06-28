import Container from '../common/Container';
import SectionTitle from '../common/SectionTitle';
import EvolutionCard from './EvolutionCard';
import { learningMaterials } from '../../data/learningMaterials';

export default function EvolutionSection() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <SectionTitle
          className="max-w-5xl"
          label="Alur Evolusi"
          title="Pelajari bagaimana beberapa rangkaian gerbang logika menjadi ALU"
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {learningMaterials.map((material) => (
            <EvolutionCard key={material.id} material={material} />
          ))}
        </div>
      </Container>
    </section>
  );
}
