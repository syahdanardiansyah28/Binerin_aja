const tones = {
  success: 'border-linear-success/30 bg-linear-successSurface text-linear-successText',
  warning: 'border-linear-warning/30 bg-linear-warningSurface text-linear-warningText',
  danger: 'border-linear-danger/30 bg-linear-dangerSurface text-linear-dangerText',
  neutral: 'border-linear-border/70 bg-linear-surface2 text-linear-muted',
};

export default function StatusBadge({ tone = 'neutral', children }) {
  return (
    <span className={`inline-flex min-h-8 items-center rounded-full border px-3 text-xs font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}
