import React from "react";
import { TbTrash } from "react-icons/tb";

import classes from "../pages/PlanningPage.module.css";

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
    <div className={classes.seatsDiv}>
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
