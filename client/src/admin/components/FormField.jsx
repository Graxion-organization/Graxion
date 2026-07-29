import './FormField.css';

export default function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required,
  error,
  options, // for select
  rows = 3, // for textarea
  icon: Icon,
  hint,
  disabled,
  min,
  max,
  step,
}) {
  const id = `field-${name}`;

  const inputProps = {
    id,
    name,
    value: value || '',
    onChange,
    placeholder,
    required,
    disabled,
    className: `admin-field-input ${error ? 'has-error' : ''}`,
  };

  return (
    <div className={`admin-field ${error ? 'error' : ''}`}>
      {label && (
        <label htmlFor={id} className="admin-field-label">
          {Icon && <Icon size={14} />}
          {label}
          {required && <span className="admin-field-required">*</span>}
        </label>
      )}

      {type === 'select' ? (
        <select {...inputProps}>
          <option value="">{placeholder || 'Select...'}</option>
          {options?.map((opt) => (
            <option key={opt.value || opt} value={opt.value || opt}>
              {opt.label || opt}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea {...inputProps} rows={rows} />
      ) : (
        <input {...inputProps} type={type} min={min} max={max} step={step} />
      )}

      {error && <span className="admin-field-error">{error}</span>}
      {hint && !error && <span className="admin-field-hint">{hint}</span>}
    </div>
  );
}
