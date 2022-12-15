import React from "react";
import css from "./ShareBtn.module.css";

// icons
import { iShareSquare } from "@icons/Icons";

// state
import { useDispatch } from "react-redux";
import { setShareModal } from "@state/modals/shareModal";

const ShareBtn = () => {
  const dispatch = useDispatch();
  const openModal = () => {
    dispatch(setShareModal(true));
  };

  return (
    <button className={css.btn} onClick={openModal}>
      <span className={css.icon}>{iShareSquare}</span>
    </button>
  );
};

export default ShareBtn;
