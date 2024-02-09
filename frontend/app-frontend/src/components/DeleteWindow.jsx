import React from "react";
import Modal from "./Modal";

import classes from "../components/DeleteWindow.module.css";

export default function DeleteWindow({ open, onClose, onConfirm }) {
  return (
    <Modal open={open} onClose={onClose} className={classes.deleteContainer}>
      <div className={classes.deleteWindow}>
        <p className={classes.question}>Are you sure?</p>
        <p>You cannot reverse this action.</p>
        <div className={classes.buttons}>
          <button onClick={onClose} className={classes.noBtn}>
            No
          </button>
          <button onClick={onConfirm} className={classes.yesBtn}>
            Yes
          </button>
        </div>
      </div>
    </Modal>
  );
}
