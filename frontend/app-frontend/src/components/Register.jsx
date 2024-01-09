import { useState } from "react";
import axios from "axios";

import classes from "./Auth.module.css";
import { useNavigate, useNavigation } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/signup",
        formData
      );
      console.log(response.data);
    } catch (error) {
      console.error("Register error:", error.response.data);
    }
  }

  function closeHandler(e) {
    e.preventDefault();
    navigate("..");
  }

  return (
    <>
      <div className={classes.loginContainer}>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className={classes.labelInput}>
            <label className={classes.label} htmlFor="firstname">
              Firstname
            </label>
            <input
              className={classes.input}
              type="text"
              name="firstname"
              id="firstname"
              value={formData.firstname}
              required
              onChange={handleInputChange}
            />
          </div>
          <div className={classes.labelInput}>
            <label className={classes.label} htmlFor="lastname">
              Lastname
            </label>
            <input
              className={classes.input}
              type="text"
              name="lastname"
              id="lastname"
              value={formData.lastname}
              required
              onChange={handleInputChange}
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
              value={formData.username}
              required
              onChange={handleInputChange}
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
              value={formData.email}
              required
              onChange={handleInputChange}
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
              value={formData.password}
              required
              onChange={handleInputChange}
            />
          </div>
          <div className={classes.btnContainer}>
            <button className={classes.cancelBtn} onClick={closeHandler}>
              Cancel
            </button>
            <button className={classes.authBtn} disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Create a user"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
