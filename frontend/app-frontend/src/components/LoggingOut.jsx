import { useState } from "react";

import { logout } from "../services/auth.service";
import classes from "./LoggingOut.module.css";

export default function LoggingOut() {
  const [isLoading, setIsLoading] = useState(false);

  function handleLogout() {
    setIsLoading(true);

    setTimeout(() => {
      logout();
      window.location.reload();
    }, 2000);
  }

  return (
    <div className={classes.logoutContainer}>
      {!isLoading ? (
        <div>
          <h2>Profile successfully updated!</h2>
          <p>
            You will be logged out for security reasons. Please log in with the
            updated data!
          </p>
          <button className={classes.confirmLogoutBtn} onClick={handleLogout}>
            Okay
          </button>
        </div>
      ) : (
        <p>Logging out...</p>
      )}
    </div>
  );
}
