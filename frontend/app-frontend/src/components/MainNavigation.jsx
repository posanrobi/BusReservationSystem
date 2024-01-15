import { NavLink } from "react-router-dom";
import { logout } from "../services/auth.service";
import { getUserRole } from "../services/auth.service";

import classes from "./MainNavigation.module.css";

export default function MainNavigation() {
  function handleLogout() {
    logout();
  }

  const isAdmin = getUserRole() === "ROLE_ADMIN";

  return (
    <header className={classes.header}>
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

        <NavLink to="/" onClick={handleLogout}>
          Logout
        </NavLink>
      </nav>
    </header>
  );
}
