import { useState } from "react";
import { logout } from "../services/auth.service";

import classes from "./LoggingOut.module.css";

export default function TokenExpired() {
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
          <h2>Oops! Your session has expired.</h2>
          <p>Please sign in again to continue accessing your account.</p>
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
