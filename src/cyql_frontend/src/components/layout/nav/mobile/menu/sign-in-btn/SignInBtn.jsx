import React from "react";
import css from "./SignInBtn.module.css";

// icons
import { iSignIn } from "@/components/icons/Icons";

// state
import { useAppDispatch } from "@/hooks/useRedux";
import { setSignInModal } from "@/state/modals/modals";

const SignInBtn = () => {
  const dispatch = useAppDispatch();

  const openSignInModal = () => {
    dispatch(setSignInModal(true));
  };

  return (
    <button className={css.signInBtn} onClick={openSignInModal}>
      <span className={css.icon}>{iSignIn}</span> <span>sign in</span>
    </button>
  );
};

export default SignInBtn;
