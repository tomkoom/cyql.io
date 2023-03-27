import React from "react";
import css from "./MenuBtn.module.css";

// icons
import { iBars } from "@icons/Icons";

// state
import { useDispatch } from "react-redux";
import { setMobileMenuModal } from "@state/modals/modals";

const MenuBtn = () => {
  const dispatch = useDispatch();
  return (
    <button className={css.btn} onClick={() => dispatch(setMobileMenuModal(true))}>
      {iBars}
    </button>
  );
};

export default MenuBtn;
