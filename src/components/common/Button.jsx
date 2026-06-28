const variants = {
  primary:
    'border-linear-cta bg-linear-cta text-linear-bg shadow-primary hover:bg-white',
  secondary:
    'border-transparent bg-transparent text-linear-muted hover:text-linear-text',
  outline:
    'border-white/10 bg-white/[0.02] text-linear-text hover:border-white/20 hover:bg-white/[0.05]',
  accent:
    'border-linear-accent bg-linear-accent text-white hover:bg-linear-accentHover',
  danger:
    'border-red-400/30 bg-red-400/10 text-red-100 hover:bg-red-400/15',
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
