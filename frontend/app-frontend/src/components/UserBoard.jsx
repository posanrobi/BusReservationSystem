import { Link } from "react-router-dom";

import classes from "./UserBoard.module.css";

export default function HomePage() {
  return (
    <>
      <div className={classes.homeContainer}>
        <h1 className={classes.homeTitle}>Bookerra</h1>
        <p className={classes.homeDescription}>
          Welcome to dolor sit amet, consectetur adipisicing elit. Tempore
          corporis optio modi commodi assumenda quibusdam aspernatur!
        </p>
        <div className={classes.navBoxContainer}>
          <Link to="/plan" className={classes.navBox}>
            Planning
          </Link>
          <Link to={"/reservations"} className={classes.navBox}>
            Reservations
          </Link>
          <Link to={"/profile"} className={classes.navBox}>
            Profile
          </Link>
        </div>
      </div>
    </>
  );
}
