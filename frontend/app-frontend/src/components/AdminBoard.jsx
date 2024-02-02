import UserTable from "./UsersTable";

import classes from "./AdminBoard.module.css";
import ReservationsTable from "./ReservationsTable";

export default function AdminBoard() {
  return (
    <div className={classes.adminContainer}>
      <h2>User details</h2>
      <div className={classes.userTableStat}>
        <UserTable />
        <table className={classes.table}>
          <thead className={classes.tableHeader}>
            <tr>
              <th>System statistics</th>
              <th></th>
            </tr>
          </thead>
          <tbody className={classes.tableBody}>
            <tr>
              <td>Number of users</td>
              <td></td>
            </tr>
            <tr>
              <td>Number of reservations</td>
              <td></td>
            </tr>
            <tr>
              <td>All reserved seats</td>
              <td></td>
            </tr>
            <tr>
              <td>Amount of reservation prices</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2>Reservation details</h2>
      <ReservationsTable />
    </div>
  );
}

// user_roles - USER - reservations
