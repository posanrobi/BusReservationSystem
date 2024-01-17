import classes from "./Confirm.module.css";

export default function Confirm({ onCloseConfirm }) {
  function handleClose() {
    onCloseConfirm();
  }

  return (
    <div className={classes.confirmContainer}>
      <h2>Confirm your reservation</h2>
      <ul>
        <li>starting</li>
        <li>destination</li>
        <li>date</li>
        <li>seats</li>
      </ul>
      <p>Final price: </p>
      <div className={classes.actionButtons}>
        <button type="text" onClick={handleClose} className={classes.cancelBtn}>
          Cancel
        </button>
        <button className={classes.confirmBtn}>Confirm</button>
      </div>
    </div>
  );
}
