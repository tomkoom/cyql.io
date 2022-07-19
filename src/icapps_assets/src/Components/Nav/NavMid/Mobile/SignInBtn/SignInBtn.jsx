import React from "react";
import css from "./SignInBtn.module.css";

// icons
import { iSignIn } from "../../../Icons/Icons";

// auth
import { useAuth } from "../../../Context/AuthContext";

// state
import { useDispatch } from "react-redux";
import { setSignInModal } from "../../../State/modals";

const SignInBtn = () => {
  const dispatch = useDispatch();
  const { principalId } = useAuth;

  return (
    <button
      className={`${css.signInBtn} secondaryBtn`}
      onClick={() => dispatch(setSignInModal(true))}
    >
      <span>{iSignIn}</span>
      Connect wallet
    </button>
  );
};

export default SignInBtn;
