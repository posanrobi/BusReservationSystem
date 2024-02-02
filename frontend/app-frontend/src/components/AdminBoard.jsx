import UserTable from "./UsersTable";
import ReservationsTable from "./ReservationsTable";
import StatisticsTable from "./StatisticsTable";

import classes from "./AdminBoard.module.css";

export default function AdminBoard() {
  return (
    <div className={classes.adminContainer}>
      <h2>User details</h2>
      <div className={classes.userTableStat}>
        <UserTable />
        <StatisticsTable />
      </div>
      <h2>Reservation details</h2>
      <div className={classes.scrollDiv}>
        <ReservationsTable />
      </div>
    </div>
  );
}
