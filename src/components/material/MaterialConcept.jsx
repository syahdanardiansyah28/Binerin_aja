import Card from '../common/Card';

export default function MaterialConcept({ concept }) {
  return (
    <Card>
      <h2 className="text-xl font-medium text-linear-strong">Inti Konsep</h2>
      <p className="mt-4 text-sm leading-7 text-linear-muted md:text-base">{concept}</p>
    </Card>
  );
}
