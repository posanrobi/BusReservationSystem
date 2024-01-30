import { useEffect, useState } from "react";
import Input from "../components/Input";
import { getCurrentUser } from "../services/auth.service";

import { CgProfile } from "react-icons/cg";
import { FaRegEdit } from "react-icons/fa";

import classes from "./ProfilePage.module.css";
import { getUserById, updatePassword } from "../services/user.service";

export default function ProfilePage() {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const currentUser = getCurrentUser();
  const userId = currentUser ? currentUser.id : "";

  useEffect(() => {
    async function getFullname() {
      try {
        const currentUserResponse = await getUserById(userId);
        const currentUserData = currentUserResponse.data;
        const fullName =
          currentUserData.lastname + " " + currentUserData.firstname;

        setFullname(fullName);
        setUsername(currentUserData.username);
        setEmail(currentUserData.email);
      } catch (error) {
        console.error("Error while getting user", error);
      }
    }
    getFullname();
  });

  async function handleSave() {
    try {
      await updatePassword(userId, {
        currentPassword: password,
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      });
      console.log("Password changed successfully");
    } catch (error) {
      console.error("Failed to change password", error);
    }

    setPassword("");
    setNewPassword("");
    setConfirmPassword("");
  }

  const handleInputChange = (fieldName) => (e) => {
    const value = e.target.value;
    switch (fieldName) {
      case "fullname":
        setFullname(value);
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
                  label={"Fullname"}
                  type={"text"}
                  name={"profileFullname"}
                  id={"profileFullname"}
                  value={fullname}
                  onChange={() => handleInputChange("fullname")}
                  error={""}
                />
                <Input
                  label={"Username"}
                  type={"text"}
                  name={"profileUsername"}
                  id={"profileUsername"}
                  value={username}
                  onChange={() => handleInputChange("profileUsername")}
                  error={""}
                />
                <Input
                  label={"Email"}
                  type={"email"}
                  name={"profileEmail"}
                  id={"profileEmail"}
                  value={email}
                  onChange={() => handleInputChange("profileEmail")}
                  error={""}
                />
              </div>
              <div>
                <p>Change password?</p>
                <Input
                  label={"Current password"}
                  type={"password"}
                  name={"currentPassword"}
                  id={"currentPassword"}
                  value={password}
                  onChange={() => handleInputChange("currentPassword")}
                  error={""}
                />
                <Input
                  label={"New password"}
                  type={"password"}
                  name={"newPassword"}
                  id={"newPassword"}
                  value={newPassword}
                  onChange={() => handleInputChange("newPassword")}
                  error={""}
                />
                <Input
                  label={"Confirm new password"}
                  type={"password"}
                  name={"confirmPassword"}
                  id={"confirmPassword"}
                  value={confirmPassword}
                  onChange={() => handleInputChange("confirmPassword")}
                  error={""}
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
