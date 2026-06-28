export default function StatCard({ label, value, tone = 'default' }) {
  const valueColor = tone === 'danger' ? 'text-linear-dangerText' : tone === 'success' ? 'text-linear-successText' : 'text-linear-text';

  return (
    <div className="min-w-0 rounded-md border border-linear-border/70 bg-linear-surface2 p-3">
      <p className="text-xs leading-5 text-linear-muted">{label}</p>
      <p className={`mt-2 break-words font-mono text-xl leading-6 ${valueColor}`}>{value}</p>
    </div>
  );
}
