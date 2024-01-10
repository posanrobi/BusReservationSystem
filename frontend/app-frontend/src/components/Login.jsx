import { useState, useEffect } from "react";
import classes from "./Auth.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  //const [isFormValid, setIsFormValid] = useState(true);

  const navigate = useNavigate();

  function validateForm() {
    let isValid = true;
    const newErrors = {};

    // username validation
    if (!formData.username) {
      newErrors.username = "Username is required";
      isValid = false;
    }

    // password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/auth/signin",
          formData
        );
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        console.log(response.data);

        setSubmitted(true);
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      } catch (error) {
        //console.error("Login error", error.response.data);
        console.log(error.response.data.message);
        setSubmitted(false);
      }
    }
  }

  const isFormValid = Object.keys(errors).length === 0;

  function closeHandler(e) {
    e.preventDefault();
    navigate("..");
  }

  return (
    <>
      <div className={classes.loginContainer}>
        <h2>Login</h2>
        {submitted ? (
          <div className={classes.successMessage}>Login successful!</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className={classes.labelInput}>
              <label className={classes.label} htmlFor="text">
                Username
              </label>
              <input
                className={classes.input}
                type="text"
                name="username"
                id="username"
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>
            {errors.username && (
              <div className={classes.error}>{errors.username}</div>
            )}

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
                onChange={handleInputChange}
              />
            </div>
            {errors.password && (
              <div className={classes.error}>{errors.password}</div>
            )}

            <div className={classes.btnContainer}>
              <button className={classes.cancelBtn} onClick={closeHandler}>
                Cancel
              </button>
              <button className={classes.authBtn} /*disabled={!isFormValid}*/>
                Sign in
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
