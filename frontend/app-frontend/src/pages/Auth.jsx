import { useState } from "react";
import Modal from "../components/Modal";
import Login from "../components/Login";
import Register from "../components/Register";
import { getCurrentUser } from "../services/auth.service";

import classes from "./Auth.module.css";
import modalClasses from "../components/Modal.module.css";

/**
 * Component for authentication page, including login and registration forms as modals.
 * @returns {React.JSX.Element} - JSX element representing the authentication page.
 */
export default function AuthenticationPage() {
  /**
   * State to manage the visibility of the login and registration modals.
   */
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

  /**
   * Functions to open and close the login and registration modal.
   * @returns {void}
   */
  const openLoginModal = () => setLoginModalOpen(true);
  const closeLoginModal = () => setLoginModalOpen(false);
  const openRegisterModal = () => setRegisterModalOpen(true);
  const closeRegisterModal = () => setRegisterModalOpen(false);

  /**
   * Checks if there is a user in local storage and removes it if found.
   */
  const user = getCurrentUser();
  if (user) localStorage.removeItem("user");

  return (
    <>
      <div className={`${classes.authContainer} ${classes.authBackground}`}>
        <div className={classes.textContainer}>
          <h1 className={classes.welcomeTitle}>
            Welcome to <span className={classes.appName}>Bookerra</span>
          </h1>
          <h1 className={classes.title}>
            Book your place before it's too late!
          </h1>
        </div>
        <div className={classes.textContainer}>
          <h1 className={`${classes.ctaTitle} ${classes.signInTitle}`}>
            Do you have an account?
          </h1>
          <button
            className={classes.authBtn}
            onClick={openLoginModal}
            data-testid="sign-in-button"
          >
            Sign in
          </button>
          <h1 className={`${classes.ctaTitle} ${classes.signUpTitle}`}>
            Or create a new one
          </h1>
          <button
            className={classes.authBtn}
            onClick={openRegisterModal}
            data-testid="sign-up-button"
          >
            Sign up
          </button>
        </div>
      </div>

      <Modal open={isLoginModalOpen} className={modalClasses.modalContainer}>
        <Login closeLoginModal={closeLoginModal} />
      </Modal>
      <Modal open={isRegisterModalOpen} className={modalClasses.modalContainer}>
        <Register closeRegisterModal={closeRegisterModal} />
      </Modal>
    </>
  );
}
