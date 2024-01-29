import { Link } from "react-router-dom";
import { getUserRole } from "../services/auth.service";
import { FaArrowLeft } from "react-icons/fa";

import classes from "./ErrorPage.module.css";

export default function Error() {
  const isAdmin = getUserRole() === "ROLE_ADMIN";

  return (
    <>
      <div className={classes.errorContainer}>
        <div className={classes.errorBox}>
          <h1 className={classes.errorTitle}>An error occured!</h1>
          <h2>:(</h2>
          <p>Wrong path detected.</p>

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
