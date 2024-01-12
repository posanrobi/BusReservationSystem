import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth.service";
import Input from "./Input";
import { getUserRole } from "../services/auth.service";

import classes from "./Auth.module.css";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  //--
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const role = getUserRole();
    console.log(role);
    setUserRole(role);
  }, []);
  //--

  const navigate = useNavigate();

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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

        console.log(response.data);

        setSubmitted(true);
        setTimeout(() => {
          if (userRole === "ROLE_USER") {
            navigate("/home");
          } else {
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
            <Input
              label={"Username"}
              type={"text"}
              name={"username"}
              id={"username"}
              value={formData.username}
              onChange={handleInputChange}
              error={errors.username}
            />
            <Input
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
              <button className={classes.authBtn}>Sign in</button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
