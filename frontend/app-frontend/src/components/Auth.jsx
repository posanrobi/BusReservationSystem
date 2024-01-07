import { Link } from "react-router-dom";

import classes from "./Auth.module.css";

export default function AuthenticationPage() {
  return (
    <>
      <div className={classes.authContainer}>
        <div>
          <h1>Book your place before it's too late!</h1>
        </div>
        <div>
          <h1>Do you have an account?</h1>
          <Link to="signin">Sign in</Link>
          <h1>Or create a New One</h1>
          <Link to="signup">Sign up</Link>
        </div>
      </div>
    </>
  );
}
