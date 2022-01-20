import React, { useEffect } from "react";
import css from "./Modal.module.css";

const Modal = ({
  modalIsActive,
  setModalIsActive,
  updateDonateAmount,
  donateAmount,
  handleDonateBtnClick,
  transactionStatus,
  // children,
}) => {
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
        {transactionStatus ? (
          <div
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <h5>Transaction completed</h5>
            <p>Thank you for your donation!</p>
          </div>
        ) : (
          <div className={css.modal__card__content}>
            <p className="bodyText">
              icApps is developed and maintained by the IC enthusiasts. Supply
              us with coffee so we can keep on going! Appreciate your support!
            </p>
            <h4>Enter donation amount</h4>
            <div className={css.modal__card__content__donationAmountInput}>
              <input
                className={css.donationAmountInput}
                type="number"
                min="0"
                onChange={updateDonateAmount}
                value={donateAmount}
              />
              <p>ICP</p>
            </div>

            <button className={css.donateBtn} onClick={handleDonateBtnClick}>
              Donate
            </button>
          </div>
        )}

        {/* {children} */}
      </div>
    </div>
  );
};

export default Modal;
