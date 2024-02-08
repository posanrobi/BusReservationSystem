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
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors({});
  }

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

  useEnterKeyEffect(handleSubmit);

  function closeHandler(e) {
    e.preventDefault();
    setErrors("");
    closeRegisterModal();
  }

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
