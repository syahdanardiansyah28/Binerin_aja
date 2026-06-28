import Card from '../common/Card';
import StatusBadge from '../common/StatusBadge';

export default function OutputPanel({ title = 'Output', status = 'Success', tone = 'success', children }) {
  return (
    <Card>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-lg font-medium leading-6 text-linear-strong">{title}</h3>
        <StatusBadge tone={tone}>{status}</StatusBadge>
      </div>
      {children}
    </Card>
  );
}
