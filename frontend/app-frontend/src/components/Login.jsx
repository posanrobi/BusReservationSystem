import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, useEnterKeyEffect } from "../services/auth.service";
import Input from "./Input";
import { getUserRole } from "../services/auth.service";

import classes from "./Auth.module.css";

export default function Login({ closeLoginModal }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

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

    ["username", "password"].forEach((input) => {
      if (!formData[input]) {
        newErrors[input] = `${input} is required`;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await login(formData);

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
          message: error.response.data.message,
        });
        setSubmitted(false);
      }
    }
  }

  useEnterKeyEffect(handleSubmit);

  function closeHandler(e) {
    e.preventDefault();
    closeLoginModal();
  }

  useEffect(() => {
    setErrors({});
    setFormData({
      username: "",
      password: "",
    });
    setSubmitted(false);
  }, [closeLoginModal]);

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
