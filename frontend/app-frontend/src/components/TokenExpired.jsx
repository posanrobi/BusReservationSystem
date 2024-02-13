import { useState } from "react";
import { logout } from "../services/auth.service";

import classes from "./LoggingOut.module.css";

/**
 * TokenExpired component displayed when the user's session has expired.
 * Allows the user to log out and sign in again to continue accessing the account.
 * @returns {React.JSX.Element} The TokenExpired component.
 */
export default function TokenExpired() {
  /**
   * State variable for indicating whether the logout is in progress.
   */
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handles the logout process.
   * Sets isLoading to true, then logs out the user and reloads the page after a delay.
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
          <h2>Oops! Your session has expired.</h2>
          <p>Please sign in again to continue accessing your account.</p>
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
