import React from "react";
import { TbTrash } from "react-icons/tb";

import classes from "../pages/PlanningPage.module.css";

/**
 * SeatSelection component displays available seats for a selected trip and allows clearing selected seats.
 * @param {string} selectedFrom - The selected starting place.
 * @param {string} selectedTo - The selected destination place.
 * @param {string} selectedDate - The selected date.
 * @param {string} selectedTime - The selected time.
 * @param {Object} groupedDatesByLineId - Object containing grouped dates by line ID.
 * @param {Function} getLineId - Function to get the line ID based on selected from and to places.
 * @param {Function} handleClearSelectedSeats - Function to handle clearing selected seats.
 * @param {Function} renderSeats - Function to render available seats.
 * @returns {React.JSX.Element} The SeatSelection component.
 */
const SeatSelection = ({
  selectedFrom,
  selectedTo,
  selectedDate,
  selectedTime,
  groupedDatesByLineId,
  getLineId,
  handleClearSelectedSeats,
  renderSeats,
}) => {
  return (
    <div className={classes.seatsDiv} role="group">
      <div className={classes.seatsDivHeader}>
        <p>Available seats:</p>
        <span>
          <TbTrash onClick={handleClearSelectedSeats} />
        </span>
      </div>
      {!selectedTime ? (
        <div className={classes.noSeatsDiv}>
          <p className={`${classes.noItemMessage} ${classes.noSeats}`}>
            No seats available
          </p>
        </div>
      ) : (
        <div className={classes.seats}>
          {selectedFrom &&
            selectedTo &&
            selectedDate &&
            selectedTime &&
            groupedDatesByLineId[getLineId(selectedFrom, selectedTo)] &&
            groupedDatesByLineId[getLineId(selectedFrom, selectedTo)]
              .filter((date) => date.busLine)
              .slice(0, 1)
              .map((date) => {
                const busLineId = getLineId(
                  date.busLine.name.split("-")[0].trim(),
                  date.busLine.name.split("-")[1].trim()
                );
                return renderSeats(busLineId);
              })}
        </div>
      )}
    </div>
  );
};

export default SeatSelection;
