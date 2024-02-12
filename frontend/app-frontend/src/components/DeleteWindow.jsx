import React from "react";
import Modal from "./Modal";

import classes from "../components/DeleteWindow.module.css";

/**
 * Component for displaying a delete confirmation window.
 *
 * @param {boolean} open - Indicating whether the delete window is open.
 * @param {function} onClose - Function to close the delete window.
 * @param {function} onConfirm - Function to confirm the delete action.
 *
 * @returns {React.ReactNode} - JSX element representing the delete confirmation window.
 */
export default function DeleteWindow({ open, onClose, onConfirm }) {
  // Renders the delete confirmation window
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
