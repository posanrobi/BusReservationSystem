import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import classes from "./Modal.module.css";

export default function Modal({ children, open, className = "" }) {
  const dialog = useRef();

  useEffect(() => {
    const modal = dialog.current;
    if (open) {
      modal.showModal();
    } else {
      modal.close();
    }
  }, [open]);

  return createPortal(
    <dialog ref={dialog} className={`${className}`}>
      <div className={classes.modalContent}>{children}</div>
    </dialog>,
    document.getElementById("modal")
  );
}
