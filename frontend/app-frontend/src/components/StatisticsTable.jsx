import { useState, useEffect } from "react";

import classes from "./AdminBoard.module.css";

/**
 * StatisticsTable component displays summary statistics about users and reservations.
 * @param {Object[]} users - The array of users.
 * @param {Object[]} reservations - The array of reservations.
 * @returns {React.JSX.Element} The StatisticsTable component.
 */
export default function StatisticsTable({ users, reservations }) {
  /**
   * State variables for managing total statistics.
   */
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalReservations, setTotalReservations] = useState(0);
  const [totalReservedSeats, setTotalReservedSeats] = useState(0);
  const [totalReservationPrices, setTotalReservationPrices] = useState(0);

  /**
   * Effect hook to update total statistics based on the provided users and reservations.
   */
  useEffect(() => {
    const onlyUsers = users.filter((user) =>
      user.roles.some((role) => role.roleName === "ROLE_USER")
    );

    const calculatedTotalUsers = onlyUsers.length;
    const calculatedTotalReservations = reservations.length;
    const calculatedTotalReservedSeats = reservations.reduce(
      (total, reservation) => total + reservation.seat_number,
      0
    );
    const calculatedTotalReservationPrices = reservations.reduce(
      (total, reservation) => total + reservation.price,
      0
    );

    setTotalUsers(calculatedTotalUsers);
    setTotalReservations(calculatedTotalReservations);
    setTotalReservedSeats(calculatedTotalReservedSeats);
    setTotalReservationPrices(calculatedTotalReservationPrices);
  }, [users, reservations]);

  return (
    <table className={classes.table}>
      <thead className={classes.tableHeader}>
        <tr>
          <th>Summary statistics</th>
          <th></th>
        </tr>
      </thead>
      <tbody className={classes.tableBody}>
        <tr>
          <td>Number of users</td>
          <td>{totalUsers}</td>
        </tr>
        <tr>
          <td>Number of reservations</td>
          <td>{totalReservations}</td>
        </tr>
        <tr>
          <td>All reserved seats</td>
          <td>{totalReservedSeats}</td>
        </tr>
        <tr>
          <td>Total revenue</td>
          <td>{totalReservationPrices} Ft</td>
        </tr>
      </tbody>
    </table>
  );
}
