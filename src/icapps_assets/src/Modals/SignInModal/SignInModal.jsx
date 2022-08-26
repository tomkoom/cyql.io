import React from "react";
import css from "./SignInModal.module.css";

// icons
import { iAngleRight } from "../../Icons/Icons";
import CrossIcon from "../../Icons/CrossIcon/CrossIcon";

// auth
import { useAuth } from "../../Context/AuthContext";

// state
import { useSelector, useDispatch } from "react-redux";
import { selectSignInModal, setSignInModal } from "../../State/modals";

const SignInModal = () => {
  const dispatch = useDispatch();
  const { signInWithPlug, signInWithStoic, signInWithInfinityWallet } = useAuth();
  const signInModal = useSelector(selectSignInModal);

  const signInMethods = [
    {
      label: "Plug",
      logo: "https://n7ib3-4qaaa-aaaai-qagnq-cai.raw.ic0.app/brand/plug/plug-logo.svg",
      onClick: signInWithPlug,
    },
    {
      label: "Stoic",
      logo: "https://n7ib3-4qaaa-aaaai-qagnq-cai.raw.ic0.app/brand/stoic/stoic-logo.jpeg",
      onClick: signInWithStoic,
    },
    {
      label: "InfinityWallet",
      logo: "",
      onClick: signInWithInfinityWallet,
    },
  ];

  return (
    <div
      className={signInModal ? `${css.modal} ${css.active}` : css.modal}
      onClick={() => dispatch(setSignInModal(false))}
    >
      <div
        className={signInModal ? `${css.content} ${css.active}` : css.content}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={css.top}>
          <h3 className={css.title}>Choose your wallet</h3>
          <CrossIcon onClick={() => dispatch(setSignInModal(false))} />
        </div>

        <div>
          {signInMethods.map(({ label, logo, onClick }) => (
            <button className={css.btn} key={label} onClick={onClick}>
              <div className={css.logo}>
                <img src={logo} alt={`${label}-logo"`} /> {label}
              </div>
              <div className={css.icon}>{iAngleRight}</div>
            </button>
          ))}
        </div>

        <hr className={css.div} />
        <p className={css.btmText}>Other wallets support coming soon</p>
      </div>
    </div>
  );
};

export default SignInModal;
