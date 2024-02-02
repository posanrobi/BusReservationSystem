import { useState, useEffect } from "react";
import { getAllUsers } from "../services/user.service";
import { MdDelete } from "react-icons/md";

import classes from "./AdminBoard.module.css";

export default function UserTable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getAllUsers();
        setUsers(response.data);
      } catch (error) {
        console.error("Error while fetching users", error);
      }
    }

    fetchData();
  }, []);

  const onlyUsers = users.filter((user) =>
    user.roles.some((role) => role.roleName === "ROLE_USER")
  );

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
        {onlyUsers.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.firstname}</td>
            <td>{user.lastname}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>
              <MdDelete className={classes.deleteIcon} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
