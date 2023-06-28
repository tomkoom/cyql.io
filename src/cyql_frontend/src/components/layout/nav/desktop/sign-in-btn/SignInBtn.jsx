import React from "react";
import css from "./SignInBtn.module.css";

// icons
import { iSignIn } from "@/components/icons/Icons";

// auth
import { useAuth } from "@/context/AuthContext";

// state
import { useDispatch } from "react-redux";
import { setSignInModal } from "@/state/modals/modals";

// components
import { Spinner } from "@/components/ui-elements/index";

const SignInBtn = () => {
  const dispatch = useDispatch();
  const { signInLoading } = useAuth();
  const openSignInModal = () => {
    dispatch(setSignInModal(true));
  };

  return !signInLoading ? (
    <button className={css.btn} onClick={openSignInModal}>
      <span>{iSignIn}</span>
      <span>sign in</span>
    </button>
  ) : (
    <div className={css.btn}>
      <span>loading...</span>
      <Spinner size="20" />
    </div>
  );
};

export default SignInBtn;
