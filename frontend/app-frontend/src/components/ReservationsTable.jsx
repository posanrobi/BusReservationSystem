import { useState, useEffect } from "react";
import {
  deleteReservation,
  getAllReservations,
} from "../services/user.service";
import { MdDelete } from "react-icons/md";

import classes from "./AdminBoard.module.css";

export default function ReservationsTable({ reservations, setReservations }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getAllReservations();
        setReservations(response.data);
      } catch (error) {
        console.error("Error while fetching reservations", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleDelete = async (resId) => {
    try {
      await deleteReservation(resId);

      setReservations((prevReservations) =>
        prevReservations.filter((res) => res.id !== resId)
      );
    } catch (error) {
      console.error("Error deleting reservation", error);
    }
  };

  return (
    <table className={classes.table}>
      <thead className={classes.tableHeader}>
        <tr>
          <th>Id</th>
          <th>Bus line</th>
          <th>Date</th>
          <th>Time</th>
          <th>Seat(s)</th>
          <th>Price</th>
          <th>Full name</th>
          <th>Username</th>
          <th></th>
        </tr>
      </thead>

      <tbody className={classes.tableBody}>
        {loading ? (
          <tr>
            <td colSpan="9">Loading reservations...</td>
          </tr>
        ) : (
          reservations.map((res) => (
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
                <MdDelete
                  className={classes.deleteIcon}
                  onClick={() => handleDelete(res.id)}
                />
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
