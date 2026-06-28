export default function Card({ as: Component = 'section', className = '', children }) {
  return (
    <Component className={`min-w-0 rounded-lg border border-linear-border/70 bg-linear-surface p-4 text-linear-text md:p-6 ${className}`}>
      {children}
    </Component>
  );
}
