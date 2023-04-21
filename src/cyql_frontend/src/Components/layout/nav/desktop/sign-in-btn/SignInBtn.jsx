import React from "react";
import css from "./SignInBtn.module.css";

// icons
import { iSignIn } from "@icons/Icons";

// auth
import { useAuth } from "@context/AuthContext";

// state
import { useDispatch } from "react-redux";
import { setSignInModal } from "@state/modals/modals";

// components
import { Spinner } from "@components/index";

const SignInBtn = () => {
  const dispatch = useDispatch();
  const { signInLoading } = useAuth();
  const openSignInModal = () => {
    dispatch(setSignInModal(true));
  };

  return !signInLoading ? (
    <button className={css.btn} onClick={openSignInModal}>
      <span>{iSignIn}</span>
      <p>sign in</p>
    </button>
  ) : (
    <div className={css.btn}>
      <p>loading...</p>
      <Spinner size="20" />
    </div>
  );
};

export default SignInBtn;
