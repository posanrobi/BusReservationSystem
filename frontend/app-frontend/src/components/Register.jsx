import { useState } from "react";

import classes from "./Auth.module.css";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  return (
    <>
      <div className={classes.loginContainer}>
        <h2>Register</h2>
        <form>
          <div className={classes.labelInput}>
            <label className={classes.label} htmlFor="firstname">
              Firstname
            </label>
            <input
              className={classes.input}
              type="text"
              name="firstname"
              id="firstname"
              required
            />
          </div>
          <div className={classes.labelInput}>
            <label className={classes.label} htmlFor="lastname">
              Lastname
            </label>
            <input
              className={classes.input}
              type="text"
              name="lasttname"
              id="lasttname"
              required
            />
          </div>
          <div className={classes.labelInput}>
            <label className={classes.label} htmlFor="username">
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
            <label className={classes.label} htmlFor="email">
              Email
            </label>
            <input
              className={classes.input}
              type="email"
              name="email"
              id="email"
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
          <button className={classes.authBtn}>Sign up</button>
        </div>
      </div>
    </>
  );
}
