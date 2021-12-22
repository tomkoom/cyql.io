import React, { useEffect } from "react";
import css from "./Modal.module.css";

const Modal = ({ modalIsActive, setModalIsActive, children }) => {
  // prevent from scrolling when modal is open
  useEffect(() => {
    if (modalIsActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [modalIsActive]);

  return (
    <div
      className={modalIsActive ? `${css.modal} ${css.active}` : css.modal}
      onClick={() => setModalIsActive(false)}
    >
      <div
        className={
          modalIsActive ? `${css.modal__card} ${css.active}` : css.modal__card
        }
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
