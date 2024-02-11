import React from "react";
import { FaSquare } from "react-icons/fa";

import classes from "../pages/PlanningPage.module.css";

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
