import { useState, useEffect } from "react";
import {
  deleteReservation,
  getAllReservations,
} from "../services/user.service";
import DeleteWindow from "./DeleteWindow";
import { MdDelete } from "react-icons/md";

import classes from "./AdminBoard.module.css";

/**
 * ReservationsTable component displays a table of reservations with options to delete individual reservations.
 * @param {Object[]} reservations - An array of reservation objects containing reservation details.
 * @param {Function} setReservations - A function to update the reservations state.
 * @param {Function} onDeleteMessage - A function to display a message upon successful deletion of a reservation.
 * @returns {React.JSX.Element} The ReservationsTable component.
 */
export default function ReservationsTable({
  reservations,
  setReservations,
  onDeleteMessage,
}) {
  /**
   * States for managing loading state, reservationId and confirm modal visibility.
   */
  const [loading, setLoading] = useState(true);
  const [selectedReservationId, setSelectedReservationId] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  /**
   * Fetch reservations data on component mount.
   */
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
  });

  /**
   * Function to handle deletion of a reservation.
   * @param {string} resId - The ID of the reservation to be deleted.
   */
  const handleDelete = async (resId) => {
    setSelectedReservationId(resId);
    setShowConfirmModal(true);
  };

  /**
   * Function to confirm deletion of a reservation.
   */
  const confirmDelete = async () => {
    try {
      await deleteReservation(selectedReservationId);

      setReservations((prevReservations) =>
        prevReservations.filter((res) => res.id !== selectedReservationId)
      );

      setTimeout(() => {
        onDeleteMessage("Reservation successfully deleted!");
      }, 1000);
    } catch (error) {
      console.error("Error deleting reservation", error);
    }
    setSelectedReservationId(null);
    setShowConfirmModal(false);
  };

  /**
   * Check if there are no reservations.
   * @type {boolean} noReservations - Indicates whether there are no reservations.
   */
  const noReservations = reservations.length === 0;

  return (
    <>
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
          {noReservations && (
            <tr>
              <td colSpan="9">No reservations available</td>
            </tr>
          )}
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
      <DeleteWindow
        open={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={confirmDelete}
      />
    </>
  );
}
