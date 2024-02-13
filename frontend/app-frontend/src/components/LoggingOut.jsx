import { useState } from "react";
import { logout } from "../services/auth.service";

import classes from "./LoggingOut.module.css";

/**
 * Component for logging out the user.
 * @returns {React.JSX.Element} - JSX element representing the logging out functionality.
 */
export default function LoggingOut() {
  /**
   * State variable to track loading status.
   */
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handles the logout action.
   * Sets isLoading state to true, logs out the user, and reloads the window after a delay.
   */
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
          <h2 className={classes.successMessage}>
            Profile successfully updated!
          </h2>
          <p className={classes.errorDescription}>
            You will be logged out for security reasons. Please log in with the
            updated data!
          </p>
          <button className={classes.confirmLogoutBtn} onClick={handleLogout}>
            Okay
          </button>
        </div>
      ) : (
        <p className={classes.logoutMessage}>Logging out...</p>
      )}
    </div>
  );
}
