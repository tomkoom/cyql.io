import React from "react";
import css from "./SignInModal.module.css";

// components
import { Header, SignInMethods } from "./index";

// state
import { useSelector, useDispatch } from "react-redux";
import { setSignInModal } from "@state/modals/modals";
import { selectTheme } from "@state/theme";

const SignInModal = () => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);

  const close = () => {
    dispatch(setSignInModal(false));
  };

  const style =
    theme === "light"
      ? { backgroundColor: "rgba(18, 22, 25, 0.33)" }
      : { backgroundColor: "rgba(242, 244, 248, 0.33)" };

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
