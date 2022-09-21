import React from "react";
import css from "./SignInModal.module.css";

// icons
import { iAngleRight } from "../../Icons/Icons";
import CrossIcon from "../../Icons/CrossIcon/CrossIcon";

// auth
import { useAuth } from "../../Context/AuthContext";

// state
import { useSelector, useDispatch } from "react-redux";
import { setSignInModal } from "../../State/modals";
import { selectTheme } from "../../State/theme";

const SignInModal = () => {
  const dispatch = useDispatch();
  const { signInWithPlug, signInWithStoic, signInWithInfinityWallet } = useAuth();
  const theme = useSelector(selectTheme);

  const closeSignInModal = () => {
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

  return (
    <div
      className={css.modal}
      style={
        theme === "light"
          ? { backgroundColor: "rgba(18, 22, 25, 0.33)" }
          : { backgroundColor: "rgba(242, 244, 248, 0.33)" }
      }
      onClick={closeSignInModal}
    >
      <div className={css.content} onClick={(e) => e.stopPropagation()}>
        <div className={css.top}>
          <h3 className={css.title}>Choose your wallet</h3>
          <CrossIcon onClick={closeSignInModal} />
        </div>

        <div>
          {signInMethods.map((s) => (
            <button className={css.btn} key={s.label} onClick={s.handleSignIn}>
              <div className={css.logo}>
                <img src={s.logo} alt={`${s.label}-logo"`} />
                <p className={css.label}>{s.label}</p>
              </div>
              <div className={css.icon}>{iAngleRight}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SignInModal;
