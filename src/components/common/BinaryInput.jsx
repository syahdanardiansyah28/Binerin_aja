import { sanitizeBinary } from '../../utils/binary';

export default function BinaryInput({
  label,
  value,
  onChange,
  maxLength = 16,
  placeholder = '0101',
  disabled = false,
  error = '',
}) {
  const handleChange = (event) => {
    onChange(sanitizeBinary(event.target.value, maxLength));
  };

  return (
    <label className={`block min-w-0 text-sm text-linear-muted ${disabled ? 'opacity-50' : ''}`}>
      <span>{label}</span>
      <input
        className="mt-2 h-12 w-full rounded-md border border-white/10 bg-white/[0.02] px-3 font-mono text-base text-linear-text outline-none transition placeholder:text-linear-subtle focus:border-linear-accent disabled:cursor-not-allowed"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        maxLength={maxLength}
        inputMode="numeric"
        pattern="[01]*"
        disabled={disabled}
        autoComplete="off"
        spellCheck="false"
      />
      {error && <span className="mt-2 block text-xs leading-5 text-red-200">{error}</span>}
    </label>
  );
}
