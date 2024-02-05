import { useState, useEffect } from "react";
import { deleteUser, deleteReservation } from "../services/user.service";
import { MdDelete } from "react-icons/md";

import classes from "./AdminBoard.module.css";

export default function UserTable({
  users,
  setUsers,
  reservations,
  setReservations,
  onDeleteMessage,
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const onlyUsers = users.filter((user) =>
    user.roles.some((role) => role.roleName === "ROLE_USER")
  );

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);

      const deletedUser = users.find((user) => user.id === userId);

      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== userId));

      const userReservations = reservations.filter(
        (res) => res.username === deletedUser.username
      );

      for (const reservation of userReservations) {
        await deleteReservation(reservation.id);
      }

      setReservations((prevReservations) =>
        prevReservations.filter((res) => res.username !== deletedUser.username)
      );

      setTimeout(() => {
        onDeleteMessage("User successfully deleted!");
      }, 1000);
    } catch (error) {
      console.error("Error deleting user and associated reservations", error);
    }
  };

  return (
    <table className={classes.table}>
      <thead className={classes.tableHeader}>
        <tr>
          <th>Id</th>
          <th>Firstname</th>
          <th>Lastname</th>
          <th>Username</th>
          <th>Email</th>
          <th></th>
        </tr>
      </thead>
      <tbody className={classes.tableBody}>
        {loading && (
          <tr>
            <td colSpan="6">Loading users...</td>
          </tr>
        )}
        {onlyUsers.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.firstname}</td>
            <td>{user.lastname}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>
              <MdDelete
                className={classes.deleteIcon}
                onClick={() => handleDeleteUser(user.id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
