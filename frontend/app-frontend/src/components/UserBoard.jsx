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
          <div className={classes.navBox}>
            <Link to={"/plan"}>Planning</Link>
          </div>
          <div className={classes.navBox}>
            <Link to={"/reservations"}>Reservations</Link>
          </div>
          <div className={classes.navBox}>
            <Link to={"/profile"}>Profile</Link>
          </div>
        </div>
      </div>
    </>
  );
}
