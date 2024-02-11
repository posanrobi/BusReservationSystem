import React from "react";

import classes from "../pages/PlanningPage.module.css";

const TripSelection = ({
  busLines,
  selectedFrom,
  selectedTo,
  selectedDate,
  selectedTime,
  handleSelectFromChange,
  handleSelectToChange,
  handleSelectDateChange,
  handleSelectTimeChange,
  getLineId,
  groupedDatesByLineId,
  groupedTimesByLineId,
}) => {
  return (
    <div className={classes.tripDiv}>
      <h2>Plan your travel</h2>

      {/* FROM */}
      <label>
        From:
        <div className={classes.dropDownBox}>
          <select
            className={classes.select}
            onChange={handleSelectFromChange}
            value={selectedFrom}
          >
            <option value="" disabled>
              Choose starting place
            </option>
            {Array.from(
              new Set(
                busLines.map((busLine) => busLine.name.split("-")[0].trim())
              )
            )
              .sort()
              .map((startingPlace) => (
                <option key={startingPlace} value={startingPlace}>
                  {startingPlace}
                </option>
              ))}
          </select>
        </div>
      </label>

      {/* TO */}
      <label>
        To:
        <div className={classes.dropDownBox}>
          <select
            className={classes.select}
            onChange={handleSelectToChange}
            value={selectedTo}
          >
            <option value="" disabled>
              Choose destination place
            </option>
            {busLines
              .filter(
                (busLine) => busLine.name.split("-")[0].trim() === selectedFrom
              )
              .sort((a, b) => {
                const cityA = a.name.split("-")[1].trim();
                const cityB = b.name.split("-")[1].trim();
                return cityA.localeCompare(cityB);
              })
              .map((busLine) => (
                <option
                  key={busLine.id}
                  value={busLine.name.split("-")[1].trim()}
                >
                  {busLine.name.split("-")[1].trim()}
                </option>
              ))}
          </select>
        </div>
      </label>

      {/* DATE */}
      <label>
        Available dates:
        <div className={classes.dropDownBox}>
          <select
            className={classes.select}
            onChange={handleSelectDateChange}
            value={selectedDate}
          >
            <option value="" disabled>
              Choose a date
            </option>

            {selectedTo &&
              Array.from(
                new Set(
                  groupedDatesByLineId[
                    getLineId(selectedFrom, selectedTo)
                  ]?.map((date) => date.date) || []
                )
              )
                .sort()
                .map((date) => (
                  <option key={date} value={date}>
                    {date}
                  </option>
                ))}
          </select>
        </div>
      </label>

      {/* TIME */}
      <label>
        Available times:
        <div className={classes.dropDownBox}>
          <select
            className={classes.select}
            onChange={handleSelectTimeChange}
            value={selectedTime}
          >
            <option value="" disabled>
              Choose a time
            </option>

            {selectedDate &&
              Array.from(
                new Set(
                  groupedTimesByLineId[
                    getLineId(selectedFrom, selectedTo)
                  ]?.map((time) => time) || []
                )
              )
                .sort()
                .map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
          </select>
        </div>
      </label>
    </div>
  );
};

export default TripSelection;
