import { useState, useEffect } from "react";
import { register, useEnterKeyEffect } from "../services/auth.service";
import Input from "./Input";

import classes from "./Auth.module.css";

/**
 * Component for user registration.
 * @param {function} closeLoginModal - Close the registration modal.
 * @returns {React.JSX.Element} - JSX element representing the registration form.
 */
export default function Register({ closeRegisterModal }) {
  /**
   * State variables for storing the user's data.
   */
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });

  /**
   * State variable for storing the errors of the form.
   */
  const [errors, setErrors] = useState({});

  /**
   * State variable for storing if the form has been submitted.
   */
  const [submitted, setSubmitted] = useState(false);

  /**
   * Handles input changes for form fields.
   * Updates the form data state with the new input value and clears any previous errors.
   * @param {Object} e - The event object containing information about the input change.
   */
  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors({});
  }

  /**
   * Validates the form data before submission.
   * Checks if required fields are filled and validates the email format and update errors.
   * @returns {boolean} Whether the form data is valid or not.
   */
  function validateForm() {
    let isValid = true;
    const newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    ["firstname", "lastname", "username", "email", "password"].forEach(
      (input) => {
        if (!formData[input]) {
          newErrors[input] = `${input} is required`;
          isValid = false;
        } else if (input === "email" && !emailRegex.test(formData.email)) {
          newErrors[input] = "Invalid email format";
          isValid = false;
        }
      }
    );

    setErrors(newErrors);
    return isValid;
  }

  /**
   * Handles form submission.
   * Validates the form data and submits the data if it's valid. Displays error messages if submission fails.
   * @param {Object} e - The event object representing the form submission.
   */
  async function handleSubmit(e) {
    e.preventDefault();

    if (validateForm(formData)) {
      try {
        await register(formData);

        setSubmitted(true);
        setTimeout(() => {
          closeRegisterModal();
        }, 2000);
      } catch (error) {
        setErrors({
          message: error.response.data.message,
        });
        setSubmitted(false);
      }
    }
  }

  /**
   * Send the registration data to the backend for Enter Key effect.
   */
  useEnterKeyEffect(handleSubmit);

  /**
   * Handles the close event of the modal.
   * Prevents the default behavior, clears any errors, and closes the register modal.
   * @param {Object} e - The event object representing the close event.
   */
  function closeHandler(e) {
    e.preventDefault();
    setErrors("");
    closeRegisterModal();
  }

  /**
   * Clears errors, resets the form data and state variables when the register modal is closed.
   * Sets the submission status to false.
   */
  useEffect(() => {
    setErrors({});
    setFormData({
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
    });
    setSubmitted(false);
  }, [closeRegisterModal]);

  return (
    <>
      <div className={classes.loginContainer}>
        <h2>Register</h2>
        {submitted ? (
          <div className={classes.successMessage}>
            User registered successfully!
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <Input
              className={classes.input}
              label={"Firstname"}
              type={"text"}
              name={"firstname"}
              id={"firstname"}
              value={formData.firstname}
              onChange={handleInputChange}
              error={errors.firstname}
            />
            <Input
              className={classes.input}
              label={"Lastname"}
              type={"text"}
              name={"lastname"}
              id={"lastname"}
              value={formData.lastname}
              onChange={handleInputChange}
              error={errors.lastname}
            />
            <Input
              className={classes.input}
              label={"Username"}
              type={"text"}
              name={"username"}
              id={"username"}
              value={formData.username}
              onChange={handleInputChange}
              error={errors.username}
            />
            <Input
              className={classes.input}
              label={"Email"}
              type={"text"}
              name={"email"}
              id={"email"}
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
            />
            <Input
              className={classes.input}
              label={"Password"}
              type={"password"}
              name={"password"}
              id={"password"}
              value={formData.password}
              onChange={handleInputChange}
              error={errors.password}
            />
            {errors.message && (
              <div className={classes.error}>{errors.message}</div>
            )}
            <div className={classes.btnContainer}>
              <button className={classes.cancelBtn} onClick={closeHandler}>
                Cancel
              </button>
              <button className={classes.authBtn}>Create a user</button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
