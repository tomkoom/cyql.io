import React from "react";
import css from "./SignInModal.module.css";

// icons
import { iAngleRight, iTimes, iTwitter } from "../../../Icons/Icons";

// auth
import { useAuth } from "../../../Context/AuthContext";

// state
import { useSelector, useDispatch } from "react-redux";
import { selectSignInModal, setSignInModal } from "../../../State/modals";

const SignInModal = () => {
  const dispatch = useDispatch();
  const signInModal = useSelector(selectSignInModal);

  const { signInWithTwitter, signInWithPlug, signInWithStoic } = useAuth();

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
          <div className={css.times} onClick={() => dispatch(setSignInModal(false))}>
            {iTimes}
          </div>
        </div>

        <button className={css.plugBtn} onClick={signInWithPlug}>
          <div>
            <img
              src="https://n7ib3-4qaaa-aaaai-qagnq-cai.raw.ic0.app/brand/plug/plug-logo.png"
              alt="plugwallet-logo"
            />{" "}
            Plug
          </div>
          <div className={css.icon}>{iAngleRight}</div>
        </button>

        <button className={css.twitterBtn} onClick={signInWithStoic}>
          <span>{iTwitter}</span> Continue with Twitter
        </button>

        <hr className={css.div} />

        <p className={`${css.btmText} text`}>Other wallets support coming soon</p>
      </div>
    </div>
  );
};

export default SignInModal;
