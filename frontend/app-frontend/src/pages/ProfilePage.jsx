import { useEffect, useState } from "react";
import Input from "../components/Input";
import { getCurrentUser } from "../services/auth.service";

import { CgProfile } from "react-icons/cg";
import { FaRegEdit } from "react-icons/fa";

import classes from "./ProfilePage.module.css";
import modalClasses from "../components/Modal.module.css";
import {
  getUserById,
  updatePassword,
  updateUser,
} from "../services/user.service";
import Modal from "../components/Modal";
import LoggingOut from "../components/LoggingOut";

export default function ProfilePage() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [hasChanges, setHasChanges] = useState(false);
  const [originalData, setOriginalData] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentUser = getCurrentUser();
  const userId = currentUser ? currentUser.id : "";

  useEffect(() => {
    async function getUserData() {
      try {
        const currentUserResponse = await getUserById(userId);
        const currentUserData = currentUserResponse.data;

        setFirstname(currentUserData.firstname);
        setLastname(currentUserData.lastname);
        setUsername(currentUserData.username);
        setEmail(currentUserData.email);

        setOriginalData(currentUserData);
      } catch (error) {
        console.error("Error while getting user", error);
      }
    }
    getUserData();
  }, [userId]);

  useEffect(() => {
    const hasDataChanged =
      originalData.username !== username ||
      originalData.email !== email ||
      originalData.firstname !== firstname ||
      originalData.lastname !== lastname ||
      password !== "" ||
      newPassword !== "" ||
      confirmPassword !== "";

    setHasChanges(hasDataChanged);
  }, [
    originalData,
    username,
    email,
    firstname,
    lastname,
    password,
    newPassword,
    confirmPassword,
  ]);

  const noUSerData = !username || !firstname || !lastname || !email;
  const noPasswordData =
    (password && !newPassword) ||
    (password && !confirmPassword) ||
    (newPassword && !confirmPassword) ||
    (newPassword && !password) ||
    (confirmPassword && !newPassword) ||
    (confirmPassword && !password);

  async function handleSave() {
    try {
      setErrors({
        noFieldMessage: "",
        message: "",
      });

      if (noUSerData) {
        setErrors({
          ...errors,
          noFieldMessage: "Please fill in all required fields.",
        });
        return;
      }
      if (noPasswordData) {
        setErrors({
          ...errors,
          message: "Please fill in all required fields.",
        });
        return;
      }

      await updateUser(userId, {
        username: username,
        firstname: firstname,
        lastname: lastname,
        email: email,
      });

      if (
        newPassword &&
        newPassword !== "" &&
        confirmPassword &&
        confirmPassword !== ""
      ) {
        await updatePassword(userId, {
          currentPassword: password,
          newPassword: newPassword,
          confirmPassword: confirmPassword,
        });
      }

      setErrors({});

      setIsModalOpen(true);
      localStorage.removeItem("user");

      console.log("User updated successfully!");
    } catch (error) {
      if (error.message) {
        setErrors({ ...errors, message: error.message });
      } else {
        console.error("Could not update password");
      }
    }

    setHasChanges(false);
    /* setPassword("");
    setNewPassword("");
    setConfirmPassword(""); */
  }

  useEffect(() => {
    setPassword("");
    setNewPassword("");
    setConfirmPassword("");
  }, [isModalOpen]);

  /* const handleInputChange = (fieldName) => (e) => {
    setErrors({
      noFieldMessage: "",
      message: "",
    });

    const value = e.target.value;
    switch (fieldName) {
      case "firstname":
        setFirstname(value);
        //setHasChanges(true);
        break;
      case "lastname":
        setLastname(value);
        //setHasChanges(true);
        break;
      case "username":
        setUsername(value);
        //setHasChanges(true);
        break;
      case "email":
        setEmail(value);
        //setHasChanges(true);
        break;
      case "password":
        setPassword(value);
        //setHasChanges(true);
        break;
      case "newPassword":
        setNewPassword(value);
        //setHasChanges(true);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        //setHasChanges(true);
        break;
      default:
        break;
    }
  }; */

  const handleInputChange = (fieldName) => (e) => {
    setErrors({
      noFieldMessage: "",
      message: "",
    });

    const value = e.target.value;

    // Check if the new value is different from the original data
    const isValueChanged = originalData[fieldName] !== value;

    switch (fieldName) {
      case "firstname":
        setFirstname(value);
        setHasChanges(isValueChanged);
        break;
      case "lastname":
        setLastname(value);
        setHasChanges(isValueChanged);
        break;
      case "username":
        setUsername(value);
        setHasChanges(isValueChanged);
        break;
      case "email":
        setEmail(value);
        setHasChanges(isValueChanged);
        break;
      case "password":
        setPassword(value);
        // For the password field, always set hasChanges to true
        setHasChanges(true);
        break;
      case "newPassword":
        setNewPassword(value);
        setHasChanges(isValueChanged);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        setHasChanges(isValueChanged);
        break;
      default:
        break;
    }
  };

  function handleEditClick() {
    setHasChanges(false);
  }

  return (
    <>
      <div className={classes.profileContainer}>
        <div className={classes.profileBox}>
          <header className={classes.profileBoxHeader}>
            <div className={classes.editDiv}>
              <CgProfile className={classes.profileIcon} />
              <h2 className={classes.fullName}>Profile details</h2>
            </div>
            <FaRegEdit className={classes.editIcon} onClick={handleEditClick} />
          </header>
          <div className={classes.profileBoxBody}>
            <form className={classes.profileForm}>
              <div>
                <Input
                  className={classes.profileInput}
                  label={"Firstname"}
                  type={"text"}
                  name={"profileFirstname"}
                  id={"profileFirstname"}
                  value={firstname}
                  onChange={(e) => handleInputChange("firstname")(e)}
                  error={""}
                />
                <Input
                  className={classes.profileInput}
                  label={"Lastname"}
                  type={"text"}
                  name={"profileLastname"}
                  id={"profileLastname"}
                  value={lastname}
                  onChange={(e) => handleInputChange("lastname")(e)}
                  error={""}
                />
                <Input
                  className={classes.profileInput}
                  label={"Username"}
                  type={"text"}
                  name={"profileUsername"}
                  id={"profileUsername"}
                  value={username}
                  onChange={(e) => handleInputChange("username")(e)}
                  error={""}
                />
                <Input
                  className={classes.profileInput}
                  label={"Email"}
                  type={"email"}
                  name={"profileEmail"}
                  id={"profileEmail"}
                  value={email}
                  onChange={(e) => handleInputChange("email")(e)}
                  error={errors.noFieldMessage}
                />
              </div>
              <div>
                <p className={classes.changePassword}>Change password?</p>
                <Input
                  className={classes.profileInput}
                  label={"Current password"}
                  type={"password"}
                  name={"currentPassword"}
                  id={"currentPassword"}
                  value={password}
                  onChange={(e) => handleInputChange("password")(e)}
                  error={""}
                  placeholder={"Enter your current password"}
                />
                <Input
                  className={classes.profileInput}
                  label={"New password"}
                  type={"password"}
                  name={"newPassword"}
                  id={"newPassword"}
                  value={newPassword}
                  onChange={(e) => handleInputChange("newPassword")(e)}
                  error={""}
                  placeholder={"Enter your new password"}
                />
                <Input
                  className={classes.profileInput}
                  label={"Confirm new password"}
                  type={"password"}
                  name={"confirmPassword"}
                  id={"confirmPassword"}
                  value={confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword")(e)}
                  error={`${errors.message ? errors.message : ""}`}
                  placeholder={"Confirm your new password"}
                />
              </div>
            </form>
          </div>
          <footer className={classes.profileBoxFooter}>
            <button
              className={classes.saveBtn}
              onClick={handleSave}
              type="button"
              disabled={!hasChanges}
            >
              Save changes
            </button>
          </footer>
        </div>
      </div>

      <Modal open={isModalOpen} className={modalClasses.modalContainer}>
        <LoggingOut />
      </Modal>
    </>
  );
}
