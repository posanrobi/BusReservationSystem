import { useEffect, useState } from "react";
import {
  getAllReservations,
  deleteReservation,
} from "../services/user.service";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../services/auth.service";
import Modal from "../components/Modal";
import TokenExpired from "../components/TokenExpired";

import { TbTrash, TbCalendar, TbClock, TbUser, TbCoins } from "react-icons/tb";
import { RiAddCircleLine } from "react-icons/ri";
import {
  MdOutlineDirectionsBus,
  MdAirlineSeatReclineNormal,
} from "react-icons/md";

import classes from "./ReservationPage.module.css";
import modalClasses from "../components/Modal.module.css";

export default function ReservationsPage() {
  const [reservations, setReservations] = useState([]);

  const [openModal, setOpenModal] = useState(false);

  const currentUser = getCurrentUser();
  const username = currentUser ? currentUser.username : "";

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
          setOpenModal(true);
        } else {
          console.error("Error while fetching data", error);
        }
      }
    }

    getReservations();
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

  const noReservations = reservations.length === 0;

  return (
    <>
      <div className={classes.pageContainer}>
        <div className={classes.resBox}>
          <header className={classes.header}>
            <div>
              <h2 className={classes.resTitle}>Your reservations</h2>
            </div>
            <Link to="/plan" className={classes.addNew}>
              <p>New</p>
              <RiAddCircleLine />
            </Link>
          </header>
          <div className={classes.resBoxBody}>
            {noReservations ? (
              <p className={classes.noReservationsMessage}>
                No reservations yet
              </p>
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
                    <MdAirlineSeatReclineNormal className={classes.dataIcon} />
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
      {openModal && (
        <Modal open={openModal} className={modalClasses.modalContainer}>
          <TokenExpired />
        </Modal>
      )}
    </>
  );
}
