import { useState, useEffect } from "react";
import { getAllUsers } from "../services/user.service";

export default function AdminBoard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getAllUsers();
        setUsers(response.data);
        console.log(response.data);
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
    <div>
      <h2>User list</h2>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Username</th>
            <th>Email</th>
            <th>Bus Line</th>
            <th>Reservations</th>
          </tr>
        </thead>
        <tbody>
          {onlyUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>busline</td>
              <td>{user.reservations.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
