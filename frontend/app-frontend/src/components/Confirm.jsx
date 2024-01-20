import classes from "./Confirm.module.css";

import PlanningPage from "../pages/PlanningPage";

export default function Confirm({
  onCloseConfirm,
  selectedData,
  onSubmitConfirm,
}) {
  function handleClose() {
    onCloseConfirm();
  }

  return (
    <div className={classes.confirmContainer}>
      <h2>Confirm your reservation</h2>
      {/*   <ul className={classes.infoList}>
        <li>
          <span className={classes.confirmItem}>Starting city: </span>
          {selectedData.startingCity}
        </li>
        <li>
          <span className={classes.confirmItem}>Destination: </span>
          {selectedData.destinationCity}
        </li>
        <li>
          <span className={classes.confirmItem}>Date: </span>
          {selectedData.date}
        </li>
        <li>
          <span className={classes.confirmItem}>
            Number of reserved seats:{" "}
          </span>
          {selectedData.numberOfSelectedSeats}
        </li>
      </ul> */}
      {/*  <p>
          <span className={classes.confirmItem}>Final price: </span>
          {selectedData.totalPrice} Ft
        </p> */}

      <p>
        {selectedData.numberOfSelectedSeats > 0
          ? `You have reserved ${selectedData.numberOfSelectedSeats}
    ${selectedData.numberOfSelectedSeats === 1 ? "seat" : "seats"} for 
    ${selectedData.totalPrice} Ft.`
          : "You haven't made any reservations yet."}
      </p>

      <div className={classes.actionButtons}>
        <button type="text" onClick={handleClose} className={classes.cancelBtn}>
          Cancel
        </button>

        <button
          className={classes.confirmBtn}
          type="button"
          onClick={onSubmitConfirm}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
