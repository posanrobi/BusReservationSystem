import { useState } from "react";
import Modal from "./Modal";
import Login from "./Login";
import { getCurrentUser } from "../services/auth.service";

import classes from "./Auth.module.css";
import Register from "./Register";
import modalClasses from "./Modal.module.css";

export default function AuthenticationPage() {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

  const openLoginModal = () => setLoginModalOpen(true);
  const closeLoginModal = () => setLoginModalOpen(false);

  const openRegisterModal = () => setRegisterModalOpen(true);
  const closeRegisterModal = () => setRegisterModalOpen(false);

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
          <button className={classes.authBtn} onClick={openLoginModal}>
            Sign in
          </button>
          <h1 className={`${classes.ctaTitle} ${classes.signUpTitle}`}>
            Or create a new one
          </h1>
          <button className={classes.authBtn} onClick={openRegisterModal}>
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
