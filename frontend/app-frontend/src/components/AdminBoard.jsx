import { useState, useEffect } from "react";
import UserTable from "./UsersTable";
import ReservationsTable from "./ReservationsTable";
import StatisticsTable from "./StatisticsTable";
import { getAllUsers, getAllReservations } from "../services/user.service";

import classes from "./AdminBoard.module.css";

export default function AdminBoard() {
  const [users, setUsers] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [userDeleteMessage, setUserDeleteMessage] = useState("");
  const [reservationDeleteMessage, setReservationDeleteMessage] = useState("");

  const handleUserDeleteMessage = (message) => {
    setUserDeleteMessage(message);

    setTimeout(() => {
      setUserDeleteMessage("");
    }, 2500);
  };

  const handleReservationDeleteMessage = (message) => {
    setReservationDeleteMessage(message);

    setTimeout(() => {
      setReservationDeleteMessage("");
    }, 2500);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const userResponse = await getAllUsers();
        const reservationResponse = await getAllReservations();

        setUsers(userResponse.data);
        setReservations(reservationResponse.data);
      } catch (error) {
        console.error("Error while fetching data", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className={classes.adminContainer}>
      <div className={classes.userTableStat}>
        <div>
          <div className={classes.tableTitleDiv}>
            <h3 className={classes.tableTitle}>User details</h3>
            {userDeleteMessage && (
              <p className={classes.deleteMessage}>{userDeleteMessage}</p>
            )}
          </div>
          <div className={classes.scrollDiv}>
            <UserTable
              users={users}
              setUsers={setUsers}
              reservations={reservations}
              setReservations={setReservations}
              onDeleteMessage={handleUserDeleteMessage}
            />
          </div>
        </div>
        <div>
          <h3 className={classes.tableTitle}>System details</h3>
          <StatisticsTable
            users={users}
            setUsers={setUsers}
            reservations={reservations}
            setReservations={setReservations}
          />
        </div>
      </div>
      <div>
        <div className={classes.tableTitleDiv}>
          <h3 className={classes.tableTitle}>Reservation details</h3>
          {reservationDeleteMessage && (
            <p className={classes.deleteMessage}>{reservationDeleteMessage}</p>
          )}
        </div>
        <div className={classes.scrollDiv}>
          <ReservationsTable
            reservations={reservations}
            setReservations={setReservations}
            onDeleteMessage={handleReservationDeleteMessage}
          />
        </div>
      </div>
    </div>
  );
}
