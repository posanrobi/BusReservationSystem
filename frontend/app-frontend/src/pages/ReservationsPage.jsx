import React, { useEffect, useState } from "react";
import {
  getAllReservations,
  deleteReservation,
} from "../services/user.service";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../services/auth.service";
import Modal from "../components/Modal";
import TokenExpired from "../components/TokenExpired";
import DeleteWindow from "../components/DeleteWindow";

import { TbTrash, TbCalendar, TbClock, TbUser, TbCoins } from "react-icons/tb";
import { RiAddCircleLine } from "react-icons/ri";
import {
  MdOutlineDirectionsBus,
  MdAirlineSeatReclineNormal,
} from "react-icons/md";

import classes from "./ReservationPage.module.css";
import modalClasses from "../components/Modal.module.css";
import adminClasses from "../components/AdminBoard.module.css";

/**
 * Component for displaying reservations of the current user.
 *
 * @returns {JSX.Element} The ReservationsPage component.
 */
export default function ReservationsPage() {
  // State variables for storing reservations, expired token modal, deletion message and selected reservation and confirm modal
  const [reservations, setReservations] = useState([]);
  const [openTokenExpiredModal, setOpenTokenExpiredModal] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [selectedReservationId, setSelectedReservationId] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const currentUser = getCurrentUser();

  // State variable for storing the username of the current user
  const username = currentUser?.username || "";

  // Fetches reservations for the current user upon component mount or username change
  useEffect(() => {
    async function getReservations() {
      try {
        const reservationsResponse = await getAllReservations();
        const userReservations = reservationsResponse.data.filter(
          (reservation) => reservation.username === username
        );
        setReservations(userReservations);
      } catch (error) {
        if (error.message === "Your token is expired. Please login again.") {
          setOpenTokenExpiredModal(true);
        } else {
          console.error("Error while fetching data", error);
        }
      }
    }
    getReservations();
  }, [username]);

  // Delete the reservation by its ID
  const handleDelete = async (resId) => {
    setSelectedReservationId(resId);
    setShowConfirmModal(true);
  };

  // Confirm the deletion of the reservation
  const confirmDelete = async () => {
    try {
      await deleteReservation(selectedReservationId);
      setReservations((prevReservations) =>
        prevReservations.filter((res) => res.id !== selectedReservationId)
      );
      setIsDeleted(true);
    } catch (error) {
      console.error("Error deleting reservation", error);
    }
    setSelectedReservationId(null);
    setShowConfirmModal(false);
  };

  const noReservations = reservations.length === 0;

  // Sets a timeout to reset the isDeleted state after 2 seconds
  useEffect(() => {
    setTimeout(() => {
      setIsDeleted(false);
    }, 2000);
  }, [reservations]);

  // JSX structure representing the reservations
  return (
    <>
      <div className={classes.pageContainer}>
        <div className={classes.resBox}>
          <header className={classes.header}>
            <div>
              <h2 className={classes.resTitle}>Your reservations</h2>
            </div>
            {isDeleted && (
              <p className={adminClasses.deleteMessage}>
                Reservation deleted successfully!
              </p>
            )}
            <Link to="/plan" className={classes.addNew}>
              <p>New</p>
              <RiAddCircleLine />
            </Link>
          </header>
          <div className={classes.scrollDivRes}>
            <div className={classes.resBoxBody}>
              {noReservations ? (
                <div className={classes.noReservationsDiv}>
                  <p className={classes.noReservationsMessage}>
                    No reservations yet
                  </p>
                </div>
              ) : (
                reservations.map((res) => (
                  <ul key={res.id} className={classes.resDataList}>
                    <li>
                      <MdOutlineDirectionsBus className={classes.dataIcon} />
                      {res.bus_line}
                    </li>
                    <li>
                      <TbCalendar className={classes.dataIcon} />
                      {res.reservation_date}
                    </li>
                    <li>
                      <TbClock className={classes.dataIcon} />
                      {res.reservation_time.split(":").slice(0, 2).join(":")}
                    </li>
                    <li>
                      <TbUser className={classes.dataIcon} />
                      {res.seat_number}
                    </li>
                    <li>
                      <MdAirlineSeatReclineNormal
                        className={classes.dataIcon}
                      />
                      {res.selected_seats}
                    </li>
                    <li>
                      <TbCoins className={classes.dataIcon} />
                      {res.price} Ft
                    </li>
                    <span
                      className={classes.deleteIconContainer}
                      onClick={() => handleDelete(res.id)}
                    >
                      <TbTrash className={classes.deleteIcon} />
                    </span>
                  </ul>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <DeleteWindow
        open={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={confirmDelete}
      />
      {openTokenExpiredModal && (
        <Modal
          open={openTokenExpiredModal}
          className={modalClasses.modalContainer}
        >
          <TokenExpired />
        </Modal>
      )}
    </>
  );
}
