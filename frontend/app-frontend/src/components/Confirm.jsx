import React, { useEffect, useState, useRef } from "react";
import classes from "./Confirm.module.css";

/**
 * Component for confirming a reservation.
 *
 * @param {function} onCloseConfirm - Function to close the confirmation modal.
 * @param {object} selectedData - Object containing selected reservation data.
 * @param {function} onSubmitConfirm - Function to submit the reservation confirmation.
 *
 * @returns {React.ReactNode} - JSX element representing the reservation confirmation component.
 */
export default function Confirm({
  onCloseConfirm,
  selectedData,
  onSubmitConfirm,
}) {
  // State to track whether the reservation is successfully created
  const [isReservationCreated, setReservationCreated] = useState(false);

  // Check if any selected data has empty values
  const hasEmptyValues = Object.values(selectedData).some(
    (value) => value === "" || value.length === 0 || value === 0
  );

  // Ref to store timeout ID
  const timeoutIdRef = useRef(null);

  // Clear timeout when unmounting component
  useEffect(() => {
    return () => {
      clearTimeout(timeoutIdRef.current);
    };
  }, []);

  // Effect to handle auto-closing of confirmation modal after reservation is created
  useEffect(() => {
    if (isReservationCreated) {
      timeoutIdRef.current = setTimeout(() => {
        onCloseConfirm();
        setReservationCreated(false);
      }, 2000);
    }
  }, [isReservationCreated, onCloseConfirm]);

  // Handle confirm button click
  const handleConfirm = async () => {
    await onSubmitConfirm();
    setReservationCreated(true);
  };

  // JSX code representing the confirmation modal
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
