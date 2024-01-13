import { Link } from "react-router-dom";
import { getUserRole } from "../services/auth.service";

export default function Error() {
  const isAdmin = getUserRole() === "ROLE_ADMIN";

  return (
    <>
      <h1>An error occured!</h1>
      <p>Wrong path detected.</p>

      <Link to={`${isAdmin ? "/admin" : "/home"}`}>Back to content</Link>
    </>
  );
}
