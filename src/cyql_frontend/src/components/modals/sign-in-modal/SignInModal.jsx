import React from "react";
import css from "./SignInModal.module.css";

// components
import { Header, SignInMethods } from "./index";

// state
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";
import { setSignInModal } from "@/state/modals/modals";
import { selectTheme } from "@/state/ui/theme";

const SignInModal = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);

  const close = () => {
    dispatch(setSignInModal(false));
  };

  const style =
    theme === "light"
      ? { backgroundColor: "rgba(242, 244, 248, 0.8)" }
      : { backgroundColor: "rgba(18, 22, 25, 0.8)" };

  return (
    <div className={css.modal} style={style} onClick={close}>
      <div className={css.content} onClick={(e) => e.stopPropagation()}>
        <Header />
        <SignInMethods />
      </div>
    </div>
  );
};

export default SignInModal;
