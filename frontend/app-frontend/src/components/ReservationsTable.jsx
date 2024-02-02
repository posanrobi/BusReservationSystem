import { useState, useEffect } from "react";
import { getAllReservations } from "../services/user.service";

import classes from "./AdminBoard.module.css";

export default function ReservationsTable() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getAllReservations();
        setReservations(response.data);
      } catch (error) {
        console.error("Error while fetching reservations", error);
      }
    }

    fetchData();
  }, []);

  return (
    <table className={classes.table}>
      <thead className={classes.tableHeader}>
        <tr>
          <th>Id</th>
          <th>Bus line</th>
          <th>Date</th>
          <th>Time</th>
          <th>Rserved seats</th>
          <th>Price</th>
          <th>Full name</th>
          <th>Username</th>
          <th></th>
        </tr>
      </thead>
      <tbody className={classes.tableBody}>
        {reservations.map((res) => (
          <tr key={res.id}>
            <td>{res.id}</td>
            <td>{res.bus_line}</td>
            <td>{res.reservation_date}</td>
            <td>{res.reservation_time.split(":").slice(0, 2).join(":")}</td>
            <td>{res.seat_number}</td>
            <td>{res.price} Ft</td>
            <td>{res.user}</td>
            <td>{res.username}</td>
            <td>
              <button className={classes.deleteBtn}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
