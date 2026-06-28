export default function StatCard({ label, value, tone = 'default' }) {
  const valueColor = tone === 'danger' ? 'text-red-100' : tone === 'success' ? 'text-emerald-100' : 'text-linear-text';

  return (
    <div className="min-w-0 rounded-md border border-white/10 bg-white/[0.02] p-3">
      <p className="text-xs leading-5 text-linear-muted">{label}</p>
      <p className={`mt-2 break-words font-mono text-xl leading-6 ${valueColor}`}>{value}</p>
    </div>
  );
}
