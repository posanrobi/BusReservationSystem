import { useState, useEffect } from "react";
import { deleteUser, deleteReservation } from "../services/user.service";
import { MdDelete } from "react-icons/md";

import classes from "../pages/AdminBoard.module.css";
import DeleteWindow from "./DeleteWindow";

/**
 * UserTable component for displaying a table of users and allowing deletion of users.
 * @param {Object[]} users - Array of user objects containing user data.
 * @param {Function} setUsers - Function to update the user state.
 * @param {Object[]} reservations - Array of reservation objects containing reservation data.
 * @param {Function} setReservations - Function to update the reservations state.
 * @param {Function} onDeleteMessage - Function to display a message after a user is deleted.
 * @returns {React.JSX.Element} The UserTable component.
 */
export default function UserTable({
  users,
  setUsers,
  reservations,
  setReservations,
  onDeleteMessage,
}) {
  /**
   * State variables for managing loading state, selected user ID, and confirm modal visibility.
   */
  const [loading, setLoading] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  /**
   * Effect hook to set loading state to false on component mount.
   */
  useEffect(() => {
    setLoading(false);
  }, []);

  /**
   * Filter users to include only those with 'ROLE_USER' role.
   */
  const onlyUsers = users.filter((user) =>
    user.roles.some((role) => role.roleName === "ROLE_USER")
  );

  /**
   * Function to handle user deletion.
   * @param {string} userId - The ID of the user to be deleted.
   */
  const handleDelete = async (userId) => {
    setSelectedUserId(userId);
    setShowConfirmModal(true);
  };

  /**
   * Function to confirm user deletion.
   * Deletes the selected user, associated reservations, updates state accordingly,
   * and displays a success message upon successful deletion.
   */
  const confirmDelete = async () => {
    try {
      await deleteUser(selectedUserId);

      const deletedUser = users.find((user) => user.id === selectedUserId);

      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== selectedUserId));

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
    setSelectedUserId(null);
    setShowConfirmModal(false);
  };

  /**
   * Check if there are no users.
   */
  const noUsers = onlyUsers.length === 0;

  return (
    <>
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
          {noUsers && (
            <tr>
              <td colSpan="6">No users available</td>
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
                  onClick={() => handleDelete(user.id)}
                  data-testid="delete-button-1"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <DeleteWindow
        open={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={confirmDelete}
      />
    </>
  );
}
