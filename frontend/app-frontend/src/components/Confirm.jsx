import React, { useEffect, useState } from "react";
import classes from "./Confirm.module.css";

export default function Confirm({
  onCloseConfirm,
  selectedData,
  onSubmitConfirm,
}) {
  const [isReservationCreated, setReservationCreated] = useState(false);

  useEffect(() => {
    if (isReservationCreated) {
      const timeoutId = setTimeout(() => {
        onCloseConfirm();
        setReservationCreated(false);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [isReservationCreated, onCloseConfirm]);

  const hasEmptyValues = Object.values(selectedData).some(
    (value) => value === "" || value.length === 0 || value === 0
  );

  const handleConfirm = async () => {
    await onSubmitConfirm();
    setReservationCreated(true);
  };

  return (
    <div className={classes.confirmContainer}>
      <h2>Confirm your reservation</h2>
      {selectedData.numberOfSelectedSeats > 0 ? (
        <ul className={classes.infoList}>
          <li>
            <span className={classes.confirmItem}>Starting city: </span>
            {selectedData.startingCity}
          </li>
          <li>
            <span className={classes.confirmItem}>Destination city: </span>
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
        </ul>
      ) : (
        <p>You haven't made any reservations yet.</p>
      )}
      <p>
        <span className={classes.confirmItem}>Final price: </span>
        {selectedData.totalPrice} Ft
      </p>
      <div className={classes.actionButtons}>
        <button
          type="text"
          onClick={onCloseConfirm}
          className={classes.cancelBtn}
          disabled={isReservationCreated}
        >
          Cancel
        </button>

        {isReservationCreated ? (
          <p>Reservation created successfully!</p>
        ) : (
          <button
            className={classes.confirmBtn}
            type="button"
            onClick={handleConfirm}
            disabled={hasEmptyValues}
          >
            Confirm
          </button>
        )}
      </div>
    </div>
  );
}
