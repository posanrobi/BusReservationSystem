import classes from "./Auth.module.css";

export default function Login() {
  return (
    <>
      <div className={classes.loginContainer}>
        <h2>Login</h2>
        <form>
          <div className={classes.labelInput}>
            <label className={classes.label} htmlFor="text">
              Username
            </label>
            <input
              className={classes.input}
              type="text"
              name="username"
              id="username"
              required
            />
          </div>

          <div className={classes.labelInput}>
            <label className={classes.label} htmlFor="password">
              Password
            </label>
            <input
              className={classes.input}
              type="password"
              name="password"
              id="password"
              required
            />
          </div>
        </form>
        <div className={classes.btnContainer}>
          <button className={classes.cancelBtn}>Cancel</button>
          <button className={classes.authBtn}>Sign in</button>
        </div>
      </div>
    </>
  );
}
