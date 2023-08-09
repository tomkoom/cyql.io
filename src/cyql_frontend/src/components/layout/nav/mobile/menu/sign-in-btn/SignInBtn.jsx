import React from "react";
import css from "./SignInBtn.module.css";

// icons
import { iSignIn } from "@/components/icons/Icons";

// components
import { SignInModal } from "@/components/modals/_index";

// state
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setSignInModal } from "@/state/modals/modals";
import { selectSignInModal } from "@/state/modals/modals";

const SignInBtn = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectSignInModal);

  const openSignInModal = () => {
    dispatch(setSignInModal(true));
  };

  return (
    <div>
      <SignInModal isOpen={isOpen} />
      <button className={css.signInBtn} onClick={openSignInModal}>
        <span className={css.icon}>{iSignIn}</span> <span>sign in</span>
      </button>
    </div>
  );
};

export default SignInBtn;
