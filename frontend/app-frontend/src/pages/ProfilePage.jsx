import { useEffect, useState } from "react";
import { getCurrentUser } from "../services/auth.service";
import {
  getUserById,
  updatePassword,
  updateUser,
} from "../services/user.service";
import Input from "../components/Input";
import Modal from "../components/Modal";
import LoggingOut from "../components/LoggingOut";
import TokenExpired from "../components/TokenExpired";
import {
  checkDataChanges,
  existNewAndConfirmPassword,
  noPasswordData,
  noUserData,
  validateEmail,
} from "../services/utils";

import { CgProfile } from "react-icons/cg";
import { FaRegEdit } from "react-icons/fa";

import classes from "./ProfilePage.module.css";
import modalClasses from "../components/Modal.module.css";

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

  const [isEditing, setIsEditing] = useState(false);
  const [openExpiredModal, setOpenExpiredModal] = useState(false);

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
        if (error.message === "Your token is expired. Please login again.") {
          setOpenExpiredModal(true);
        } else {
          console.error("Error while fetching data", error);
        }
      }
    }
    getUserData();
  }, [userId]);

  useEffect(() => {
    const hasDataChanged = checkDataChanges(
      originalData,
      username,
      email,
      firstname,
      lastname,
      password,
      newPassword,
      confirmPassword
    );
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

  async function handleSave() {
    try {
      setErrors({
        userDataMessage: "",
        message: "",
      });

      if (noUserData(username, firstname, lastname, email)) {
        setErrors({
          ...errors,
          userDataMessage: "please fill in all required fields",
        });
        return;
      }
      if (noPasswordData(password, newPassword, confirmPassword)) {
        setErrors({
          ...errors,
          message: "please fill in all required fields",
        });
        return;
      }

      if (!validateEmail(email)) {
        setErrors({
          ...errors,
          userDataMessage: "invalid email format",
        });
        return;
      }

      await updateUser(userId, {
        username: username,
        firstname: firstname,
        lastname: lastname,
        email: email,
      });

      if (existNewAndConfirmPassword(newPassword, confirmPassword)) {
        await updatePassword(userId, {
          currentPassword: password,
          newPassword: newPassword,
          confirmPassword: confirmPassword,
        });
      }

      setErrors({});

      setIsModalOpen(true);
      localStorage.removeItem("user");
    } catch (error) {
      if (error.response) {
        console.error(
          "Could not update user. Server response:",
          error.response.data
        );
        setErrors({
          ...errors,
          userDataMessage: error.response.data.toLowerCase(),
        });
      } else if (error.message) {
        console.error("Could not update user. Error message:", error.message);
        setErrors({ ...errors, message: error.message.toLowerCase() });
      } else {
        console.error("Could not update user. Error:", error);
      }
    }

    setHasChanges(false);
  }

  useEffect(() => {
    setPassword("");
    setNewPassword("");
    setConfirmPassword("");
  }, [isModalOpen]);

  const handleInputChange = (fieldName) => (e) => {
    setErrors({
      userDataMessage: "",
      message: "",
    });

    const value = e.target.value;
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

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

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
                  disabled={!isEditing}
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
                  disabled={!isEditing}
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
                  disabled={!isEditing}
                />
                <Input
                  className={classes.profileInput}
                  label={"Email"}
                  type={"email"}
                  name={"profileEmail"}
                  id={"profileEmail"}
                  value={email}
                  onChange={(e) => handleInputChange("email")(e)}
                  error={errors.userDataMessage}
                  disabled={!isEditing}
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
                  disabled={!isEditing}
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
                  disabled={!isEditing}
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
                  disabled={!isEditing}
                />
              </div>
            </form>
          </div>
          <footer className={classes.profileBoxFooter}>
            <button
              className={`${classes.saveBtn} ${
                !hasChanges ? classes.disabledStyle : ""
              }`}
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

      {openExpiredModal && (
        <Modal open={openExpiredModal} className={modalClasses.modalContainer}>
          <TokenExpired />
        </Modal>
      )}
    </>
  );
}
