import React from "react";
import css from "./Header.module.css";

// icons
import CrossIcon from "@icons/CrossIcon/CrossIcon";

// state
import { useDispatch } from "react-redux";
import { setSignInModal } from "@state/modals/modals";

const Header = () => {
  const dispatch = useDispatch();
  const closeSignInModal = () => {
    dispatch(setSignInModal(false));
  };

  return (
    <div className={css.header}>
      <h3 className={css.title}>Choose your wallet</h3>
      <CrossIcon onClick={closeSignInModal} />
    </div>
  );
};

export default Header;
