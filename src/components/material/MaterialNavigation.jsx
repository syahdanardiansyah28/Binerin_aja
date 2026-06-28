import Button from '../common/Button';
import Card from '../common/Card';

export default function MaterialNavigation({ material, onNavigate }) {
  return (
    <Card>
      <h2 className="text-xl font-medium text-linear-strong">Hubungan ke Tahap Berikutnya</h2>
      <p className="mt-4 text-sm leading-7 text-linear-muted md:text-base">{material.nextRelation}</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button onClick={() => onNavigate(`/simulasi?tab=${material.simulationTab}`)}>Coba Simulasi</Button>
        <Button variant="outline" onClick={() => onNavigate('/')}>Kembali ke Alur Evolusi</Button>
      </div>
    </Card>
  );
}
