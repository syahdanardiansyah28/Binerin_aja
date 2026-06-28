const tones = {
  success: 'border-emerald-300/25 bg-emerald-300/10 text-emerald-100',
  warning: 'border-yellow-300/25 bg-yellow-300/10 text-yellow-100',
  danger: 'border-red-300/25 bg-red-300/10 text-red-100',
  neutral: 'border-white/10 bg-white/[0.03] text-linear-muted',
};

export default function StatusBadge({ tone = 'neutral', children }) {
  return (
    <span className={`inline-flex min-h-8 items-center rounded-full border px-3 text-xs font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}
