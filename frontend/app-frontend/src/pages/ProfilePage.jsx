import { useEffect, useState } from "react";
import Input from "../components/Input";
import { getCurrentUser } from "../services/auth.service";

import { CgProfile } from "react-icons/cg";
import { FaRegEdit } from "react-icons/fa";

import classes from "./ProfilePage.module.css";
import {
  getUserById,
  updatePassword,
  updateUser,
} from "../services/user.service";

export default function ProfilePage() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});

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
      } catch (error) {
        console.error("Error while getting user", error);
      }
    }
    getUserData();
  }, [userId]);

  async function handleSave() {
    try {
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

      console.log("User updated successfully!");
    } catch (error) {
      if (error.message) {
        console.log(error.message);
        setErrors({ ...errors, message: error.message });
      } else {
        console.log("Could not update password");
      }
    }

    setPassword("");
    setNewPassword("");
    setConfirmPassword("");
  }

  const handleInputChange = (fieldName) => (e) => {
    const value = e.target.value;
    switch (fieldName) {
      case "firstname":
        setFirstname(value);
        break;
      case "lastname":
        setLastname(value);
        break;
      case "username":
        setUsername(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "newPassword":
        setNewPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className={classes.profileContainer}>
        <div className={classes.profileBox}>
          <header className={classes.profileBoxHeader}>
            <div className={classes.editDiv}>
              <h2 className={classes.fullName}>Your profile</h2>{" "}
              <FaRegEdit className={classes.editIcon} />
            </div>
            <CgProfile className={classes.profileIcon} />
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
                  error={""}
                />
              </div>
              <div>
                <p>Change password?</p>
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
                  error={errors.message}
                  placeholder={"Confirm your new password"}
                />
              </div>
            </form>
          </div>
          <footer className={classes.profileBoxFooter}>
            <button className={classes.saveBtn} onClick={handleSave}>
              Save changes
            </button>
          </footer>
        </div>
      </div>
    </>
  );
}
