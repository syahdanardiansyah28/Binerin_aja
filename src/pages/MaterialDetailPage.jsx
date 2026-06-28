import Button from '../components/common/Button';
import Container from '../components/common/Container';
import MaterialConcept from '../components/material/MaterialConcept';
import MaterialExample from '../components/material/MaterialExample';
import MaterialFormula from '../components/material/MaterialFormula';
import MaterialHero from '../components/material/MaterialHero';
import MaterialNavigation from '../components/material/MaterialNavigation';
import { findLearningMaterial } from '../data/learningMaterials';

export default function MaterialDetailPage({ slug, onNavigate }) {
  const material = findLearningMaterial(slug);

  if (!material) {
    return (
      <section className="py-8 md:py-12">
        <Container className="grid gap-5">
          <div className="rounded-lg border border-linear-border/70 bg-linear-surface p-6">
            <p className="font-mono text-sm text-linear-muted">Materi</p>
            <h1 className="mt-3 text-3xl font-medium text-linear-strong">Materi tidak ditemukan</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-linear-muted">
              Halaman materi yang kamu buka belum tersedia atau slug-nya tidak sesuai.
            </p>
            <Button className="mt-6" onClick={() => onNavigate('/')}>Kembali ke Beranda</Button>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-8 md:py-12">
      <Container className="grid gap-6">
        <nav className="flex flex-wrap items-center gap-2 text-sm text-linear-muted" aria-label="Breadcrumb">
          <button className="hover:text-linear-text" type="button" onClick={() => onNavigate('/')}>
            Beranda
          </button>
          <span>/</span>
          <span>Materi</span>
          <span>/</span>
          <span className="text-linear-text" aria-current="page">{material.title}</span>
        </nav>

        <MaterialHero material={material} />

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start">
          <div className="grid gap-5">
            <MaterialConcept concept={material.concept} />
            <MaterialFormula formula={material.formula} />
            <MaterialExample example={material.example} />
          </div>
          <MaterialNavigation material={material} onNavigate={onNavigate} />
        </div>
      </Container>
    </section>
  );
}
