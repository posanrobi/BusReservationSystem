import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, useEnterKeyEffect } from "../services/auth.service";
import Input from "./Input";
import { getUserRole } from "../services/auth.service";

import classes from "./Auth.module.css";

/**
 * Component for user login.
 *
 * @param {function} closeLoginModal - Function to close the login modal.
 * @returns {React.ReactNode} - JSX element representing the login form.
 */
export default function Login({ closeLoginModal }) {
  // State variables for form data, errors, and submission status
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // React router hook for navigation
  const navigate = useNavigate();

  // Handles input change for the form fields
  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors({});
  }

  /**
   * Validates the login form.
   *
   * @returns {boolean} - Indicates whether the form is valid.
   */
  function validateForm() {
    let isValid = true;
    const newErrors = {};

    ["username", "password"].forEach((input) => {
      if (!formData[input]) {
        newErrors[input] = `${input} is required`;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }

  // Handles form submission
  async function handleSubmit(e) {
    e.preventDefault();

    if (validateForm()) {
      try {
        await login(formData);

        setSubmitted(true);
        setTimeout(() => {
          if (getUserRole() === "ROLE_USER") {
            navigate("/home");
          } else if (getUserRole() === "ROLE_ADMIN") {
            navigate("/admin");
          }
        }, 2000);
      } catch (error) {
        setErrors({
          message: error.response.data.message.toLowerCase(),
        });

        setSubmitted(false);
      }
    }
  }

  // Handles pressing the enter key to submit the form
  useEnterKeyEffect(handleSubmit);

  // Handles closing the login modal.
  function closeHandler(e) {
    e.preventDefault();
    closeLoginModal();
  }

  // Resets form data, errors, and submission status when the modal is closed
  useEffect(() => {
    setErrors({});
    setFormData({
      username: "",
      password: "",
    });
    setSubmitted(false);
  }, [closeLoginModal]);

  // Renders the login form
  return (
    <>
      <div className={classes.loginContainer}>
        <h2>Login</h2>
        {submitted ? (
          <div className={classes.successMessage}>Login successful!</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <Input
              className={classes.input}
              label={"Username"}
              type={"text"}
              name={"username"}
              id={"login-username"}
              value={formData.username}
              onChange={handleInputChange}
              error={errors.username}
            />
            <Input
              className={classes.input}
              label={"Password"}
              type={"password"}
              name={"password"}
              id={"login-password"}
              value={formData.password}
              onChange={handleInputChange}
              error={errors.password}
            />
            {errors.message && (
              <div className={classes.error}>{errors.message}</div>
            )}

            <div className={classes.btnContainer}>
              <button
                type="button"
                className={classes.cancelBtn}
                onClick={closeHandler}
              >
                Cancel
              </button>
              <button className={classes.authBtn}>Sign in</button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
