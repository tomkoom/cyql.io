import React from "react";
import css from "./SignInBtn.module.css";

// icons
import { iSignIn } from "../../../../../Icons/Icons";

// state
import { useDispatch } from "react-redux";
import { setSignInModal } from "../../../../../State/modals";

const SignInBtn = () => {
  const dispatch = useDispatch();

  return (
    <button
      className={`${css.signInBtn} secondaryBtn`}
      onClick={() => dispatch(setSignInModal(true))}
    >
      <span>{iSignIn}</span>
      Connect Wallet
    </button>
  );
};

export default SignInBtn;
