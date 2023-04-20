import React from "react";
import css from "./SignInBtn.module.css";

// icons
import { iSignIn } from "@icons/Icons";

// state
import { useDispatch } from "react-redux";
import { setSignInModal } from "@state/modals/modals";

const SignInBtn = () => {
  const dispatch = useDispatch();

  const openSignInModal = () => {
    dispatch(setSignInModal(true));
  };

  return (
    <button className={css.signInBtn} onClick={openSignInModal}>
      <span className={css.icon}>{iSignIn}</span> <span>connect wallet</span>
    </button>
  );
};

export default SignInBtn;
