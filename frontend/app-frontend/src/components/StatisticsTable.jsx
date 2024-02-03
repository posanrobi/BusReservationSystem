import { useState, useEffect } from "react";
import { getAllUsers, getAllReservations } from "../services/user.service";

import classes from "./AdminBoard.module.css";

export default function StatisticsTable() {
  const [users, setUsers] = useState([]);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const usersResponse = await getAllUsers();
        setUsers(usersResponse.data);

        const reservationsResponse = await getAllReservations();
        setReservations(reservationsResponse.data);
      } catch (error) {
        console.error("Error while fetching data", error);
      }
    }

    fetchData();
  }, []);

  const onlyUsers = users.filter((user) =>
    user.roles.some((role) => role.roleName === "ROLE_USER")
  );

  const totalReservedSeats = reservations.reduce(
    (total, reservation) => total + reservation.seat_number,
    0
  );

  const totalReservationPrices = reservations.reduce(
    (total, reservation) => total + reservation.price,
    0
  );

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
          <td>{onlyUsers.length}</td>
        </tr>
        <tr>
          <td>Number of reservations</td>
          <td>{reservations.length}</td>
        </tr>
        <tr>
          <td>All reserved seats</td>
          <td>{totalReservedSeats}</td>
        </tr>
        <tr>
          <td>Amount of reservation prices</td>
          <td>{totalReservationPrices} Ft</td>
        </tr>
      </tbody>
    </table>
  );
}
