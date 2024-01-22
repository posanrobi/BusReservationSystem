import { useEffect, useState } from "react";
import { getAllReservations } from "../services/user.service";
import { TbTrash, TbCalendar, TbClock, TbUser, TbCoins } from "react-icons/tb";
import { RiAddCircleLine } from "react-icons/ri";
import { MdOutlineDirectionsBus } from "react-icons/md";
import { deleteReservation } from "../services/user.service";

import classes from "./ReservationPage.module.css";
import { Link } from "react-router-dom";

export default function ReservationsPage() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    async function getReservations() {
      try {
        const reservationsResponse = await getAllReservations();
        setReservations(reservationsResponse.data);
      } catch (error) {
        console.error("Error while fetching data", error);
      }
    }

    getReservations();
  }, []);

  const handleDelete = async (resId) => {
    try {
      await deleteReservation(resId); // Törlés a backend-en

      setReservations(
        (prevReservations) => prevReservations.filter((res) => res.id !== resId) // Törlés a frontend-en
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
              <h2>Your reservations</h2>
            </div>
            <Link to="/plan" className={classes.addNew}>
              <p>New</p>
              <RiAddCircleLine />
            </Link>
          </header>
          <div className={classes.resBoxBody}>
            {noReservations ? (
              <p>No reservations yet</p>
            ) : (
              reservations.map((res) => (
                <ul key={res.id} className={classes.resDataList}>
                  <li>
                    <MdOutlineDirectionsBus />
                    {res.bus_line}
                  </li>
                  <li>
                    <TbCalendar />
                    {res.reservation_date}
                  </li>
                  <li>
                    <TbClock />
                    {res.reservation_time.split(":").slice(0, 2).join(":")}
                  </li>
                  <li>
                    <TbUser />
                    {res.seat_number}
                  </li>
                  <li>
                    <TbCoins />
                    {res.price} Ft
                  </li>
                  <span
                    className={classes.deleteIcon}
                    onClick={() => handleDelete(res.id)}
                  >
                    <TbTrash />
                  </span>
                </ul>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
