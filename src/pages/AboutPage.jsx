import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Container from '../components/common/Container';
import SectionTitle from '../components/common/SectionTitle';
import { aboutCards, aboutCta, aboutHero } from '../data/aboutContent';

export default function AboutPage({ onNavigate }) {
  return (
    <section className="py-8 md:py-12">
      <Container className="grid gap-8 md:gap-10">
        <SectionTitle label={aboutHero.eyebrow} title={aboutHero.title} description={aboutHero.description} />

        <div className="grid gap-4 md:grid-cols-2">
          {aboutCards.map((card) => (
            <AboutCard key={card.number} card={card} />
          ))}
        </div>

        <Card className="grid gap-5 border-linear-accent/40 bg-linear-surface2 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <div>
            <p className="font-mono text-xs text-linear-muted">Next Step</p>
            <h3 className="mt-2 text-2xl font-medium leading-tight text-linear-strong md:text-3xl">{aboutCta.title}</h3>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-linear-muted md:text-base">{aboutCta.description}</p>
          </div>
          <Button className="w-full md:w-auto" variant="primary" onClick={() => onNavigate(aboutCta.buttonHref)}>
            {aboutCta.buttonLabel}
          </Button>
        </Card>
      </Container>
    </section>
  );
}

function AboutCard({ card }) {
  return (
    <Card as="article" className="transition hover:border-linear-accent/50 hover:bg-linear-surface2">
      <div className="mb-4 flex items-start justify-between gap-4">
        <h3 className="text-lg font-medium leading-6 text-linear-strong">{card.title}</h3>
        <span className="shrink-0 font-mono text-sm text-linear-muted">{card.number}</span>
      </div>
      <p className="text-sm leading-7 text-linear-muted">{card.description}</p>
    </Card>
  );
}
