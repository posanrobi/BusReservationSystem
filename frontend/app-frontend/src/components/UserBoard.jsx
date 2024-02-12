import { Link } from "react-router-dom";

import classes from "./UserBoard.module.css";

/**
 * HomePage component for displaying the landing page content.
 *
 * @returns {JSX.Element} The HomePage component.
 */
export default function HomePage() {
  return (
    <>
      <div className={classes.homeContainer}>
        {/* Title */}
        <h1 className={classes.homeTitle}>Bookerra</h1>
        <p className={classes.homeDescription}>
          {/* Description */}
          This ultimate bus reservation system designed specifically for{" "}
          <span className={classes.outLineText}>Hungary</span>. Say goodbye to
          the hassle of traditional reservation processes and hello to a more{" "}
          <span className={classes.outLineText}>comfortable</span> and{" "}
          <span className={classes.outLineText}>convenient</span> way of
          traveling. Experience the future of bus travel with Bookerra today!
        </p>
        {/* Navigation links */}
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
