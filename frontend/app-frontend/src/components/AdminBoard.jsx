import UserTable from "./UsersTable";
import ReservationsTable from "./ReservationsTable";
import StatisticsTable from "./StatisticsTable";

import classes from "./AdminBoard.module.css";

export default function AdminBoard() {
  return (
    <div className={classes.adminContainer}>
      <div className={classes.userTableStat}>
        <div>
          <h3 className={classes.tableTitle}>User details</h3>
          <div className={classes.scrollDiv}>
            <UserTable />
          </div>
        </div>
        <div>
          <h3 className={classes.tableTitle}>System details</h3>
          <StatisticsTable />
        </div>
      </div>
      <div>
        <h3 className={classes.tableTitle}>Reservation details</h3>
        <div className={classes.scrollDiv}>
          <ReservationsTable />
        </div>
      </div>
    </div>
  );
}
