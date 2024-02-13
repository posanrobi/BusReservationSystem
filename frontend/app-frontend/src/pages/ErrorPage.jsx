import { Link } from "react-router-dom";
import { getUserRole } from "../services/auth.service";
import { FaArrowLeft } from "react-icons/fa";
import { MdError } from "react-icons/md";

import classes from "./ErrorPage.module.css";

/**
 * Error page component displaying an error message and a back button.
 * Determines the destination of the back button based on the user's role.
 * @returns {React.JSX.Element} Error page JSX element.
 */
export default function Error() {
  /**
   * Variable for checking if the user is an admin or not.
   */
  const isAdmin = getUserRole() === "ROLE_ADMIN";

  return (
    <>
      <div className={classes.errorContainer}>
        <div className={classes.errorBox}>
          <h2 className={classes.errorSign}>
            <MdError />
          </h2>
          <h1 className={classes.errorTitle}>An error occured!</h1>
          <p className={classes.errorDescription}>
            The requested page was not found.
            <br />
            Try again later.
          </p>

          <Link
            to={`${isAdmin ? "/admin" : "/home"}`}
            className={classes.backToButton}
          >
            <div className={classes.backToDiv}>
              <FaArrowLeft />
              Back to content
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
