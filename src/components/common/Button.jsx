const variants = {
  primary:
    'border-linear-cta bg-linear-cta text-linear-bg shadow-primary hover:bg-linear-cta/85',
  secondary:
    'border-transparent bg-transparent text-linear-muted hover:text-linear-text',
  outline:
    'border-linear-border/70 bg-linear-surface2 text-linear-text hover:border-linear-border hover:bg-linear-line/40',
  accent:
    'border-linear-accent bg-linear-accent text-linear-onAccent hover:bg-linear-accentHover',
  danger:
    'border-linear-danger/30 bg-linear-dangerSurface text-linear-dangerText hover:bg-linear-danger/15',
};

export default function Button({
  as: Component = 'button',
  variant = 'secondary',
  className = '',
  type = 'button',
  ...props
}) {
  const typeProps = Component === 'button' ? { type } : {};

  return (
    <Component
      className={`inline-flex min-h-11 items-center justify-center rounded-full border px-4 text-sm font-medium leading-5 transition ${variants[variant]} ${className}`}
      {...typeProps}
      {...props}
    />
  );
}
