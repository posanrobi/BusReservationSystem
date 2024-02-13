import classes from "./Auth.module.css";

/**
 * Input component for forms.
 * @param {string} label - The label for the input field.
 * @param {string} type - The type of the input field.
 * @param {string} name - The name of the input field.
 * @param {string} id - The id of the input field.
 * @param {string} value - The value of the input field.
 * @param {function} onChange - The function to handle changes in the input field.
 * @param {string} error - The error message to display.
 * @param {string} [placeholder=""] - The placeholder text for the input field.
 * @param {string} [className=""] - The additional CSS classes for styling.
 * @param {boolean} [disabled=false] - Applied if the input field is disabled.
 * @returns {React.JSX.Element} - JSX element representing an input field.
 */
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
