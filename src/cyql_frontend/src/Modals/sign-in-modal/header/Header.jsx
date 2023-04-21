import React from "react";
import css from "./Header.module.css";

// icons
import { CrossIcon } from "@icons/index";

// state
import { useDispatch } from "react-redux";
import { setSignInModal } from "@state/modals/modals";

const Header = () => {
  const dispatch = useDispatch();
  const close = () => {
    dispatch(setSignInModal(false));
  };

  return (
    <div className={css.header}>
      <CrossIcon onClick={close} />
      <h3 className={css.title}>choose your sign-in method</h3>
    </div>
  );
};

export default Header;
