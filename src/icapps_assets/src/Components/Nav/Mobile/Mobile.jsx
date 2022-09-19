import React from "react";
import css from "./Mobile.module.css";

// icons
import { iBars } from "../../../Icons/Icons";

// components
import Modal from "./Modal/Modal";

// state
import { useDispatch, useSelector } from "react-redux";
import { setMobileMenuModal, selectMobileMenuModal } from "../../../State/modals";

const Mobile = () => {
  const dispatch = useDispatch();
  const mobileMenuModal = useSelector(selectMobileMenuModal);

  return (
    <div>
      <div className={css.menuBtn} onClick={() => dispatch(setMobileMenuModal(true))}>
        {iBars}
      </div>
      {mobileMenuModal && <Modal />}
    </div>
  );
};

export default Mobile;
