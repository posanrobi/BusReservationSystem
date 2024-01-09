import { Link } from "react-router-dom";

import classes from "./UserBoard.module.css";

export default function HomePage() {
  return (
    <>
      <div className={classes.backGround}>
        <div className={classes.homeContainer}>
          <div className={classes.navBox}>
            <Link>Planning</Link>
          </div>
          <div className={classes.navBox}>
            <Link>Reservations</Link>
          </div>
          <div className={classes.navBox}>
            <Link>Profile</Link>
          </div>
        </div>
      </div>
    </>
  );
}
