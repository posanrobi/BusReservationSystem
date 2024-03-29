import { NavLink } from "react-router-dom";
import { logout } from "../services/auth.service";
import { getUserRole } from "../services/auth.service";
import { RiLogoutBoxRLine } from "react-icons/ri";
import logo from "../images/logo.png";

import classes from "./MainNavigation.module.css";

/**
 * Component for rendering the main navigation bar.
 * @returns {React.JSX.Element} - JSX element representing the main navigation.
 */
export default function MainNavigation() {
  /**
   * Handles the logout functionality.
   */
  function handleLogout() {
    logout();
  }

  /**
   * Checks if the current user is an admin.
   */
  const isAdmin = getUserRole() === "ROLE_ADMIN";

  return (
    <header className={classes.header}>
      <img src={logo} alt="Logo" className={classes.logo} />
      <nav className={classes.nav}>
        {!isAdmin && (
          <>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/plan"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Plan
            </NavLink>
            <NavLink
              to="/reservations"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Reservations
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Profile
            </NavLink>
          </>
        )}

        <div className={classes.logoutDiv}>
          <NavLink to="/" onClick={handleLogout} data-testid="logout-button">
            <RiLogoutBoxRLine />
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
