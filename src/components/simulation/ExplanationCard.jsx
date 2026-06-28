import Card from '../common/Card';

export default function ExplanationCard({ title, children }) {
  return (
    <Card>
      <h3 className="text-lg font-medium leading-6 text-white">{title}</h3>
      <div className="mt-3 text-sm leading-6 text-linear-muted">{children}</div>
    </Card>
  );
}
