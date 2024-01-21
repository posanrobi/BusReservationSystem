import { useEffect, useState } from "react";
import { getAllReservations, getAllBusLines } from "../services/user.service";
import { TbTrash, TbCalendar, TbClock, TbUser, TbCoins } from "react-icons/tb";
import { RiAddCircleLine } from "react-icons/ri";
import { MdOutlineDirectionsBus } from "react-icons/md";

import classes from "./ReservationPage.module.css";

export default function ReservationsPage() {
  const [reservations, setReservations] = useState([]);
  const [lines, setLines] = useState([]);

  useEffect(() => {
    async function getReservations() {
      try {
        const reservationsResponse = await getAllReservations();
        //const linesResponse = await getAllBusLines();

        setReservations(reservationsResponse.data);
        //setLines(linesResponse.data);

        console.log(reservationsResponse.data);
      } catch (error) {
        console.error("Error while fetching data", error);
      }
    }

    getReservations();
  }, []);

  const handleDelete = () => {};

  const getLineName = (busLineId) => {
    const busLine = lines.find((line) => line.id === busLineId);
    return busLine ? busLine.name : "";
  };

  return (
    <>
      <div className={classes.pageContainer}>
        <div className={classes.resBox}>
          <header className={classes.header}>
            <div>
              <h2>Your reservations</h2>
            </div>
            <div className={classes.addNew}>
              <p>New</p>
              <RiAddCircleLine />
            </div>
          </header>
          <div className={classes.resDiv}>
            {reservations.map((res) => (
              <ul key={res.id} className={classes.resDataList}>
                <li>
                  <MdOutlineDirectionsBus />
                  {/* {getLineName(res.bus_line_id)} */}
                  {res.bus_line}
                </li>
                <li>
                  <TbCalendar />
                  {res.reservation_date}
                </li>
                <li>
                  <TbClock />
                  {res.reservation_time}
                </li>
                <li>
                  <TbUser />
                  {res.seat_number}
                </li>
                <li>
                  <TbCoins />
                  {res.price} Ft
                </li>
                <span className={classes.deleteIcon} onClick={handleDelete}>
                  <TbTrash />
                </span>
              </ul>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
