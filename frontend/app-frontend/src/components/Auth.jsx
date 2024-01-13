import { Link } from "react-router-dom";

import classes from "./Auth.module.css";
import { getCurrentUser } from "../services/auth.service";

export default function AuthenticationPage() {
  const user = getCurrentUser();
  if (user) localStorage.removeItem("user");

  return (
    <>
      <div className={`${classes.authContainer} ${classes.authBackground}`}>
        <div className={classes.textContainer}>
          <h1 className={classes.title}>
            Book your place before it's too late!
          </h1>
        </div>
        <div className={classes.textContainer}>
          <h1 className={classes.ctaTitle}>Do you have an account?</h1>
          <Link to="signin" className={classes.authBtn}>
            Sign in
          </Link>
          <h1>Or create a New One</h1>
          <Link to="signup" className={classes.authBtn}>
            Sign up
          </Link>
        </div>
      </div>
    </>
  );
}
