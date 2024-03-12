import React from "react";
import { FaSquare } from "react-icons/fa";

import classes from "../pages/PlanningPage.module.css";

/**
 * Component for displaying details and calculating the total
 * price of selected seats and the busline's seatprice.
 * @param {Array} busLines - An array of bus lines.
 * @param {string} selectedFrom - The selected starting place.
 * @param {string} selectedTo - The selected destination place.
 * @param {function} getLineId - Function to get the ID of the selected bus line.
 * @param {function} calculateTotalPrice - Function to calculate the total price of selected seats.
 * @param {Array} selectedSeats - An array of selected seats.
 * @returns {React.JSX.Element} - JSX element representing the details and total price section.
 */
const DetailsSelection = ({
  busLines,
  selectedFrom,
  selectedTo,
  getLineId,
  calculateTotalPrice,
  selectedSeats,
}) => {
  return (
    <div className={classes.detailsDiv}>
      <ul>
        <li>
          Free <FaSquare className={classes.greenIndicatorIcon} />
        </li>
        <li>
          Booked <FaSquare className={classes.redIndicatorIcon} />
        </li>
        <li>
          Selected <FaSquare className={classes.blackIndicatorIcon} />
        </li>
      </ul>

      {/* PRICE */}
      <label>
        <div className={classes.priceDiv}>
          <p className={classes.seatPrice}>Seat price:</p>
          {busLines.map((busLine) => {
            const selectedLine = getLineId(selectedFrom, selectedTo);

            if (busLine.id === selectedLine) {
              return <p key={busLine.id}>{busLine.price} Ft</p>;
            }
            return null;
          })}
          {!selectedTo && <p className={classes.noPrice}>0 Ft</p>}
        </div>
      </label>

      {/* TOTAL */}
      <div className={classes.totalDiv}>
        <p className={classes.totalPrice}>Total price:</p>
        <p>{calculateTotalPrice(selectedSeats, busLines)} Ft</p>
      </div>
    </div>
  );
};

export default DetailsSelection;
