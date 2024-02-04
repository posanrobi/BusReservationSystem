import { useState, useEffect } from "react";
import UserTable from "./UsersTable";
import ReservationsTable from "./ReservationsTable";
import StatisticsTable from "./StatisticsTable";
import { getAllUsers, getAllReservations } from "../services/user.service";

import classes from "./AdminBoard.module.css";

export default function AdminBoard() {
  const [users, setUsers] = useState([]);
  const [reservations, setReservations] = useState([]);

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
          <h3 className={classes.tableTitle}>User details</h3>
          <div className={classes.scrollDiv}>
            <UserTable
              users={users}
              setUsers={setUsers}
              reservations={reservations}
              setReservations={setReservations}
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
        <h3 className={classes.tableTitle}>Reservation details</h3>
        <div className={classes.scrollDiv}>
          <ReservationsTable
            reservations={reservations}
            setReservations={setReservations}
          />
        </div>
      </div>
    </div>
  );
}
