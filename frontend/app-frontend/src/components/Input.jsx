import classes from "./Auth.module.css";

export default function Input({
  label,
  type,
  name,
  id,
  value,
  onChange,
  error,
}) {
  return (
    <div className={classes.labelInput}>
      <label className={classes.label} htmlFor={id}>
        {label}
      </label>
      <input
        className={classes.input}
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
      />
      {error && <div className={classes.error}>{error}</div>}
    </div>
  );
}
