import classes from "./Auth.module.css";

export default function Input({
  label,
  type,
  name,
  id,
  value,
  onChange,
  error,
  placeholder = "",
  className = "",
  disabled = false,
}) {
  return (
    <div className={classes.labelInput}>
      <label className={classes.label} htmlFor={id}>
        {label}
      </label>
      <input
        className={className}
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
      />
      {error && <div className={classes.error}>{error}</div>}
    </div>
  );
}
