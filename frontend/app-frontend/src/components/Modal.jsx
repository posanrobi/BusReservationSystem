import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import classes from "./Modal.module.css";

/**
 * Component for displaying a modal dialog.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The content to be displayed inside the modal.
 * @param {boolean} props.open - Flag indicating whether the modal should be open or not.
 * @param {string} [props.className=""] - Additional CSS classes to be applied to the modal.
 * @returns {React.ReactNode} - JSX element representing the modal.
 */
export default function Modal({ children, open, className = "" }) {
  const dialog = useRef();

  //  Effect to control the visibility of the modal.
  useEffect(() => {
    const modal = dialog.current;
    if (open) {
      modal.showModal();
    } else {
      modal.close();
    }
  }, [open]);

  // Renders the modal using the createPortal function
  return createPortal(
    <dialog ref={dialog} className={`${className}`}>
      <div className={classes.modalContent}>{children}</div>
    </dialog>,
    document.getElementById("modal")
  );
}
