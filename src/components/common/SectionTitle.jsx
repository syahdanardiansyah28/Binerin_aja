export default function SectionTitle({ label, title, description, className = '' }) {
  return (
    <div className={`max-w-3xl ${className}`}>
      {label && <p className="font-mono text-xs text-linear-muted">{label}</p>}
      <h2 className="mt-2 text-3xl font-medium leading-tight text-white md:text-5xl">{title}</h2>
      {description && <p className="mt-4 text-base leading-6 text-linear-muted">{description}</p>}
    </div>
  );
}
