import React from "react";
import css from "./SignInModal.module.css";

// icons
import { iAngleRight } from "@icons/Icons";

// auth
import { useAuth } from "@context/AuthContext";

// components
import { Header } from "./index";

// state
import { useSelector, useDispatch } from "react-redux";
import { setSignInModal } from "@state/modals/modals";
import { selectTheme } from "@state/theme";

const SignInModal = () => {
  const dispatch = useDispatch();
  const { signInWithPlug, signInWithStoic, signInWithInfinityWallet } = useAuth();
  const theme = useSelector(selectTheme);

  const close = () => {
    dispatch(setSignInModal(false));
  };

  const signInMethods = [
    {
      label: "Plug",
      logo: "https://n7ib3-4qaaa-aaaai-qagnq-cai.raw.ic0.app/brand/plug/plug-logo.svg",
      handleSignIn: signInWithPlug,
    },
    {
      label: "Stoic",
      logo: "https://n7ib3-4qaaa-aaaai-qagnq-cai.raw.ic0.app/brand/stoic/stoic-logo.jpg",
      handleSignIn: signInWithStoic,
    },
    {
      label: "InfinityWallet",
      logo: "https://n7ib3-4qaaa-aaaai-qagnq-cai.raw.ic0.app/brand/infinitywallet/infinitywallet-logo.png",
      handleSignIn: signInWithInfinityWallet,
    },
  ];

  const style =
    theme === "light"
      ? { backgroundColor: "rgba(18, 22, 25, 0.33)" }
      : { backgroundColor: "rgba(242, 244, 248, 0.33)" };

  return (
    <div className={css.modal} style={style} onClick={close}>
      <div className={css.content} onClick={(e) => e.stopPropagation()}>
        <Header />

        <div>
          {signInMethods.map((s) => (
            <button className={css.btn} key={s.label} onClick={s.handleSignIn}>
              <div className={css.main}>
                <img className={css.logo} src={s.logo} alt={`${s.label} logo"`} />
                <p className={css.label}>{s.label}</p>
              </div>
              <span className={css.icon}>{iAngleRight}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SignInModal;
